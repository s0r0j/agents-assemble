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

  const handleAnswer = (opt) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/results", { state: { answers: newAnswers } });
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