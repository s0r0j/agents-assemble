import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full border-b border-white/10 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center text-white">

        <h1 className="font-semibold text-lg">
          MindAI
        </h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/chat" className="hover:text-white">Chat</Link>
          <Link to="/quiz" className="hover:text-white">Quiz</Link>
        </div>

      </div>
    </div>
  );
}