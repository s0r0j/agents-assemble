import { useState } from "react";

export default function FinalCheck() {
  const questions = [
    { q: "How would you rate your stress now?", options: ["Low", "Moderate", "High"] },
    { q: "Do you feel more relaxed than before?", options: ["Yes", "A little", "No"] },
    { q: "Are you managing tasks better?", options: ["Yes", "Somewhat", "No"] },
    { q: "Did you follow the plan?", options: ["Yes", "Sometimes", "No"] },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (opt) => {
    setAnswers([...answers, opt]);
    setStep(step + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

        {step < questions.length ? (
          <>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {questions[step].q}
            </h2>

            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full py-3 border rounded-lg hover:bg-blue-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              Assessment Complete
            </h2>

            <p className="text-gray-500">
              Great job! Keep maintaining your mental wellness.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}