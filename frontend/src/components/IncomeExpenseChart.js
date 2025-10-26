import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts";

/**
 * data: [{name: 'Jan', income: 2000, expense: 1500}, ...]
 */
export default function IncomeExpenseChart({ data }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Monthly Income vs Expense</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#06b6d4" />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
