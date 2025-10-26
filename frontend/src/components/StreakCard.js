import React from "react";

export default function StreakCard({ days = 5 }) {
  return (
    <div className="rounded-2xl shadow p-4 bg-gradient-to-br from-[#06b6d4]/10 to-[#8b5cf6]/8">
      <div className="text-sm text-gray-500 dark:text-gray-300">Spending Streak</div>
      <div className="mt-2 flex items-center gap-3">
        <div className="text-3xl">🔥</div>
        <div>
          <div className="text-xl font-bold dark:text-white">{days} days</div>
          <div className="text-xs text-gray-400">No overspend streak</div>
        </div>
      </div>
    </div>
  );
}
