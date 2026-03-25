import React from "react";
import SupportTicket from "./SupportTicket";   // this is your ticket grid

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-gray-200">

      {/* DARK HEADER */}
      <div className="w-full bg-[#0f0f0f] py-14 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4">

          {/* Title */}
          <h1 className="text-3xl font-semibold mb-2 text-[#f7f4f8] mt-10">
            Support Portal
          </h1>

          {/* Subtitle */}
          <p className="text-lg opacity-80 mb-6">
            Search for an answer or browse help topics to create a ticket
          </p>

          {/* Search bar */}
          <div className="w-full md:w-2/3">
            <input
              type="text"
              placeholder="Eg: How do I activate F&O, why is my order getting rejected?"
              className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] text-gray-200 
                         placeholder-gray-500 border border-[#333]
                         focus:outline-none focus:border-[#cecdd1]"
            />
          </div>

          {/* Featured */}
          <div className="mt-10">

            <h2 className="text-lg font-semibold mb-2 text-[#e5e5ec]">
              Featured
            </h2>

            <ul className="list-disc ml-6 text-sm space-y-2">

              <li>
                <a className="cursor-pointer text-[#e2e2e6] hover:text-purple-300 hover:underline">
                  Current Takeovers & Delisting – January 2024
                </a>
              </li>

              <li>
                <a className="cursor-pointer text-[#d9d9db] hover:text-purple-300 hover:underline">
                  Latest Intraday Leverages – MIS & CNC
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SupportTicket />

    </div>
  );
};

export default Hero;
