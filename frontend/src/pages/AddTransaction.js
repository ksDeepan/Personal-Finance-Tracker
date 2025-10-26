import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../utils/api";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Food", "Rent", "Salary", "Shopping", "Transport", "Other"
];

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    category: "Food",
    description: ""
  });

  const [status, setStatus] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const payload = { 
        ...form,
        amount: parseFloat(form.amount) 
      };

      await axios.post(`${API_BASE}/transactions/`, payload);

      setStatus("saved");
      setTimeout(() => nav("/dashboard"), 1000);
    } catch (err) {
      console.error("API Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-[#071021] rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add Transaction
        </h2>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <select value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="border rounded px-3 py-2">
            <option>Expense</option>
            <option>Income</option>
          </select>

          <input type="number" placeholder="Amount"
            value={form.amount}
            required
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="border rounded px-3 py-2" />

          <select value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="border rounded px-3 py-2">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <input type="text"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="border rounded px-3 py-2"
          />

          <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
            {status === "saving" ? "Saving..." : "Add"}
          </button>
        </form>

        {/* Status messages */}
        <div className="mt-3 text-sm">
          {status === "saved" && <div className="text-green-600">✅ Saved! Redirecting…</div>}
          {status === "error" && (
            <div className="text-red-600">❌ Error saving — Check backend running!</div>
          )}
        </div>

      </div>
    </div>
  );
}
