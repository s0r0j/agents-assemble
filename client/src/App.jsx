import Navbar from "./components/Navbar";
import AppRouter from "./app/router";

export default function App() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <AppRouter />
    </div>
  );
}
