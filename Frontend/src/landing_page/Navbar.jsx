import { useState } from "react";
import { Menu, X, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Signup", href: "/signup" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/support" },
  ];

  return (
  <header className="w-full fixed top-0 left-0 bg-[#2c2c2c] text-gray-200 shadow-lg border-b border-gray-700 z-100">
  <nav className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between relative">


        {/* LOGO */}
        <div className="flex items-center">
          <Link className="text-xl text-purple-500 font-semibold tracking-wide" to='/'>MarkeX</Link>
        </div>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium text-[15px]">
          {navLinks.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="hover:text-white transition duration-200">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* ICONS: three-dots always visible; hamburger visible only on mobile */}
        <div className="flex items-center gap-2">
          {/* three-dots (visible on all sizes) */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition duration-150 z-50"
            aria-label="Open menu"
            title="Open menu"
          >
            <MoreVertical size={22} />
          </button>

          {/* hamburger for mobile (small screens) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-300 p-2 rounded-md hover:text-white hover:bg-gray-800 transition duration-150 z-50"
            aria-label="Toggle mobile menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* PANEL (used for both desktop and mobile toggle) */}
      <div
        className={`bg-[#121212] border-t border-gray-800 transition-all duration-300 overflow-hidden
          ${open ? "max-h-[680px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 gap-6">

          {/* ===== NAV LINKS (visible in the opened panel) ===== */}
          <div className="flex flex-col md:hidden">
            <ul className="flex flex-col gap-3 text-gray-300 mb-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 px-3 rounded hover:bg-gray-900 hover:text-white transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-b border-gray-800 mb-3" />
          </div>

          {/* ===== MEGA MENU GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Column 1: Products */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3">Products</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="block hover:text-white">Kite — Trading platform</a></li>
                <li><a href="#" className="block hover:text-white">Console — Backoffice</a></li>
                <li><a href="#" className="block hover:text-white">Kite Connect — APIs</a></li>
                <li><a href="#" className="block hover:text-white">Coin — Mutual funds</a></li>
              </ul>
            </div>

            {/* Column 2: Utilities */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3">Utilities</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="block hover:text-white">Margin calculator</a></li>
                <li><a href="#" className="block hover:text-white">Brokerage calculator</a></li>
                <li><a href="#" className="block hover:text-white">SIP calculator</a></li>
              </ul>
            </div>

            {/* Column 3: Education */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3">Education</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="block hover:text-white">Varsity</a></li>
                <li><a href="#" className="block hover:text-white">Trading Q&A</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
