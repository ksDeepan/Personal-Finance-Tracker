import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const nav = useNavigate();
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-3xl w-full p-8 bg-white dark:bg-[#071021] rounded-2xl shadow text-center neon">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white neon-text mb-2">💰 Personal Finance Tracker</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Visualize your spending, manage budgets, and improve your financial habits.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => nav("/dashboard")} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Open Dashboard</button>
          <button onClick={() => nav("/add")} className="px-6 py-2 border rounded-lg">Add Transaction</button>
        </div>
      </div>
    </div>
  );
}
