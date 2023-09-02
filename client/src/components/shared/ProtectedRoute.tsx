import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
