import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const authContext = useAuth();

  const user = authContext?.user;

  console.log(authContext);

  if (!user) {
    console.log("User is not logged in");
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
