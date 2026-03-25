import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12">
        <h1 className="text-xl text-center md:text-3xl font-semibold leading-tight">
            Open a free demat and trading account online
          </h1>

          <p className="text-gray-400 text-center text-lg">
            Start investing brokerage free and join a community of 1.6+ crore
            investors and traders
          </p>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="../../../public/SignupHero.jpg"
            alt="Trading Platform"
            className="w-[90%] md:w-[80%] rounded-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">

          {/* SIGNUP FORM */}
          <div className="space-y-4 pt-4">

            {/* INPUT FIELD */}
            <div className="flex items-center bg-[#131313] border border-gray-700 rounded-lg px-4 py-3 gap-3 w-full max-w-md">
              {/* India Flag */}
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India Flag"
                className="w-6 h-4 object-cover rounded"
              />

              {/* +91 CODE */}
              <span className="text-gray-300 font-medium">+91</span>

              {/* INPUT */}
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* OTP BUTTON */}
            <button className="w-full max-w-md bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-lg">
              Get OTP
            </button>

            {/* TERMS */}
            <p className="text-xs text-gray-500 w-full max-w-md leading-relaxed">
              By proceeding, you agree to the <span className="text-gray-300 underline cursor-pointer">
                terms
              </span> & <span className="text-gray-300 underline cursor-pointer">
                privacy policy
              </span>.
            </p>

            {/* NRI LINK */}
            <p className="text-sm text-blue-400 cursor-pointer hover:underline w-full max-w-md">
              Looking to open NRI account? Click here
            </p>
</div>
</div>

      </div>
    </section>
  );
}
