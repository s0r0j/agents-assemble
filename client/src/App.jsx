import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-[#0f172a] min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}