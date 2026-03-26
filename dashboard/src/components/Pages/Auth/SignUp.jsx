import { useState } from "react";
import api from "../../../Services/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setMsg("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form
        onSubmit={handleSignup}
        className="w-96 bg-[#111] p-6 rounded-lg border border-zinc-700 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        {msg && (
          <p className="text-center mb-3 text-sm text-blue-400">{msg}</p>
        )}

        <label className="text-sm">Full Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 mt-1 mb-3 bg-[#0d0d0d] border border-zinc-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-sm">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 mt-1 mb-3 bg-[#0d0d0d] border border-zinc-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 mt-1 mb-4 bg-[#0d0d0d] border border-zinc-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded text-white"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p
          className="text-center text-gray-400 text-sm mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
