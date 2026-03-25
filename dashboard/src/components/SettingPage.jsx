import { useState } from "react";

export default function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 text-white">

      <div className="bg-[#111] p-6 rounded-2xl border border-zinc-800 w-[400px]">

        <h2 className="text-xl mb-4">⚙️ Settings</h2>

        <SettingToggle
          label="Dark Mode"
          value={dark}
          onChange={setDark}
        />

        <SettingToggle
          label="Notifications"
          value={notifications}
          onChange={setNotifications}
        />

      </div>

    </div>
  );
}

function SettingToggle({ label, value, onChange }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span>{label}</span>

      <button
        onClick={() => onChange(!value)}
        className={`px-4 py-1 rounded ${
          value ? "bg-green-600" : "bg-zinc-700"
        }`}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}