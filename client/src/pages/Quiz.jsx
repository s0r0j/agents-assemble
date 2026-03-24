import { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      q: "Do you often feel stressed?",
      options: ["Yes", "No"],
    },
    {
      q: "Do you sleep well?",
      options: ["Yes", "No"],
    },
  ];

  const [answers, setAnswers] = useState({});

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>

      {questions.map((item, i) => (
        <div key={i} className="mb-4 bg-white p-4 rounded-lg shadow">
          <p className="mb-2">{item.q}</p>

          <div className="flex gap-2">
            {item.options.map((opt) => (
              <button
                key={opt}
                onClick={() =>
                  setAnswers({ ...answers, [i]: opt })
                }
                className="border px-3 py-1 rounded"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4">
        <b>Your Answers:</b>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    </div>
  );
}