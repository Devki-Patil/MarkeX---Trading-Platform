import { useState } from "react";
import api from "../../../Services/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.accessToken);

      console.log("LOGIN RES:", res.data);

      // ✅ FIXED
      const token = res.data.accessToken;

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("accessToken", token);

      if (res.data.user) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      }

      setMsg("Login successful!");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500);

    } catch (err) {
      console.log("LOGIN ERROR:", err?.response?.data || err.message);

      setMsg(
        err?.response?.data?.message ||
        "Invalid login credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="w-[350px] bg-[#111] p-6 rounded-lg border border-gray-700 shadow-xl">

        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {msg && (
          <p className="text-center text-sm text-blue-400 mb-3">{msg}</p>
        )}

        <input
          className="w-full mb-3 p-2 bg-[#0d0d0d] border border-zinc-700 rounded outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 bg-[#0d0d0d] border border-zinc-700 rounded outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="text-center text-gray-400 text-sm mt-4 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign Up
        </p>

      </div>
    </div>
  );
}