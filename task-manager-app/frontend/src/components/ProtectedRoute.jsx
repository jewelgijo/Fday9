import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" />;
}