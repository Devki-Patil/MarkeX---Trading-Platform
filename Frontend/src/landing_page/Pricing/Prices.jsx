import React from "react";

export default function Prices() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">


        {/* ================================
          1) Charges for account opening 
        ================================= */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Charges for account opening</h2>

          <div className="overflow-x-auto bg-[#121212] border border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3 px-5">Type of account</th>
                  <th className="py-3 px-5">Charges</th>
                </tr>
              </thead>

              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">Online account</td>
                  <td className="py-3 px-5 text-green-400 font-semibold">FREE</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">Offline account</td>
                  <td className="py-3 px-5 text-green-400 font-semibold">FREE</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">NRI account (offline only)</td>
                  <td className="py-3 px-5">₹ 500</td>
                </tr>

                <tr>
                  <td className="py-3 px-5">
                    Partnership, LLP, HUF, or Corporate accounts (offline only)
                  </td>
                  <td className="py-3 px-5">₹ 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



        {/* ================================
          2) Demat AMC Section 
        ================================= */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Demat AMC (Annual Maintenance Charge)</h2>

          <div className="overflow-x-auto bg-[#121212] border border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3 px-5">Value of holdings</th>
                  <th className="py-3 px-5">AMC</th>
                </tr>
              </thead>

              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">Up to ₹4 lakh</td>
                  <td className="py-3 px-5 text-green-400 font-semibold">FREE</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">₹4 lakh – ₹10 lakh</td>
                  <td className="py-3 px-5">₹100 per year (charged quarterly)</td>
                </tr>

                <tr>
                  <td className="py-3 px-5">Above ₹10 lakh</td>
                  <td className="py-3 px-5">₹300 per year (charged quarterly)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[13px] text-gray-500">
            * Lower AMC is applicable only if the account qualifies as a Basic Services Demat Account (BSDA).  
            BSDA account holders cannot hold more than one demat account.
          </p>
        </div>



        {/* ================================
          3) Optional value added services 
        ================================= */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Charges for optional value added services</h2>

          <div className="overflow-x-auto bg-[#121212] border border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-300 text-sm border-b border-gray-700">
                  <th className="py-3 px-5">Service</th>
                  <th className="py-3 px-5">Billing Frequency</th>
                  <th className="py-3 px-5">Charges</th>
                </tr>
              </thead>

              <tbody className="text-gray-400 text-sm">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">Tickertape</td>
                  <td className="py-3 px-5">Monthly / Annual</td>
                  <td className="py-3 px-5">Free: 0 | Pro: 249/2399</td>
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="py-3 px-5">Smallcase</td>
                  <td className="py-3 px-5">Per transaction</td>
                  <td className="py-3 px-5">
                    Buy & Invest More: 100 | SIP: 10
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-5">Kite Connect</td>
                  <td className="py-3 px-5">Monthly</td>
                  <td className="py-3 px-5">Connect: 500 | Personal: Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
