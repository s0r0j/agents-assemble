import { useLocation, useNavigate } from "react-router-dom";

export default function Schedule() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const level = state?.level || "Low";

  const plans = {
    Low: ["Walk daily", "Stay consistent"],
    Medium: ["Meditation 10 mins", "Reduce screen time", "Take breaks"],
    High: ["Deep breathing", "Talk to someone", "Daily journaling"],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="max-w-md mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-sm">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Plan ({level})
        </h2>

        <ul className="space-y-3 mb-8">
          {plans[level].map((item, i) => (
            <li key={i} className="p-3 border rounded-lg">
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/final")}
          className="px-6 py-3 bg-blue-400 text-white rounded-lg"
        >
          Take Final Check
        </button>

      </div>
    </div>
  );
}