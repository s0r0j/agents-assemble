import { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      q: "How often do you feel stressed?",
      options: ["Rarely", "Sometimes", "Often"],
    },
    {
      q: "Do you get enough sleep?",
      options: ["Yes", "Sometimes", "No"],
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    setStep((prev) => prev + 1);
  };

  // RESULT LOGIC
  const getResult = () => {
    const score = answers.filter(
      (a) => a === "Often" || a === "No"
    ).length;

    if (score >= 1) {
      return "You might be experiencing some stress. Try chatting with AI for guidance.";
    } else {
      return "You're doing well. Keep maintaining your mental health!";
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full mt-10 px-4 text-white">

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg">

        {/* QUESTION VIEW */}
        {step < questions.length ? (
          <>
            <h2 className="text-xl font-semibold mb-6">
              {questions[step].q}
            </h2>

            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
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
          /* RESULT VIEW */
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Your Result
            </h2>

            <p className="text-gray-300 mb-6">
              {getResult()}
            </p>

            <button
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Retake Quiz
            </button>
          </div>
        )}

      </div>
    </div>
  );
}