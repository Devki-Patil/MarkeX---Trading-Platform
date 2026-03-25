import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  // If NOT logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → continue
  return children;
}
