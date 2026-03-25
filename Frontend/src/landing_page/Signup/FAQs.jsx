import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is a Zerodha account?",
    answer:
      "A Zerodha account is a combined demat and trading account that allows investors to buy, sell, and hold securities digitally.",
  },
  {
    question: "What documents are required to open a demat account?",
    answer:
      "PAN, Aadhaar, bank proof, and signature proof are needed to open a demat account.",
  },
  {
    question: "Is Zerodha account opening free?",
    answer:
      "Yes, It is completely free.",
  },
  {
    question: "Are there any maintenance charges for a demat account?",
    answer:
      "Yes, demat accounts have annual maintenance charges (AMC).",
  },
  {
    question: "Can I open a demat account without a bank account?",
    answer:
      "No, linking a bank account is required to operate a demat account.",
  },
];

export default function FAQDark() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">FAQs</h2>

        {/* FAQ LIST */}
        <div className="space-y-8">

          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="pb-3 border-b border-gray-700">
                
                {/* TOP BLUE BORDER (animated) */}
                <div
                  className={`
                    h-[3px] bg-blue-500 rounded-full transition-all duration-300
                    ${isOpen ? "w-24" : "w-12"}
                  `}
                />

                {/* QUESTION ROW */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="text-lg font-medium text-gray-200 group-hover:text-white transition">
                    {item.question}
                  </span>

                  {isOpen ? (
                    <ChevronUp size={22} className="text-gray-300" />
                  ) : (
                    <ChevronDown size={22} className="text-gray-300" />
                  )}
                </button>

                {/* ANSWER SECTION */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-out 
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-gray-400 text-[15px] leading-relaxed pl-1 pb-3">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
