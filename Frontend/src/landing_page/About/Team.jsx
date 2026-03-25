export default function Team() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-100">
          People
        </h2>

        <div className="w-full h-px bg-gray-800 mt-8 mb-16"></div>

        {/* Main Layout: Image + Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src="../../../public/nithin-kamath.jpg"
              alt="Founder"
              className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-xl border border-gray-800"
            />
          </div>

          {/* Right Content */}
          <div>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              Nithin bootstrapped and founded Zerodha in 2010 to overcome the
              hurdles he faced during his decade-long stint as a trader. Today,
              Zerodha has changed the landscape of the Indian broking industry.
            </p>

            <p className="text-gray-400 leading-relaxed text-[15px] mt-6">
              He is a member of the SEBI Secondary Market Advisory Committee
              (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>

            <p className="text-gray-400 leading-relaxed text-[15px] mt-6">
              Playing basketball is his zen.
            </p>

            {/* Social Links */}
            <div className="mt-6 space-x-4 text-sm">
              <span className="text-gray-500">Connect on</span>

              <a
                href="#"
                className="text-blue-400 hover:text-blue-500 hover:underline"
              >
                Homepage
              </a>

              <a
                href="#"
                className="text-blue-400 hover:text-blue-500 hover:underline"
              >
                TradingQnA
              </a>

              <a
                href="#"
                className="text-blue-400 hover:text-blue-500 hover:underline"
              >
                Twitter
              </a>
            </div>

            {/* Name & Role */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-100">
                Nithin Kamath
              </h3>
              <p className="text-gray-500 text-sm">Founder, CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
