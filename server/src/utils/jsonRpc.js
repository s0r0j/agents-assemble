export function validateJsonRpcRequest(body) {
  if (!body || typeof body !== "object") {
    return { code: -32600, message: "Invalid Request" };
  }

  if (body.jsonrpc !== "2.0") {
    return { code: -32600, message: "jsonrpc must be '2.0'" };
  }

  if (!body.params?.message?.parts?.[0]?.text) {
    return {
      code: -32602,
      message: "Missing params.message.parts[0].text",
    };
  }

  return null;
}

export function buildJsonRpcSuccess(result, id = null) {
  return {
    jsonrpc: "2.0",
    result,
    id,
  };
}

export function buildJsonRpcError(error, id = null) {
  return {
    jsonrpc: "2.0",
    error: {
      code: error.code,
      message: error.message,
    },
    id,
  };
}
