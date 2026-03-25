import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const answers = state?.answers || [];

  const score = answers.filter(
    (a) => a === "Often" || a === "Yes"
  ).length;

  let level = "Low";
  if (score >= 3) level = "High";
  else if (score >= 1) level = "Medium";

  const levelColor = {
    Low: "text-emerald-500",
    Medium: "text-blue-500",
    High: "text-red-400",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="max-w-md mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-sm text-center">

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Stress Analysis
        </h2>

        <p className="text-gray-400 mb-6">
          Based on your responses
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-400">Score</p>
          <h3 className="text-4xl font-bold text-gray-800">
            {score} / {answers.length}
          </h3>
        </div>

        <h3 className={`text-2xl font-semibold mb-4 ${levelColor[level]}`}>
          {level} Stress
        </h3>

        <p className="text-gray-500 mb-8">
          {level === "Low" && "You're doing well. Keep it up."}
          {level === "Medium" && "Some stress detected. Improve lifestyle habits."}
          {level === "High" && "High stress detected. Take action immediately."}
        </p>

        <button
          onClick={() =>
            navigate("/schedule", { state: { level } })
          }
          className="px-6 py-3 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg"
        >
          View Your Plan
        </button>

      </div>
    </div>
  );
}