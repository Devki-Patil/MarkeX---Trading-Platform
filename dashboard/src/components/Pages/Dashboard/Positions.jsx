import React, { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";
import refresh from "../../Refresh";

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await api.get("/positions");

        const data = res.data;

        if (Array.isArray(data)) {
          setPositions(data);
        } else if (Array.isArray(data.positions)) {
          setPositions(data.positions);
        } else if (Array.isArray(data.data)) {
          setPositions(data.data);
        } else {
          setPositions([]);
        }
      } catch (err) {
        console.error("POSITIONS ERROR:", err?.response?.data || err.message);
        setPositions([]);
      }
    };

    fetchPositions();

    // 🔥 auto refresh (every 3 sec)
    const interval = setInterval(fetchPositions, 3000);

    const unsub = refresh.subscribe(fetchPositions);

    return () => {
      clearInterval(interval);
      unsub();
    };
  }, []);

  // 🔍 filter
  const filtered = positions.filter((p) =>
    (p.instrument || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📊 calc
  const calcPnL = (p) => {
    const avg = Number(p.avg || 0);
    const ltp = Number(p.ltp || 0);
    const qty = Number(p.qty || 0);

    const investment = avg * qty;
    const current = ltp * qty;

    const pnl = current - investment;
    const pct = avg ? ((ltp - avg) / avg) * 100 : 0;

    return { pnl, pct, investment, current };
  };

  // 🔥 TOTALS
  const totals = filtered.reduce(
    (acc, p) => {
      const { pnl, investment, current } = calcPnL(p);

      acc.pnl += pnl;
      acc.investment += investment;
      acc.current += current;

      return acc;
    },
    { pnl: 0, investment: 0, current: 0 }
  );

  const profit = totals.pnl >= 0;

  return (
    <div className="p-4 md:p-6 text-gray-200 w-full">

      {/* 🔥 TOP SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">

        <div className="bg-[#111] p-4 rounded-lg border border-zinc-800">
          <div className="text-xs text-gray-400">Investment</div>
          <div className="text-white font-semibold">
            ₹{totals.investment.toFixed(2)}
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-lg border border-zinc-800">
          <div className="text-xs text-gray-400">Current Value</div>
          <div className="text-white font-semibold">
            ₹{totals.current.toFixed(2)}
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-lg border border-zinc-800 col-span-2 md:col-span-1">
          <div className="text-xs text-gray-400">Total P&L</div>
          <div
            className={`font-semibold ${
              profit ? "text-green-400" : "text-red-400"
            }`}
          >
            ₹{totals.pnl.toFixed(2)}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h1 className="text-lg md:text-xl font-semibold">
          Positions ({filtered.length})
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="bg-[#111] border border-zinc-800 px-3 py-2 rounded-md text-sm outline-none w-full md:w-[220px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-sm">
          No positions found
        </div>
      )}

      {/* DESKTOP */}
      {filtered.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead className="text-gray-400 border-b border-zinc-800">
              <tr>
                <th className="p-2 text-left">Instrument</th>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Avg</th>
                <th className="p-2 text-right">LTP</th>
                <th className="p-2 text-right">P&L</th>
                <th className="p-2 text-right">P&L %</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => {
                const { pnl, pct } = calcPnL(p);
                const profit = pnl >= 0;

                return (
                  <tr key={p._id || i} className="border-b border-zinc-800">
                    <td className="p-2 truncate max-w-[120px]">
                      {p.instrument || "-"}
                    </td>

                    <td className="p-2">{p.product || "CNC"}</td>

                    <td className="p-2 text-right">{p.qty || 0}</td>

                    <td className="p-2 text-right">
                      ₹{Number(p.avg || 0).toFixed(2)}
                    </td>

                    <td className="p-2 text-right">
                      ₹{Number(p.ltp || 0).toFixed(2)}
                    </td>

                    <td
                      className={`p-2 text-right ${
                        profit ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ₹{pnl.toFixed(2)}
                    </td>

                    <td
                      className={`p-2 text-right ${
                        profit ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {pct.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE */}
      {filtered.length > 0 && (
        <div className="md:hidden flex flex-col gap-3">
          {filtered.map((p, i) => {
            const { pnl, pct } = calcPnL(p);
            const profit = pnl >= 0;

            return (
              <div key={i} className="bg-[#111] p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-2">
                  <span>{p.instrument}</span>
                  <span className={profit ? "text-green-400" : "text-red-400"}>
                    ₹{pnl.toFixed(2)}
                  </span>
                </div>

                <div className="text-xs text-gray-400 grid grid-cols-2 gap-2">
                  <div>Qty: {p.qty}</div>
                  <div>Avg: ₹{Number(p.avg).toFixed(2)}</div>
                  <div>LTP: ₹{Number(p.ltp).toFixed(2)}</div>
                  <div>{pct.toFixed(2)}%</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}