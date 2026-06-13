import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!isAuthenticated && !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}