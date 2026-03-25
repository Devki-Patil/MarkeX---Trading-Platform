import React from "react";
import { useNavigate } from "react-router-dom";

export default function OpenAcc() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0a0a0a] text-white">
      {/* CTA Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Open a Zerodha account
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>

          <div>
            <button
              onClick={() => navigate("/signup")}
              className="inline-block bg-[#2f7bdc] hover:bg-[#2b6fc7] text-white font-medium px-6 py-3 rounded-md shadow-md transition"
            >
              Sign up for free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}