import { useLocation, useNavigate } from "react-router-dom";

export default function Schedule() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const level = state?.level || "Low";

  const plans = {
    Low: [
      "Go for a 15-minute walk daily",
      "Maintain a consistent sleep routine",
    ],
    Medium: [
      "Meditate for 10 minutes daily",
      "Reduce screen time before bed",
      "Take short breaks during work",
    ],
    High: [
      "Practice deep breathing exercises",
      "Talk to someone you trust",
      "Limit workload and take rest",
      "Write a daily journal",
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">

      <div className="max-w-md mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Weekly Plan ({level})
        </h2>

        <p className="text-gray-400 mb-6">
          Follow these activities to improve your well-being
        </p>

        <ul className="space-y-3 mb-8">
          {plans[level].map((item, i) => (
            <li
              key={i}
              className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span>{item}</span>
              <span className="text-xs text-gray-400">Daily</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/final")}
          className="w-full px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow hover:shadow-md active:scale-95 transition"
        >
          Take Final Check
        </button>

      </div>
    </div>
  );
}
