import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyTrendChart({ data = [] }) {
  return (
    <div className="rounded-xl p-4 bg-white dark:bg-[#0b1220] shadow">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Balance Trend</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#34d399" strokeWidth={3} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
