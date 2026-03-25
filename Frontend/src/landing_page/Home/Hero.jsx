import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#0a0a0a] text-gray-200 px-4">

      {/* HERO IMAGE */}
      <img
        src="/HomeHero.jpg" // ✅ correct path (public folder)
        alt="Hero Section"
        className="w-full max-w-2xl object-contain mt-16 mb-6 opacity-95 max-h-[230px]"
      />

      {/* HERO HEADING */}
      <h1 className="text-3xl font-semibold text-center mt-2">
        Invest in everything
      </h1>

      {/* SUB TEXT */}
      <p className="text-center text-base text-gray-400 mt-3 max-w-xl leading-relaxed">
        Online platform to invest in stocks, derivatives, mutual funds, ETFs,
        bonds, and more.
      </p>

      {/* CTA BUTTON */}
      <button
        onClick={() => navigate("/signup")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-md font-medium transition"
      >
        Sign up for free
      </button>
    </div>
  );
};

export default Hero;