import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StressTest() {
  const navigate = useNavigate();

  const questions = [
    { q: "How often do you feel stressed?", options: ["Rarely", "Sometimes", "Often"] },
    { q: "Do you feel overwhelmed?", options: ["Yes", "Sometimes", "No"] },
    { q: "Do you have trouble sleeping?", options: ["Yes", "Sometimes", "No"] },
    { q: "Do you feel anxious frequently?", options: ["Yes", "Sometimes", "No"] },
    { q: "Do you feel mentally tired?", options: ["Yes", "Sometimes", "No"] },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = async (opt) => {
  const newAnswers = [...answers, opt];
  setAnswers(newAnswers);

  if (step < questions.length - 1) {
    setStep(step + 1);
  } else {
    try {
      // convert answers → readable text
      const userText = newAnswers
        .map((ans, i) => `Q${i + 1}: ${ans}`)
        .join("\n");

      const res = await fetch("/api/api/workspaces/019d2042-0375-71ea-ac41-09411abbcbc0/fhir", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "SendMessage",
    params: {
      message: {
        role: "user",
        parts: [
          {
            text: `Analyze stress level based on these answers:\n${userText}`,
          },
        ],
      },
    },
  }),
});

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      // extract AI reply (IMPORTANT — may vary)
      const aiText =
        data?.result?.message?.parts?.[0]?.text ||
        "Could not analyze stress.";

      navigate("/results", {
        state: {
          level: "Medium", // temp until we parse properly
          score: newAnswers.length,
          advice: aiText,
          total: questions.length,
        },
      });
    } catch (err) {
      console.error(err);

      navigate("/results", {
        state: {
          level: "Medium",
          score: 2,
          advice: "AI failed. Showing default result.",
          total: questions.length,
        },
      });
    }
  }
};

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-2 rounded mb-6">
          <div
            className="bg-blue-400 h-2 rounded"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {questions[step].q}
        </h2>

        <div className="space-y-3">
          {questions[step].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition"
            >
              {opt}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Question {step + 1} of {questions.length}
        </p>

      </div>
    </div>
  );
}

