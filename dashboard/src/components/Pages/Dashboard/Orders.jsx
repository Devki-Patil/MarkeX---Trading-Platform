import React, { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";
import refresh from "../../Refresh";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("ORDERS FETCH ERROR:", err?.response?.data);
      }
    };

    fetchOrders();
    const unsubscribe = refresh.subscribe(fetchOrders);
    return () => unsubscribe();
  }, []);

  const q = search.toLowerCase();

  const filtered = orders.filter((o) =>
    o.instrument?.toLowerCase().includes(q) ||
    o.product?.toLowerCase().includes(q) ||
    o.side?.toLowerCase().includes(q)
  );

  const badgeColor = (side) =>
    side === "BUY"
      ? "bg-green-900/40 text-green-400 border-green-600"
      : "bg-red-900/40 text-red-400 border-red-600";

  const statusColor = (status) =>
    status === "EXECUTED"
      ? "text-green-400"
      : status === "REJECTED"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="p-4 md:p-6 text-gray-200 h-full">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
        <h1 className="text-xl md:text-2xl font-semibold">
          Orders{" "}
          <span className="text-gray-400 text-sm md:text-base">
            ({filtered.length})
          </span>
        </h1>

        <input
          className="w-full md:w-[260px] px-3 py-2 bg-[#111] border border-zinc-800 rounded-md text-sm outline-none focus:border-blue-500"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 gap-3 text-xs text-gray-400 border-b border-zinc-800 pb-2 mb-2">
          <span>Instrument</span>
          <span>Side</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Status</span>
          <span>Time</span>
        </div>

        {/* DATA */}
        {filtered.length === 0 ? (
          <div className="text-gray-500 text-sm mt-10 text-center">
            No orders found
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((o, i) => (
              <div
                key={o._id || i}
                className="grid grid-cols-6 gap-3 items-center px-3 py-2 bg-[#111] border border-zinc-800 rounded-md hover:bg-[#1a1a1a] transition text-sm"
              >
                <span className="font-medium">{o.instrument}</span>

                <span
                  className={`px-2 py-1 text-xs rounded border w-fit ${badgeColor(
                    o.side
                  )}`}
                >
                  {o.side}
                </span>

                <span>{o.qty}</span>

                <span>₹{o.price?.toFixed(2)}</span>

                <span className={`font-medium ${statusColor(o.status)}`}>
                  {o.status}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(o.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden flex flex-col gap-3">

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-sm mt-10 text-center">
            No orders found
          </div>
        ) : (
          filtered.map((o, i) => (
            <div
              key={o._id || i}
              className="bg-[#111] border border-zinc-800 rounded-xl p-4 space-y-2"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-base">
                  {o.instrument}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded border ${badgeColor(
                    o.side
                  )}`}
                >
                  {o.side}
                </span>
              </div>

              {/* Middle */}
              <div className="flex justify-between text-sm text-gray-400">
                <span>Qty: {o.qty}</span>
                <span>₹{o.price?.toFixed(2)}</span>
              </div>

              {/* Bottom */}
              <div className="flex justify-between items-center text-xs">
                <span className={statusColor(o.status)}>
                  {o.status}
                </span>

                <span className="text-gray-500">
                  {new Date(o.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}