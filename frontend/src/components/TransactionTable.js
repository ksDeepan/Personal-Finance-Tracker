import React from "react";
import axios from "axios";
import API_BASE from "../utils/api";

export default function TransactionTable({ transactions = [], onDelete }) {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/transactions/${id}`);
      onDelete(id); // ✅ instantly update UI
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete! Check backend connection.");
    }
  };

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-[#0b1220] shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Recent Transactions
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Category</th>
              <th className="py-2 px-2">Amount</th>
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.slice().reverse().map(t => (
                <tr
                  key={t.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-2">{t.type}</td>
                  <td className="py-2 px-2">{t.category || "N/A"}</td>
                  <td
                    className={`py-2 px-2 font-semibold ${
                      t.type === "Income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ₹{Number(t.amount).toLocaleString()}
                  </td>
                  <td className="py-2 px-2">
                    {new Date(t.date || t.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
