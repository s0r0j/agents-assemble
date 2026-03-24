import { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      q: "Do you feel stressed often?",
      options: ["Yes", "No"],
    },
    {
      q: "Do you get enough sleep?",
      options: ["Yes", "No"],
    },
  ];

  const [answers, setAnswers] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Mental Health Quiz
      </h1>

      <div className="max-w-xl mx-auto space-y-4">
        {questions.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow"
          >
            <p className="mb-3 font-medium">{item.q}</p>

            <div className="flex gap-3">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setAnswers({ ...answers, [i]: opt })
                  }
                  className={`px-4 py-2 rounded-lg border ${
                    answers[i] === opt
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}