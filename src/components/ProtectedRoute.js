import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Check local storage to persist login state across refreshes
  const isAuth = localStorage.getItem("auth") === "true";

  // If authenticated, render child routes (Outlet); otherwise force redirect to login
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}