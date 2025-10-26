import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        💰 Personal Finance Tracker
      </h1>
      <p className="text-gray-600 mb-6">
        Track your expenses, income, and savings easily with this app.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
