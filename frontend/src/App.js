// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Archives from "./pages/Archives";
import AddTransaction from "./pages/AddTransaction";
// ...other imports

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/add" element={<AddTransaction />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
