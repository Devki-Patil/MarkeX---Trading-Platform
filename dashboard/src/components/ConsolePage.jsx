import { useState } from "react";

export default function ConsolePage() {
  const [logs, setLogs] = useState([
    "System initialized...",
    "Connected to market feed",
  ]);

  const addLog = () => {
    setLogs((prev) => [...prev, `Log at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="p-6 text-green-400 font-mono">

      <div className="bg-black p-4 rounded-xl h-[400px] overflow-y-auto border border-zinc-800">
        {logs.map((log, i) => (
          <div key={i}>{">"} {log}</div>
        ))}
      </div>

      <button
        onClick={addLog}
        className="mt-4 px-4 py-2 bg-green-600 text-black rounded"
      >
        Run Command
      </button>

    </div>
  );
}