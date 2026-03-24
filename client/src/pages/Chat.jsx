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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { text: res.data.reply, sender: "bot" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong...", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h1 className="text-lg font-semibold">AI Chat</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Ask anything about stress, anxiety, etc...
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
                  ? "bg-blue-500 text-white"
                  : "bg-white shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="text-left text-gray-400">
            AI is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          className="flex-1 border rounded-full px-4 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-5 rounded-full disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}