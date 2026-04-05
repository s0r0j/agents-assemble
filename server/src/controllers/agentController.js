import {
  buildJsonRpcError,
  buildJsonRpcSuccess,
  validateJsonRpcRequest,
} from "../utils/jsonRpc.js";
import { processAgentRequest } from "../services/agentService.js";

export async function handleAgentRequest(req, res) {
  const requestId = req.body?.id ?? null;

  console.log("Incoming /agent request body:");
  console.log(JSON.stringify(req.body, null, 2));

  const validationError = validateJsonRpcRequest(req.body);
  if (validationError) {
    return res.status(400).json(buildJsonRpcError(validationError, requestId));
  }

  try {
    const result = await processAgentRequest(req.body);
    return res.json(buildJsonRpcSuccess(result, requestId));
  } catch (error) {
    console.error("Agent request failed:", error);

    return res.status(500).json(
      buildJsonRpcError(
        {
          code: -32000,
          message: error.message || "Agent request failed",
        },
        requestId,
      ),
    );
  }
}
