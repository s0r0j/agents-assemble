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
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">

      <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">

        {step < questions.length ? (
          <>
            {/* Progress */}
            <div className="w-full bg-gray-100 h-2 rounded mb-6">
              <div
                className="bg-blue-400 h-2 rounded transition-all"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {questions[step].q}
            </h2>

            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:shadow-sm active:scale-95 transition"
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Question {step + 1} of {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>

            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              You're making progress!
            </h2>

            <p className="text-gray-500">
              Keep following your plan and take care of yourself.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}