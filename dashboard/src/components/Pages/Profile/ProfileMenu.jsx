import { useEffect, useState } from "react";
import { User, Settings, Wallet } from "lucide-react";
import ProfileModal from "./ProfileModal"; 
import { logoutUser } from "../../Logout";

export default function ProfileMenu({ user, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [modal, setModal] = useState(null); 

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (user) {
      setUserData(user);
    } else if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, [user]);

  return (
    <>
      <div className="absolute right-0 mt-2 w-72 bg-[#111] border border-zinc-800 rounded-xl shadow-xl z-50">

        {/* USER INFO */}
        <div className="p-4 border-b border-zinc-800">
          <div className="text-white font-medium">
            {userData?.name || "User"}
          </div>

          <div className="text-xs text-gray-400">
            {userData?.email || "no-email@demo.com"}
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="p-4 border-b border-zinc-800">
          <div className="text-xs text-gray-400">Balance</div>

          <div className="text-lg text-white font-semibold">
            ₹ {Number(userData?.balance || 0).toLocaleString()}
          </div>

          <div
            className={`text-xs mt-1 ${
              userData?.pnl >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {userData?.pnl ? `${userData.pnl}% Today` : "0% Today"}
          </div>
        </div>

        {/* MENU */}
        <div className="py-2">
          <MenuItem
            icon={<User size={16} />}
            label="My Profile"
            onClick={() => setModal("profile")} // 🔥 modal open
          />

          <MenuItem
            icon={<Wallet size={16} />}
            label="Funds"
            onClick={() => setModal("profile")} // optional: funds inside modal
          />

          <MenuItem
            icon={<Settings size={16} />}
            label="Settings"
            onClick={() => setModal("settings")} // 🔥 modal open
          />
        </div>

        {/* LOGOUT */}
        <button
  onClick={() => {
    setModal(null); // modal close
    logoutUser();   // logout
  }}
  className="w-full px-4 py-3 text-red-400 hover:bg-[#1a1a1a] text-left"
>
  Logout
</button>
      </div>

      {/* 🔥 MODAL RENDER */}
      {modal && (
        <ProfileModal
          type={modal}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

// ✅ MENU ITEM
function MenuItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#1a1a1a] cursor-pointer"
    >
      {icon}
      {label}
    </div>
  );
}