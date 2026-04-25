import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessageToAgent } from "../services/api";

const questions = [
  {
    q: "How often do you feel stressed?",
    options: ["Rarely", "Sometimes", "Often"],
  },
  { q: "Do you feel overwhelmed?", options: ["Yes", "Sometimes", "No"] },
  { q: "Do you have trouble sleeping?", options: ["Yes", "Sometimes", "No"] },
  {
    q: "Do you feel anxious frequently?",
    options: ["Yes", "Sometimes", "No"],
  },
  { q: "Do you feel mentally tired?", options: ["Yes", "Sometimes", "No"] },
];

const scoreMap = {
  Rarely: 0,
  Sometimes: 1,
  Often: 2,
  No: 0,
  Yes: 2,
};

function buildAssessmentMessage(selectedAnswers) {
  const answerSummary = selectedAnswers
    .map(
      (answer, index) =>
        `Q${index + 1}: ${questions[index].q} Answer: ${answer}`,
    )
    .join("\n");

  return [
    "Analyze this user's stress assessment.",
    "Provide a short stress analysis, the likely stress level (Low, Medium, or High), and practical guidance.",
    "",
    `User answers:\n${answerSummary}`,
  ].join("\n");
}

function calculateScore(selectedAnswers) {
  return selectedAnswers.reduce(
    (total, answer) => total + (scoreMap[answer] ?? 1),
    0,
  );
}

function inferStressLevel(analysisText, score, maxScore) {
  const normalizedText = analysisText.toLowerCase();

  if (
    normalizedText.includes("high stress") ||
    normalizedText.includes("severe stress")
  ) {
    return "High";
  }

  if (
    normalizedText.includes("medium stress") ||
    normalizedText.includes("moderate stress")
  ) {
    return "Medium";
  }

  if (
    normalizedText.includes("low stress") ||
    normalizedText.includes("mild stress")
  ) {
    return "Low";
  }

  const ratio = maxScore === 0 ? 0 : score / maxScore;

  if (ratio >= 0.7) {
    return "High";
  }

  if (ratio >= 0.35) {
    return "Medium";
  }

  return "Low";
}

export default function StressTest() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAnswer = async (option) => {
    if (isSubmitting) {
      return;
    }

    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);
    setError("");

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    const score = calculateScore(nextAnswers);
    const total = questions.length * 2;
    setIsSubmitting(true);

    try {
      const advice = await sendMessageToAgent(buildAssessmentMessage(nextAnswers));

      navigate("/results", {
        state: {
          level: inferStressLevel(advice, score, total),
          score,
          advice,
          total,
          isError: false,
        },
      });
    } catch (requestError) {
      console.error(requestError);

      const fallbackMessage =
        requestError instanceof Error
          ? requestError.message
          : "Unable to retrieve your AI stress analysis right now.";

      setError(fallbackMessage);

      navigate("/results", {
        state: {
          level: inferStressLevel("", score, total),
          score,
          advice: `We could not load your AI-generated stress analysis. ${fallbackMessage}`,
          total,
          isError: true,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="w-full bg-gray-100 h-2 rounded mb-6">
          <div
            className="bg-blue-400 h-2 rounded"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {questions[step].q}
        </h2>

        <div className="space-y-3">
          {questions[step].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {option}
            </button>
          ))}
        </div>

        {isSubmitting && (
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-500" />
            Generating your AI stress analysis...
          </div>
        )}

        {!isSubmitting && error && (
          <p className="mt-6 text-sm text-red-400">{error}</p>
        )}

        <p className="text-sm text-gray-400 mt-6">
          Question {step + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}
