import React, { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";
import refresh from "../../Refresh";

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await api.get("/holdings");
        setHoldings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("HOLDINGS ERROR:", err);
      }
    };

    fetchHoldings();
    const unsub = refresh.subscribe(fetchHoldings);
    return () => unsub();
  }, []);

  if (holdings.length === 0) {
    return (
      <div className="p-6 text-gray-400 text-sm text-center">
        No holdings yet. Buy a stock to see it here.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-gray-200 h-full">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">

        <div className="grid grid-cols-7 gap-3 text-xs text-gray-400 border-b border-zinc-800 pb-2 mb-3">
          <span>Instrument</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Avg</span>
          <span className="text-right">LTP</span>
          <span className="text-right">Current</span>
          <span className="text-right">P&L</span>
          <span className="text-right">P&L %</span>
        </div>

        <div className="flex flex-col gap-2">
          {holdings.map((h) => {
            const current = h.qty * h.ltp;
            const pnl = (h.ltp - h.avg) * h.qty;
            const pnlPct = h.avg
              ? ((h.ltp - h.avg) / h.avg) * 100
              : 0;

            const profit = pnl >= 0;

            return (
              <div
                key={h._id}
                className="grid grid-cols-7 gap-3 items-center px-3 py-2 bg-[#111] border border-zinc-800 rounded text-sm"
              >
                <span className="font-medium">{h.instrument}</span>
                <span className="text-right">{h.qty}</span>
                <span className="text-right">₹{h.avg.toFixed(2)}</span>
                <span className="text-right">₹{h.ltp.toFixed(2)}</span>
                <span className="text-right">₹{current.toFixed(2)}</span>

                <span className={`text-right ${profit ? "text-green-400" : "text-red-400"}`}>
                  {profit ? "+" : "-"}₹{Math.abs(pnl).toFixed(2)}
                </span>

                <span className={`text-right ${profit ? "text-green-400" : "text-red-400"}`}>
                  {profit ? "+" : "-"}{Math.abs(pnlPct).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden flex flex-col gap-3">

        {holdings.map((h) => {
          const current = h.qty * h.ltp;
          const pnl = (h.ltp - h.avg) * h.qty;
          const pnlPct = h.avg
            ? ((h.ltp - h.avg) / h.avg) * 100
            : 0;

          const profit = pnl >= 0;

          return (
            <div
              key={h._id}
              className="bg-[#111] border border-zinc-800 rounded-xl p-4"
            >

              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-base">
                  {h.instrument}
                </span>

                <span
                  className={`text-sm font-medium ${
                    profit ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {profit ? "+" : "-"}
                  {Math.abs(pnlPct).toFixed(2)}%
                </span>
              </div>

              {/* SECOND ROW */}
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Qty: {h.qty}</span>
                <span>Avg: ₹{h.avg.toFixed(2)}</span>
              </div>

              {/* THIRD ROW */}
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>LTP: ₹{h.ltp.toFixed(2)}</span>
                <span>Value: ₹{current.toFixed(2)}</span>
              </div>

              {/* PNL */}
              <div
                className={`text-sm font-medium ${
                  profit ? "text-green-400" : "text-red-400"
                }`}
              >
                {profit ? "+" : "-"}₹{Math.abs(pnl).toFixed(2)}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}