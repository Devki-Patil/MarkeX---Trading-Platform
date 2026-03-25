import React, { useState } from "react";

export default function BrokerageTabs() {
  const [active, setActive] = useState("equity");

  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* ---------- TABS ---------- */}
        <div className="flex items-center gap-10 text-lg font-medium border-b border-gray-700 pb-2">
          {["equity", "currency", "commodity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`pb-2 transition-colors ${
                active === tab
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}

              {/* ACTIVE BLUE UNDERLINE */}
              {active === tab && (
                <div className="h-0.5 bg-blue-500 w-full mt-2 rounded"></div>
              )}
            </button>
          ))}
        </div>

        {/* ---------- EQUITY TABLE ---------- */}
        {active === "equity" && (
          <div className="mt-10 bg-[#121212] p-6 rounded-xl border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3"> &nbsp; </th>
                  <th className="py-3">Equity delivery</th>
                  <th className="py-3">Equity intraday</th>
                  <th className="py-3">F&O – Futures</th>
                  <th className="py-3">F&O – Options</th>
                </tr>
              </thead>
              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Brokerage</td>
                  <td>Zero Brokerage</td>
                  <td>0.03% or ₹20/executed order (lower)</td>
                  <td>0.03% or ₹20 per executed order</td>
                  <td>Flat ₹20 per executed order</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">STT/CTT</td>
                  <td>0.1% on buy & sell</td>
                  <td>0.025% on sell</td>
                  <td>0.02% on sell</td>
                  <td>0.125% of intrinsic value</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Transaction charges</td>
                  <td>NSE: 0.00297%</td>
                  <td>NSE: 0.00297%</td>
                  <td>NSE: 0.00173%</td>
                  <td>NSE: 0.00353% (premium)</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">GST</td>
                  <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">SEBI charges</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Stamp <br /> charges</td>
                  <td>0.015% or ₹1500 / <br /> crore on buy side</td>
                  <td>0.003% or ₹300 / <br /> crore on buy side</td>
                  <td>0.002% or ₹200 / <br /> crore on buy side</td>
                  <td>0.003% or ₹300 / <br /> crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ---------- CURRENCY TABLE ---------- */}
        {active === "currency" && (
          <div className="mt-10 bg-[#121212] p-6 rounded-xl border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3"> &nbsp; </th>
                  <th className="py-3">Currency futures</th>
                  <th className="py-3">Currency options</th>
                </tr>
              </thead>
              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Brokerage</td>
                  <td>0.03% or ₹20/executed order</td>
                  <td>₹20 per executed order</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">STT/CTT</td>
                  <td>No STT</td>
                  <td>No STT</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Transaction charges</td>
                  <td>NSE: 0.00035%</td>
                  <td>NSE: 0.0311%</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">GST</td>
                  <td>18% on charges</td>
                  <td>18% on charges</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">SEBI charges</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Stamp charges</td>
                  <td>0.0001% or ₹10 / crore on buy side</td>
                  <td>0.0001% or ₹10 / crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ---------- COMMODITY TABLE ---------- */}
        {active === "commodity" && (
          <div className="mt-10 bg-[#121212] p-6 rounded-xl border border-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3"> &nbsp; </th>
                  <th className="py-3">Commodity futures</th>
                  <th className="py-3">Commodity options</th>
                </tr>
              </thead>
              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Brokerage</td>
                  <td>0.03% or ₹20/executed order</td>
                  <td>₹20/executed order</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">STT/CTT</td>
                  <td>0.01% on sell</td>
                  <td>0.05% on sell</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Transaction charges</td>
                  <td>MCX: 0.0021%</td>
                  <td>MCX: 0.048%</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">GST</td>
                  <td>18% on charges</td>
                  <td>18% on charges</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">SEBI charges</td>
                  <td>Agri:<br />₹1 / crore <br /> Non-agri: <br /> ₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 font-medium text-gray-300">Stamp charges</td>
                  <td>0.002% or ₹200 / crore on buy side</td>
                  <td>0.003% or ₹300 / crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
