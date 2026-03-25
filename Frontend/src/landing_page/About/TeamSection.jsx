import React, { useState } from "react";

export default function TeamSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const team = [
    {
      name: "Nithin Kamath",
      role: "Co-founder & CFO",
      image: "../../../public/Nikhil.jpg",
      bio: "Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess."
    },
    {
      name: "Dr. Kailash Nadh",
      role: "CTO",
      image: "../../../public/Kailash.jpg",
      bio: "Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day."
    },
    {
      name: "Venu Madhav",
      role: "CCO",
      image: "../../../public/Venu.jpg",
      bio: "Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha."
    },
    {
      name: "Hanan Delvi",
      role: "CCO",
      image: "../../../public/Hanan.jpg",
      bio: "We take pride in the way we support our clients, and Hanan is responsible for this with his never ending flow of energy. He is the man behind many of our support initiatives that have helped us stay ahead of the game. A free thinker, Hanan can be seen posing as one in his free time."
    },
    {
      name: "Seema Patil",
      role: "Director",
      image: "../../../public/Seema.jpg",
      bio: "Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast."
    },
    {
      name: "Austin Prakesh",
      role: "Director Strategy",
      image: "../../../public/Austin.jpg",
      bio: "Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches."
    },
    {
      name: "Karthik Rangappa",
      role: "Chief of Education",
      image: "../../../public/karthik.jpg",
      bio: "Karthik 'Guru' Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography."
    },
  ];

  const toggleBio = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold">Our Team</h2>
        <div className="w-full h-px bg-gray-800 mt-8 mb-16"></div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">

          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">

              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 rounded-full object-cover border border-gray-700 shadow-lg"
              />

              {/* Name & Role */}
              <h3 className="mt-4 text-lg font-semibold text-gray-100">
                {member.name}
              </h3>

              <p className="text-gray-500 text-sm">{member.role}</p>

              {/* Bio Button */}
              <button
                onClick={() => toggleBio(index)}
                className="mt-2 text-gray-100 hover:text-gray-300 text-sm"
              >
                Bio {openIndex === index ? "▲" : "▼"}
              </button>

              {/* Bio Content */}
              {openIndex === index && (
                <p className="mt-4 text-gray-400 text-sm leading-relaxed px-2">
                  {member.bio}
                </p>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
