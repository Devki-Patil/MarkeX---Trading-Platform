import React from "react";

const SupportTicket = () => {
  const sections = [
    {
      title: "Account Opening",
      color: "text-[#585858]",   // Sky Blue
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company / Partnership / HUF Account Opening",
        "NRI Account Opening",
        "Charges at MarkeX",
        "MarkeX Bank 3-in-1 Account",
        "Getting Started",
      ],
    },
    {
      title: "Your MarkeX Account",
      color: "text-[#585858]", // Neon Green
      links: [
        "Login Credentials",
        "Account Modification & Segment Addition",
        "DP ID & Bank Details",
        "Your Profile",
        "Transfer & Conversion of Shares",
      ],
    },
    {
      title: "Trading & Orders",
      color: "text-[#585858]", // Soft Yellow
      links: [
        "Margins & Leverage",
        "Product Types (CNC / MIS)",
        "Corporate Actions",
        "Trading FAQs",
        "MarkeX API",
        "Reports+",
        "GTT Orders",
      ],
    },
    {
      title: "Funds",
      color: "text-[#585858]", // Soft Red
      links: [
        "Adding Funds",
        "Fund Withdrawal",
        "eMandates",
        "Adding Bank Accounts",
      ],
    },
    {
      title: "Console",
      color: "text-[#585858]", // Teal / Cyan
      links: [
        "Reports",
        "Ledger",
        "Portfolio",
        "60 Day Challenge",
        "IPO",
      ],
    },
    {
      title: "Coin",
      color: "text-[#585858]", // Soft Purple
      links: [
        "Understanding Mutual Funds",
        "About Coin",
        "Buying & Selling",
        "Starting an SIP",
        "Manage Portfolio",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#0f0f0f] text-gray-300 py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-[#f6f4f7] mb-10">
          To create a ticket, select a relevant topic
        </h2>

        {/* Multi-Color Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10">

          {sections.map((section, index) => (
            <div key={index}>
              <h3 className={`${section.color} font-semibold text-lg mb-3`}>
                {section.title}
              </h3>

              <ul className="space-y-1 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a className="text-gray-400 hover:text-white hover:underline cursor-pointer transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
