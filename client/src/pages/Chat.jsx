import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { message: userMessage }
      );

      setMessages((prev) => [
        ...prev,
        { text: res.data.reply, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-[80vh] mt-6 flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden text-white">

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h1 className="font-semibold">AI Assistant</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Ask anything about stress, anxiety...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">AI is typing...</p>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-2">

        <input
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="px-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Send
        </button>

      </div>
    </div>
  );
}