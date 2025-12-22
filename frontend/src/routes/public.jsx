import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  const role = localStorage.getItem("role");

  if (role === "freelancer" && isAuthenticated) {
    return <Navigate to="/freelancer/dashboard" />;
  }

  if (role === "client" && isAuthenticated) {
    return <Navigate to="/client/dashboard" />;
  }

  return children;
}
