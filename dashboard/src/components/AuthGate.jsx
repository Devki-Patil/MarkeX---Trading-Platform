import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./AxiosInstance";

export default function AuthGate({ children }) {
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        // 🔒 lightweight auth check
        await api.get("/auth/me");
      } catch {
        localStorage.removeItem("accessToken");
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, []);

  if (checking) return null; // or loader

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
