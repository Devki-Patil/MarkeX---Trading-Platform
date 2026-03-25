import { useEffect, useState } from "react";
import api from "../../Services/AxiosInstance";
import { io } from "socket.io-client";
import TradingChart from "../Pages/Features/Trading/TradingChart";

export default function RightBar() {
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [holdings, setHoldings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/holdings");
      setHoldings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("HOLDINGS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("fundsUpdate", fetchData);

    return () => socket.disconnect();
  }, []);

  return (
    <div className="text-gray-200 space-y-6">

      {/* Header */}
      <h1 className="text-xl md:text-2xl lg:text-3xl">
        Hi, {user?.name || "User"}
      </h1>

      {/* Chart */}
      <div className="bg-[#111] border border-zinc-800 rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl mb-4 text-gray-300">
          Market Overview
        </h2>

        <div className="w-full h-[250px] md:h-[300px]">
          <TradingChart />
        </div>
      </div>

      {/* Holdings Strip */}
      <div className="bg-[#111] border border-zinc-800 rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl mb-4 text-gray-300">
          Holdings ({holdings.length})
        </h2>

        <div className="flex h-4 rounded overflow-hidden">
          {holdings.map((h, i) => (
            <div
              key={i}
              style={{
                width: `${Math.min(h.qty * 5, 100)}%`,
                background: `hsl(${i * 40}, 70%, 50%)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Positions */}
      <div className="bg-[#111] border border-zinc-800 rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl mb-4 text-gray-300">
          Positions
        </h2>

        <div className="space-y-4">
          {holdings.map((h, i) => (
            <div key={i}>
              <div className="text-xs md:text-sm text-gray-400 mb-1">
                {h.instrument} ({h.qty})
              </div>

              <div className="w-full bg-zinc-800 h-2 rounded">
                <div
                  className="h-2 rounded bg-green-500"
                  style={{
                    width: `${Math.min(h.qty * 5, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}