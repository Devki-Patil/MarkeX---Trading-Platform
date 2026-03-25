export default function AboutHero() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12 lg:px-24">

      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-100">
          We pioneered a new way of building.
          <br />
          Now we are breaking ground with our technology.
        </h2>

        <div className="w-full h-px bg-gray-800 mt-8"></div>
      </div>

      {/* Two Column Content */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

        <p className="leading-relaxed text-gray-400 text-[15px]">
          We kick-started operations with the goal of breaking all barriers that
          modern builders face in terms of cost, support, and technology. Over time,
          our in-house innovation and disruptive pricing models helped us grow
          rapidly and build a strong community.
          <br /> <br />
          Today, our platforms serve thousands of users every day, enabling them
          through a powerful ecosystem of digital experiences.
        </p>

        <p className="leading-relaxed text-gray-400 text-[15px]">
          In addition, we run a number of open community initiatives to support
          upcoming creators and innovators. Our investment arm continues to work
          closely with early-stage startups to help them scale.
          <br /> <br />
          We keep learning every day. Check out our updates on the blog, media
          section, or explore our principles to understand how we operate.
        </p>

      </div>

    </section>
  );
}
