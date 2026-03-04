"use client";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getInitialTheme, toggleTheme } from "./utils/theme.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Vehicles from "./pages/Vehicles";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import Footer from "./components/Footer.jsx";

// Create a separate component for the layout logic
function AppContent() {
  const location = useLocation(); // Now works because it's inside BrowserRouter
  const isAuthPage = location.pathname === "/" || location.pathname === "/forgot-password";

  useEffect(() => {
    toggleTheme(getInitialTheme());
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;