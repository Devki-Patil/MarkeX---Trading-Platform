import React from "react";

export default function Demat() {
  return (
    <>
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* TITLE */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold">
          Steps to open a demat account with Zerodha
        </h2>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <img
              src="../../../public/yt.jpg"   // replace with your dark image
              alt="Steps Illustration"
              className="w-[85%] md:w-[75%] object-contain rounded-lg"
            />
          </div>

          {/* RIGHT LIST */}
          <div className="space-y-12">

            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="text-2xl font-semibold border border-gray-600 rounded-full w-14 h-14 flex items-center justify-center">
                01
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-medium">Enter the requested details</h3>
                <div className="w-full h-px bg-gray-700 mt-3"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="text-2xl font-semibold border border-gray-600 rounded-full w-14 h-14 flex items-center justify-center">
                02
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-medium">Complete e-sign & verification</h3>
                <div className="w-full h-px bg-gray-700 mt-3"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="text-2xl font-semibold border border-gray-600 rounded-full w-14 h-14 flex items-center justify-center">
                03
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-medium">Start investing!</h3>
                <div className="w-full h-px bg-gray-700 mt-3"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="flex flex-col gap-6">
          <img
            src="../../../public/Signup3.jpg"  // replace with your dark theme img
            alt="Benefits Illustration"
            className="w-[85%] md:w-[70%] object-contain rounded-lg"
          />

          {/* Small Title Under the Image */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-200">
            Benefits of opening a Zerodha demat account
          </h3>
        </div>

        {/* RIGHT BENEFITS LIST */}
        <div className="space-y-10">

          {/* Item 1 */}
          <div>
            <h4 className="text-xl font-medium">Unbeatable pricing</h4>
            <p className="text-gray-400 mt-2">
              Zero charges for equity & mutual fund investments. Flat ₹20 fees
              for intraday and F&O trades.
            </p>
          </div>

          {/* Item 2 */}
          <div>
            <h4 className="text-xl font-medium">Best investing experience</h4>
            <p className="text-gray-400 mt-2">
              Simple and intuitive trading platform with an easy-to-understand
              user interface.
            </p>
          </div>

          {/* Item 3 */}
          <div>
            <h4 className="text-xl font-medium">No spam or gimmicks</h4>
            <p className="text-gray-400 mt-2">
              Committed to transparency — no gimmicks, spam, gamification,
              or intrusive notifications.
            </p>
          </div>

          {/* Item 4 */}
          <div>
            <h4 className="text-xl font-medium">The Zerodha universe</h4>
            <p className="text-gray-400 mt-2">
              More than just an app — gain free access to the entire ecosystem
              of our partner products.
            </p>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
