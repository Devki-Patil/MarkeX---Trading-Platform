import React from "react";

const Stats = () => {
  return (
    <div className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADING + DESCRIPTION */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold">Unbeatable pricing</h2>

          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            We pioneered the concept of discount broking and price transparency in India.
            Flat fees and no hidden charges.
          </p>

          <button className="text-blue-500 mt-4 inline-flex items-center gap-1 hover:underline">
            See pricing →
          </button>
        </div>

        {/* RESPONSIVE STATS SECTION */}
        <div className="
            flex flex-col 
            md:flex-row 
            md:items-center 
            md:justify-start 
            gap-12 md:gap-24 
            mt-16
        ">

          {/* STAT 1 */}
          <div className="flex items-center gap-4">
            <div className="flex items-start relative">
              <span className="text-yellow-400 text-xl relative -top-2 mr-1">₹</span>
              <span className="text-6xl font-bold text-yellow-400 leading-none">0</span>
            </div>

            <p className="text-gray-400 text-sm leading-tight">
              Free account<br />opening
            </p>
          </div>

          {/* STAT 2 */}
          <div className="flex items-center gap-4">
            <div className="flex items-start relative">
              <span className="text-yellow-400 text-xl relative -top-2 mr-1">₹</span>
              <span className="text-6xl font-bold text-yellow-400 leading-none">0</span>
            </div>

            <p className="text-gray-400 text-sm leading-tight">
              Free equity delivery<br />and direct mutual funds
            </p>
          </div>

          {/* STAT 3 */}
          <div className="flex items-center gap-4">
            <div className="flex items-start relative">
              <span className="text-yellow-400 text-xl relative -top-2 mr-1">₹</span>
              <span className="text-6xl font-bold text-yellow-400 leading-none">20</span>
            </div>

            <p className="text-gray-400 text-sm leading-tight">
              Intraday and<br />F&amp;O
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Stats;
