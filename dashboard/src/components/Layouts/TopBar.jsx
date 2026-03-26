import { useState, useRef, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import api from "../../Services/AxiosInstance";
import ProfileMenu from "../Pages/Profile/ProfileMenu";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef();

  /* CLOSE PROFILE DROPDOWN */
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* FETCH USER */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user/profile");
        setUserData(res.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* LOGOUT */
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    } finally {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  /* NAV LINKS */
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/orders", label: "Orders" },
    { to: "/dashboard/holdings", label: "Holdings" },
    { to: "/dashboard/positions", label: "Positions" },
    { to: "/dashboard/funds", label: "Funds" },
  ];

  const linkClass = "text-sm font-medium transition";
  const inactive = "text-gray-400 hover:text-white";
  const active = "text-white border-b-2 border-blue-500 pb-[2px]";

  return (
    <>
      <nav className="w-full bg-[#0a0a0a] border-b border-zinc-800 px-4 md:px-6 h-14 flex items-center justify-between">

        {/* LEFT - BRAND */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="text-white font-semibold text-lg tracking-wide">
            MarkeX
          </div>
        </div>

        {/* CENTER - NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? active : inactive}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-4 md:gap-6">

          <Bell
            className="text-gray-300 hover:text-white cursor-pointer"
            size={20}
          />

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <div
              className="cursor-pointer text-sm text-gray-200 hover:text-white"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              {loading ? "..." : userData?.name || "User"}
            </div>

            {profileOpen && (
              <ProfileMenu
                user={userData}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-b border-zinc-800 px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}