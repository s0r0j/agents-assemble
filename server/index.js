import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_METHODS = new Set(["SendMessage", "message/send"]);

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.options("*", cors());

function buildJsonRpcError(code, message, id = null) {
  return {
    jsonrpc: "2.0",
    error: { code, message },
    id,
  };
}

app.post("/agent", (req, res) => {
  const body = req.body;
  const requestId = body?.id ?? null;

  console.log("Incoming /agent request:");
  console.log(JSON.stringify(body, null, 2));

  try {
    // PromptOpinion is the AI orchestrator in this architecture.
    // This backend is only an optional A2A tool/agent that PromptOpinion may call.
    // It does not call PromptOpinion and it does not orchestrate the full conversation.
    if (body?.jsonrpc !== "2.0") {
      return res
        .status(200)
        .json(buildJsonRpcError(-32600, "Invalid Request", requestId));
    }

    if (!ALLOWED_METHODS.has(body?.method)) {
      return res
        .status(200)
        .json(buildJsonRpcError(-32601, "Method not found", requestId));
    }

    const userText = body?.params?.message?.parts?.[0]?.text;

    if (typeof userText !== "string" || userText.trim() === "") {
      return res
        .status(200)
        .json(buildJsonRpcError(-32602, "Invalid params", requestId));
    }

    // Minimal A2A response:
    // if no custom tool logic is needed, return a valid JSON-RPC message payload.
    const responsePayload = {
      jsonrpc: "2.0",
      result: {
        message: {
          role: "assistant",
          parts: [
            {
              text: userText,
            },
          ],
        },
      },
      id: requestId,
    };

    console.log("Outgoing /agent response:");
    console.log(JSON.stringify(responsePayload, null, 2));

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("Agent error:", error);

    return res
      .status(200)
      .json(
        buildJsonRpcError(-32603, error?.message || "Internal error", requestId),
      );
  }
});

app.get("/.well-known/agent-card.json", (req, res) => {
  res.json({
    name: "MindCare Backend",
    description: "AI stress analysis agent",
    url: "https://agents-assemble.onrender.com/agent",
    version: "1.0.0",
    protocolVersion: "0.1.0",
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    preferredTransport: "JSONRPC",
    skills: [
      {
        id: "stress-analysis",
        name: "Stress Analysis",
        description: "Analyzes user stress and provides recommendations",
        inputModes: ["text"],
        outputModes: ["text"],
        tags: ["health", "stress", "wellness"],
      },
    ],
    capabilities: {
      a2a: true,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
