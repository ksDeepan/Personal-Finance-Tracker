import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="bg-white dark:bg-[#071021] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💰</div>
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">Personal Finance Tracker</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm ${location.pathname==="/dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 dark:text-gray-200"}`}>Dashboard</Link>
            <Link to="/add" className={`px-3 py-2 rounded-md text-sm ${location.pathname==="/add" ? "bg-blue-50 text-blue-600" : "text-gray-700 dark:text-gray-200"}`}>Add</Link>

            <button
              onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
              className="ml-2 p-2 rounded-md bg-gray-100 dark:bg-[#0b1522] text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
