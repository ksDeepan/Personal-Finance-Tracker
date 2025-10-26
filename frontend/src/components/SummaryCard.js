import React from "react";

export default function SummaryCard({ title, value, subtitle, icon, color = "bg-white" }) {
  return (
    <div className={`rounded-2xl shadow p-5 ${color} neon`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">₹{Number(value || 0).toLocaleString()}</div>
          {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}
