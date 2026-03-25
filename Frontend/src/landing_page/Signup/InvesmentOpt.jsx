import React from "react";

export default function InvestmentOpt() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center space-y-14 relative z-10">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold">
          Investment options with Zerodha demat account
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-24 px-4 md:px-10">

          {/* ITEM 1 */}
          <div className="flex items-start gap-6">
            <img
              src="../../../public/Signup3.jpg"   // replace your image here
              alt="Stocks"
              className="w-20 h-20 object-contain opacity-90"
            />
            <div className="text-left space-y-1">
              <h3 className="text-xl font-medium">Stocks</h3>
              <p className="text-gray-400">
                Invest in all exchange-listed securities
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-start gap-6">
            <img
              src="../../../public/Signup2.jpg"       // replace your image here
              alt="Mutual Funds"
              className="w-20 h-20 object-contain opacity-90"
            />
            <div className="text-left space-y-1">
              <h3 className="text-xl font-medium">Mutual funds</h3>
              <p className="text-gray-400">
                Invest in commission-free direct mutual funds
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-start gap-6">
            <img
              src="../../../public/Signup1.jpg"      // replace your image here
              alt="IPO"
              className="w-20 h-20 object-contain opacity-90"
            />
            <div className="text-left space-y-1">
              <h3 className="text-xl font-medium">IPO</h3>
              <p className="text-gray-400">
                Apply to the latest IPOs instantly via UPI
              </p>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="flex items-start gap-6">
            <img
              src="../../../public/Signup4.jpg"      // replace your image here
              alt="Futures & Options"
              className="w-20 h-20 object-contain opacity-90"
            />
            <div className="text-left space-y-1">
              <h3 className="text-xl font-medium">Futures & options</h3>
              <p className="text-gray-400">
                Hedge and mitigate market risk through simplified F&O trading
              </p>
            </div>
          </div>

        </div>

        {/* BUTTON */}
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 px-10 rounded-lg text-lg">
          Explore Investments
        </button>
      </div>
    </section>
  );
}
