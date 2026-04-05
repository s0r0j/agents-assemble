import { fetchFHIRData } from "../utils/fhir.js";

export async function processAgentRequest(payload) {
  const userMessage = payload.params.message.parts[0].text;
  const metadata = payload.params.message.metadata || {};
  const fhirContext = metadata.fhirContext || null;

  let fhirData = null;
  if (fhirContext?.token && fhirContext?.patientId) {
    fhirData = await fetchFHIRData(fhirContext.token, fhirContext.patientId);
  }

  const responseText = await generateAIResponse(userMessage, { fhirContext, fhirData });

  return {
    message: {
      role: "assistant",
      parts: [{ text: responseText }],
    },
  };
}

export async function generateAIResponse(message, context = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    return buildMockResponse(message, context);
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an external PromptOpinion agent. Respond clearly and concisely in plain text.",
        },
        {
          role: "user",
          content: buildPrompt(message, context),
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI provider error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || buildMockResponse(message, context);
}

function buildPrompt(message, context) {
  const prompt = [`User message: ${message}`];

  if (context.fhirContext) {
    prompt.push(`FHIR context: ${JSON.stringify(context.fhirContext)}`);
  }

  if (context.fhirData) {
    prompt.push(`FHIR data placeholder result: ${JSON.stringify(context.fhirData)}`);
  }

  return prompt.join("\n");
}

function buildMockResponse(message, context) {
  const patientId = context.fhirContext?.patientId;
  const suffix = patientId ? ` Patient ID: ${patientId}.` : "";
  return `Mock agent response: ${message}${suffix}`;
}
