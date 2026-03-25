import React from "react";

export default function LeftImage({
  image,
  title,
  description,
  playstore,
  appstore,
  demoLink = "#",
  learnMoreLink = "#",
}) {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <img
            src={image}
            className="w-[90%] md:w-[80%] object-contain drop-shadow-xl"
            alt={title}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">

          <h2 className="text-3xl md:text-4xl font-semibold">
            {title}
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            {description}
          </p>

          {/* LINKS */}
          <div className="flex items-center gap-6">
            <a
              href={demoLink}
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              Try demo →
            </a>

            <a
              href={learnMoreLink}
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              Learn more →
            </a>
          </div>

          {/* APP STORE BUTTONS (OPTIONAL) */}
          {(playstore || appstore) && (
            <div className="flex items-center gap-4 pt-4">
              {playstore && (
                <img
                  src={playstore}
                  alt="Google Play"
                  className="w-30 cursor-pointer"
                />
              )}
              {appstore && (
                <img
                  src={appstore}
                  alt="App Store"
                  className="w-30 cursor-pointer"
                />
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
