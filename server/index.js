import cors from "cors";
import express from "express";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// 🔹 MAIN AGENT ENDPOINT
app.post("/agent", (req, res) => {
  console.log("📥 Incoming request:");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const body = req.body;
    const requestId = body?.id ?? null;

    // ✅ Support BOTH method formats
    if (
      body?.jsonrpc !== "2.0" ||
      (body?.method !== "SendMessage" &&
        body?.method !== "message/send")
    ) {
      return res.status(200).json({
        jsonrpc: "2.0",
        error: {
          code: -32601,
          message: "Method not found",
        },
        id: requestId,
      });
    }

    const userMessage = body?.params?.message?.parts?.[0]?.text;

    if (typeof userMessage !== "string") {
      throw new Error("Invalid message payload");
    }

    const reply = `AI response to: ${userMessage}`;

    // ✅ CORRECT A2A RESPONSE FORMAT
    return res.status(200).json({
      jsonrpc: "2.0",
      id: requestId,
      result: {
        message: {
          kind: "message",
          role: "assistant",
          parts: [
            {
              kind: "text",
              text: reply,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error("❌ ERROR:", error);

    return res.status(200).json({
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal error",
      },
      id: null,
    });
  }
});

// 🔹 AGENT CARD (VERY IMPORTANT)
app.get("/.well-known/agent-card.json", (req, res) => {
  res.json({
    name: "MindCare Backend",
    description: "AI stress analysis agent",

    url: "https://struck-freebsd-unwrap-applications.trycloudflare.com/agent",

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
  console.log(`🚀 Server running on port ${PORT}`);
});