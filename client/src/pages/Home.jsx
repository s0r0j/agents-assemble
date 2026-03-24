import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">
        AI Mental Health Platform
      </h1>

      <p className="mb-8 text-gray-600">
        Chat with AI or take a quick mental health quiz
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/chat"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Go to Chat
        </Link>

        <Link
          to="/quiz"
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
}