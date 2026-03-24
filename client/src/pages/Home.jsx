import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-white">

      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Your AI Companion for Mental Wellness
      </h1>

      <p className="text-gray-400 max-w-xl mb-10">
        Talk to an AI that listens, guides, and helps you manage stress.
        Take quick quizzes to understand your mental state better.
      </p>

      <div className="flex gap-4 mb-16">
        <Link
          to="/chat"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Start Chat
        </Link>

        <Link
          to="/quiz"
          className="px-6 py-3 rounded-lg border border-white/10 bg-white/5"
        >
          Take Quiz
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">AI Chat</h3>
          <p className="text-gray-400 text-sm">
            Get instant responses and mental health guidance.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Self Assessment</h3>
          <p className="text-gray-400 text-sm">
            Take quizzes to evaluate your mental well-being.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Track Awareness</h3>
          <p className="text-gray-400 text-sm">
            Understand patterns and improve your mindset.
          </p>
        </div>

      </div>

    </div>
  );
}