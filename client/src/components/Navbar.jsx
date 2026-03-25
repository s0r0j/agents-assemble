import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">

        <h1 className="text-gray-800 font-semibold text-lg">
          MindCare AI
        </h1>

        <div className="flex gap-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/test" className="hover:text-blue-500 transition">Test</Link>
        </div>

      </div>
    </div>
  );
}