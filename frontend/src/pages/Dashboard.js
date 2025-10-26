// src/pages/Dashboard.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_BASE from "../utils/api";
import SummaryCard from "../components/SummaryCard";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import TransactionTable from "../components/TransactionTable";
import ProgressRing from "../components/ProgressRing";
import StreakCard from "../components/StreakCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0ea5e9","#10b981","#f59e0b","#fb7185","#8b5cf6"];

export default function Dashboard(){
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiving, setArchiving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const nav = useNavigate();

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/transactions/`);
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const totals = useMemo(() => {
    const income = transactions.filter(t=>t.type==="Income").reduce((s,t)=>s+Number(t.amount),0);
    const expense = transactions.filter(t=>t.type==="Expense").reduce((s,t)=>s+Number(t.amount),0);
    return { income, expense, balance: income-expense };
  }, [transactions]);

  const categoryData = useMemo(()=> {
    const map = {};
    transactions.forEach(t => { map[t.category] = (map[t.category]||0) + Number(t.amount); });
    return Object.entries(map).map(([name,value])=>({name, value}));
  }, [transactions]);

  const monthlyData = useMemo(()=> {
    const map = {};
    transactions.forEach(t => {
      const d = new Date(t.created_at || t.date || Date.now());
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      if(!map[key]) map[key] = {income:0, expense:0};
      if(t.type==="Income") map[key].income += Number(t.amount);
      else map[key].expense += Number(t.amount);
    });
    return Object.entries(map).sort().map(([k,v])=>{
      const [y,m]=k.split("-");
      return { name:`${m}/${y}`, income: Math.round(v.income), expense: Math.round(v.expense), total: Math.round(v.income - v.expense) };
    });
  }, [transactions]);

  const budget = Math.max(1, totals.income*0.8 || 10000);
  const spent = totals.expense;
  const percent = Math.min(100, Math.round((spent / budget) * 100));

  const handleDelete = (id) => {
    setTransactions(tx => tx.filter(t => t.id !== id));
  };

  const handleArchive = async () => {
    try {
      setArchiving(true);
      const res = await axios.post(`${API_BASE}/transactions/archive_old`);
      await fetch();
      alert(res?.data?.message || "Archived successfully ✅");
    } catch {
      alert("Failed to archive 😢");
    } finally {
      setArchiving(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => nav("/archives")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded"
          >
            View Archives
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={archiving}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded"
          >
            {archiving ? "Archiving…" : "Archive Old Transactions"}
          </button>
        </div>
      </div>

      {/* ✅ Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#071021] p-6 rounded-xl w-80 text-center shadow-lg">
            <p className="text-lg font-semibold">Confirm Archive</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Move last month's transactions to archive?
            </p>
            <div className="mt-5 flex gap-3 justify-center">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleArchive}
              >
                Yes
              </button>
              <button
                className="bg-gray-400 dark:bg-gray-700 text-white px-4 py-2 rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Income" value={Math.round(totals.income)} subtitle="All time" icon="💵" />
        <SummaryCard title="Total Expense" value={Math.round(totals.expense)} subtitle="All time" icon="🧾" />
        <SummaryCard title="Balance" value={Math.round(totals.balance)} subtitle="Income - Expense" icon="🏦" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-[#071021] rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Budget Progress</h3>
          <div className="flex items-center gap-6 mt-3">
            <ProgressRing percent={percent} size={120} stroke={14} />
            <div>
              <div className="text-sm text-gray-500">Budget</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                ₹{budget.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Spent: ₹{spent.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <StreakCard days={5} />

        <div className="bg-white dark:bg-[#071021] rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Add</h3>
          <a href="/add" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">Add Transaction</a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <IncomeExpenseChart data={monthlyData} />
        </div>
        <div className="bg-white dark:bg-[#071021] rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Spending by Category</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" outerRadius={100}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrendChart data={monthlyData.map(m => ({ name: m.name, total: m.total }))} />
        <TransactionTable transactions={transactions} onDelete={handleDelete} />
      </div>

      {loading && <div className="text-center text-gray-500 mt-6">Loading…</div>}
    </div>
  );
}
