import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StressTest from "./pages/StressTest";
import Results from "./pages/Results";
import Schedule from "./pages/Schedule";
import FinalCheck from "./pages/FinalCheck";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<StressTest />} />
        <Route path="/results" element={<Results />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/final" element={<FinalCheck />} />
      </Routes>
    </div>
  );
}