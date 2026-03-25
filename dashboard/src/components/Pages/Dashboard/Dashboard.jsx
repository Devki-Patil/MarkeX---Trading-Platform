import { useState } from "react";
import TopBar from "../../Layouts/TopBar";
import LeftBar from "../../Layouts/LeftBar";
import { Outlet, Navigate } from "react-router-dom";

export default function Dashboard() {
  // Safe parse
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("userInfo"));
  } catch {
    user = null;
  }

  // Auth guard
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const [showStocks, setShowStocks] = useState(false);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">

      {/* STICKY TOPBAR */}
      <div className="shrink-0 sticky top-0 z-40">
        <TopBar />
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 min-h-0">

        {/* SIDEBAR (SCROLLABLE) */}
        <div className="hidden md:flex w-[260px] lg:w-[300px] bg-[#111] border-r border-zinc-800 flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <LeftBar user={user} />
          </div>
        </div>

        {/* MAIN CONTENT (SCROLLABLE) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>

      </div>

      {/* MOBILE FLOAT BUTTON */}
      <button
        onClick={() => setShowStocks(true)}
        className="md:hidden fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        Stocks
      </button>

      {/* MOBILE STOCK PANEL */}
      {showStocks && (
        <div className="fixed inset-0 z-50 flex flex-col">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowStocks(false)}
          />

          {/* PANEL */}
          <div className="relative flex flex-col bg-[#111] h-full">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 shrink-0">
              <h2 className="text-white text-lg font-medium">
                Market
              </h2>

              <button
                onClick={() => setShowStocks(false)}
                className="text-gray-300 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* SCROLLABLE STOCK LIST */}
            <div className="flex-1 overflow-y-auto">
              <LeftBar user={user} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}