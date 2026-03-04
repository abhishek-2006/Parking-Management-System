"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getInitialTheme, toggleTheme } from "./utils/theme.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Vehicles from "./pages/Vehicles";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  useEffect(() => {
    toggleTheme(getInitialTheme());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
