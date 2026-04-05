import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // get data ONLY from backend
  const {
    level = "Medium",
    score = 2,
    advice = "Based on your responses, here is your analysis.",
    total = 5,
  } = state || {};

  const levelColor = {
    Low: "text-emerald-500",
    Medium: "text-blue-500",
    High: "text-red-400",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">

      <div className="max-w-md mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition text-center">

        {/* Emoji */}
        <div className="text-5xl mb-4">
          {level === "Low" && "😊"}
          {level === "Medium" && "😐"}
          {level === "High" && "😟"}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Stress Analysis
        </h2>

        <p className="text-gray-400 mb-6">
          AI-generated result based on your responses
        </p>

        {/* Score */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">Score</p>
          <h3 className="text-4xl font-bold text-gray-800">
            {score} / {total}
          </h3>
        </div>

        {/* Level */}
        <h3 className={`text-2xl font-semibold mb-4 ${levelColor[level]}`}>
          {level} Stress
        </h3>

        {/* Advice from AI */}
        <p className="text-gray-500 mb-8">
          {advice}
        </p>

        <button
          onClick={() =>
            navigate("/schedule", { state: { level } })
          }
          className="px-6 py-3 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg shadow hover:shadow-md active:scale-95 transition"
        >
          View Your Plan
        </button>

      </div>
    </div>
  );
}
