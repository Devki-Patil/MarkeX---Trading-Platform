export default function Hero() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-semibold">
          Zerodha Products
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-400">
          Sleek, modern, and intuitive trading platforms
        </p>

        {/* LINK */}
        <p className="text-gray-300">
          Check out our{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 transition underline underline-offset-4"
          >
            investment offerings →
          </a>
        </p>

        {/* SEPARATOR LINE */}
        <div className="w-full h-px bg-gray-800 mt-10"></div>

      </div>
    </section>
  );
}
