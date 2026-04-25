import { useState } from "react";
import { Link } from "react-router-dom";

function AIConfirmModal({ isOpen, isOpening, onCancel, onContinue }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-slate-900">
          Continue to AI Assistant
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          You will be redirected to our AI assistant powered by PromptOpinion.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isOpening}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onContinue}
            disabled={isOpening}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-wait disabled:opacity-80"
          >
            {isOpening ? "Opening AI assistant..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleAI = () => {
    setIsOpening(true);

    window.open("https://app.promptopinion.ai", "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setIsOpening(false);
      setIsModalOpen(false);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-fade-in">
      <AIConfirmModal
        isOpen={isModalOpen}
        isOpening={isOpening}
        onCancel={() => setIsModalOpen(false)}
        onContinue={handleAI}
      />

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-semibold text-gray-800 mb-4 leading-tight">
            Mental Wellness Assistant
          </h1>

          <p className="text-gray-500 mb-8">
            Understand your stress levels and get a personalized plan to improve your mental well-being.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/test"
              className="inline-block px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow hover:shadow-md active:scale-95 transition"
            >
              Start Stress Test
            </Link>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow hover:shadow-md active:scale-95 transition"
            >
              Continue with AI Assistant
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Opens AI assistant in a new tab
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
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
