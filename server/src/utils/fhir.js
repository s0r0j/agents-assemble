export async function fetchFHIRData(token, patientId) {
  return {
    status: "placeholder",
    tokenReceived: Boolean(token),
    patientId,
    note: "PromptOpinion should provide FHIR context; direct FHIR calls are intentionally not implemented here.",
  };
}
