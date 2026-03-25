import React from "react";

export default function TypesAcc() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* TITLE */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold">
          Explore different account types
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Individual Account */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition duration-300">
            <img
              src="../../../public/acop-individual.svg"   // replace your dark icon
              alt="Individual Account"
              className="w-10 h-10 mb-4 opacity-90"
            />
            <h3 className="text-xl font-semibold mb-2">Individual Account</h3>
            <p className="text-gray-400">
              Invest in equity, mutual funds and derivatives
            </p>
          </div>

          {/* HUF Account */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition duration-300">
            <img
              src="../../../public/acop-huf.svg"
              alt="HUF Account"
              className="w-10 h-10 mb-4 opacity-90"
            />
            <h3 className="text-xl font-semibold mb-2">HUF Account</h3>
            <p className="text-gray-400">
              Make tax-efficient investments for your family
            </p>
          </div>

          {/* NRI Account */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition duration-300">
            <img
              src="../../../public/acop-nri.svg"
              alt="NRI Account"
              className="w-10 h-10 mb-4 opacity-90"
            />
            <h3 className="text-xl font-semibold mb-2">NRI Account</h3>
            <p className="text-gray-400">
              Invest in equity, mutual funds, debentures, and more
            </p>
          </div>

          {/* Minor Account */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition duration-300">
            <img
              src="../../../public/acop-minor.svg"
              alt="Minor Account"
              className="w-10 h-10 mb-4 opacity-90"
            />
            <h3 className="text-xl font-semibold mb-2">Minor Account</h3>
            <p className="text-gray-400">
              Teach your little ones about money & invest for their future
            </p>
          </div>

          {/* Corporate / LLP / Partnership */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition duration-300">
            <img
              src="../../../public/acop-corporate.svg"
              alt="Corporate / LLP / Partnership"
              className="w-10 h-10 mb-4 opacity-90"
            />
            <h3 className="text-xl font-semibold mb-2">
              Corporate / LLP / Partnership
            </h3>
            <p className="text-gray-400">
              Manage your business surplus and investments easily
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
