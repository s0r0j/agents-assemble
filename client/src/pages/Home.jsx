import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      <h1 className="text-4xl font-bold mb-4 text-center">
        AI Mental Health Assistant
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Talk to an AI for guidance and take quizzes to understand your mental health better.
      </p>

      <div className="flex gap-4">
        <Link
          to="/chat"
          className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Start Chat
        </Link>

        <Link
          to="/quiz"
          className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
}