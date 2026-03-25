import React from "react";

const Awards = () => {
  return (
    <div className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-4">

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT TEXT SECTION */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-semibold">Trust with confidence</h2>

          <div>
            <h3 className="text-lg font-medium">Customer-first always</h3>
            <p className="text-gray-400 text-sm mt-1">
              That’s why 1.6+ crore customers trust us with investments.  
              We keep everything transparent and secure.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">No spam or gimmicks</h3>
            <p className="text-gray-400 text-sm mt-1">
              No annoying notifications, no unnecessary ads—just a clean and 
              powerful experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">The MarkeX universe</h3>
            <p className="text-gray-400 text-sm mt-1">
              An entire ecosystem built to give you the smoothest investment 
              experience possible.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Do better with money</h3>
            <p className="text-gray-400 text-sm mt-1">
              We help you make better financial decisions with the right 
              tools and guidance.
            </p>
          </div>
        </div>

        {/* RIGHT ECOSYSTEM IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="../../../public/HomeAwards.png"
            alt="ecosystem"
            className="w-full max-w-xl object-contain opacity-95"
          />
        </div>

      </div>
    </div>
  );
};

export default Awards;
