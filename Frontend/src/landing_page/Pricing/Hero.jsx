import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center space-y-16">

        {/* TITLE */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Charges</h1>
          <p className="text-gray-400 text-lg">
            List of all charges and taxes
          </p>
        </div>

        {/* 3 BOXES SECTION */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-14">

  {/* BOX 1 */}
  <div className="space-y-4">
    <h2 className="text-[60px] font-bold text-yellow-400 flex items-start justify-center gap-1">
      <span className="text-2xl relative -top-2">₹</span>
      <span>0</span>
    </h2>

    <h3 className="text-xl font-medium">Free equity delivery</h3>

    <p className="text-gray-400 text-[15px] leading-relaxed w-[85%] mx-auto">
      All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage.
    </p>
  </div>

  {/* BOX 2 */}
  <div className="space-y-4">
    <h2 className="text-[60px] font-bold text-yellow-400 flex items-start justify-center gap-1">
      <span className="text-2xl relative -top-2">₹</span>
      <span>20</span>
    </h2>

    <h3 className="text-xl font-medium">Intraday and F&O trades</h3>

    <p className="text-gray-400 text-[15px] leading-relaxed w-[85%] mx-auto">
      Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday, equity, currency and commodity trades.
    </p>
  </div>

  {/* BOX 3 */}
  <div className="space-y-4">
    <h2 className="text-[60px] font-bold text-yellow-400 flex items-start justify-center gap-1">
      <span className="text-2xl relative -top-2">₹</span>
      <span>0</span>
    </h2>

    <h3 className="text-xl font-medium">Free direct MF</h3>

    <p className="text-gray-400 text-[15px] leading-relaxed w-[85%] mx-auto">
      All direct mutual fund investments are free — ₹0 commissions & DP charges.
    </p>
  </div>

</div>


      </div>
    </section>
  );
}
