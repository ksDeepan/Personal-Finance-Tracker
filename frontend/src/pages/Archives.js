// src/pages/Archives.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../utils/api";
import TransactionTable from "../components/TransactionTable";
import { useNavigate } from "react-router-dom";

export default function Archives(){
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/transactions/archives`);
      setArchives(res.data || []);
    } catch (err) {
      console.error("Fetch archives error:", err);
      alert("Failed to load archives. Check backend.");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchArchives(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Archived Transactions</h1>
        <div>
          <button onClick={() => nav("/dashboard")} className="bg-gray-200 px-3 py-2 rounded">Back</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <div className="text-sm text-gray-600 mb-3">These transactions were archived (older than current month).</div>
        <TransactionTable transactions={archives} onDelete={null} />
      </div>

      {loading && <div className="mt-4 text-gray-500">Loading…</div>}
    </div>
  );
}
