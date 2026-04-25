import { AGENT_API_URL } from "./endpoints";

export async function sendMessageToAgent(message) {
  const response = await fetch(AGENT_API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: crypto.randomUUID(),
      method: "message/send",
      params: {
        message: {
          role: "user",
          parts: [{ text: message }],
        },
      },
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error?.message || "Failed to contact the agent.");
  }

  if (payload?.error) {
    throw new Error(payload.error.message || "The agent returned an error.");
  }

  const responseText = payload?.result?.message?.parts?.find(
    (part) => typeof part?.text === "string" && part.text.trim(),
  )?.text;

  if (!responseText) {
    throw new Error("No analysis text was returned by the agent.");
  }

  return responseText;
}
