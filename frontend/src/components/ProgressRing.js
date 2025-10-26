import React from "react";

/**
 * percent: 0-100
 * size: px
 */
export default function ProgressRing({ percent = 60, size = 120, stroke = 12 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="url(#g1)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          fill="none"
        />
      </svg>

      <div className="ring-center text-sm text-gray-800 dark:text-white">
        <div className="text-xs">Budget</div>
        <div className="text-lg font-bold">{percent}%</div>
      </div>
    </div>
  );
}
