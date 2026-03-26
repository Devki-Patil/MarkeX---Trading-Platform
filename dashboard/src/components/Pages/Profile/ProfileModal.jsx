import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";

export default function ProfileModal({ type, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (type === "profile") {
      const fetchProfile = async () => {
        const res = await api.get("/user/profile");
        setData(res.data);
      };
      fetchProfile();
    }
  }, [type]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🔥 MAIN PANEL */}
      <div className="relative w-[500px] max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-zinc-800 rounded-2xl shadow-2xl p-6 text-white animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold capitalize">
            {type}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* ================= PROFILE ================= */}
        {type === "profile" && (
          <>
            {!data ? (
              <div>Loading...</div>
            ) : (
              <>
                <Row label="Name" value={data.name} />
                <Row label="Email" value={data.email} />
                <Row
                  label="Balance"
                  value={`₹ ${Number(data.balance || 0).toLocaleString()}`}
                />
              </>
            )}
          </>
        )}

        {/* ================= SETTINGS ================= */}
        {type === "settings" && (
          <>
            <Toggle label="Dark Mode" />
            <Toggle label="Notifications" />
            <Toggle label="Auto Trade" />
          </>
        )}

        {/* ================= CONSOLE ================= */}
        {type === "console" && (
          <div className="bg-black p-4 rounded-xl h-[300px] overflow-y-auto text-green-400 font-mono text-sm">
            <div>{">"} System Ready...</div>
            <div>{">"} Connected to server</div>
            <div>{">"} Market feed active</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔥 UI COMPONENTS */

function Row({ label, value }) {
  return (
    <div className="mb-4">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}

function Toggle({ label }) {
  const [on, setOn] = useState(true);

  return (
    <div className="flex justify-between items-center mb-4">
      <span>{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`px-4 py-1 rounded ${
          on ? "bg-green-600" : "bg-zinc-700"
        }`}
      >
        {on ? "ON" : "OFF"}
      </button>
    </div>
  );
}