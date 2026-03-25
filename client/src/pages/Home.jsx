import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-semibold text-gray-800 mb-4 leading-tight">
            Mental Wellness Assistant
          </h1>

          <p className="text-gray-500 mb-8">
            Understand your stress levels and get a personalized plan to improve your mental well-being.
          </p>

          <Link
            to="/test"
            className="inline-block px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow transition"
          >
            Start Stress Test
          </Link>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            What you’ll get
          </h3>

          <ul className="space-y-3 text-gray-500">
            <li>✔ Stress level analysis</li>
            <li>✔ Personalized weekly plan</li>
            <li>✔ Progress tracking</li>
          </ul>
        </div>

      </div>
    </div>
  );
}