import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/authPage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ ADD THIS */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
}