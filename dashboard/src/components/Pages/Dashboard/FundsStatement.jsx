import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";
import refresh from "../../Refresh";
import toast from "react-hot-toast";
import FundsStatement from "./FundsStatement";

export default function Funds() {
  const rows = ["Paying", "Payout", "SPAN", "Delivery margin", "Exposure"];

  const [funds, setFunds] = useState(null);

  // popup states
  const [showAdd, setShowAdd] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // form states
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // loading state (IMPORTANT)
  const [loading, setLoading] = useState(false);

  /* ================= FETCH FUNDS ================= */
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await api.get("/funds");
        setFunds(res.data);
      } catch (err) {
        console.error("FUNDS FETCH ERROR:", err);
      }
    };

    fetchFunds();
    const unsub = refresh.subscribe(fetchFunds);
    return () => unsub();
  }, []);

  /* ================= ADD FUNDS ================= */
  const handleAddFunds = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      await api.post("/funds/add", {
        amount: Number(amount),
        method: paymentMethod,
      });

      toast.success("Funds added successfully");
      refresh.trigger();
      closePopup();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add funds");
    } finally {
      setLoading(false);
    }
  };

  /* ================= WITHDRAW ================= */
  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      await api.post("/funds/withdraw", {
        amount: Number(amount),
      });

      toast.success("Withdrawal successful");
      refresh.trigger();
      closePopup();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setAmount("");
    setShowAdd(false);
    setShowWithdraw(false);
  };

  const equityCash = funds?.equity?.availableCash || 0;

  return (
    <div className="p-6 text-gray-200">

      {/* HEADER */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2 bg-green-600 rounded"
        >
          Add funds
        </button>

        <button
          disabled={equityCash <= 0}
          onClick={() => setShowWithdraw(true)}
          className={`px-5 py-2 rounded ${
            equityCash <= 0
              ? "bg-blue-600/40 cursor-not-allowed"
              : "bg-blue-600"
          }`}
        >
          Withdraw
        </button>
      </div>

      {/* EQUITY CARD */}
      <div className="bg-[#111] p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl mb-4">Equity</h2>

        <Row label="Available margin" value={equityCash.toFixed(2)} highlight />
        <Row label="Used margin" value={funds?.equity?.usedMargin?.toFixed(2)} />
        <Row label="Available cash" value={equityCash.toFixed(2)} highlight />

        <div className="border-b border-zinc-800 my-4" />

        <Row
          label="Opening balance"
          value={funds?.equity?.openingBalance?.toFixed(2)}
        />

        {rows.map((r) => (
          <Row key={r} label={r} value="0.00" />
        ))}
      </div>

      {/* ADD FUNDS POPUP */}
      {showAdd && (
        <Popup title="Add funds">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mb-3 p-2 bg-[#0a0a0a] border border-zinc-700 rounded"
          >
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
          </select>

          <Input amount={amount} setAmount={setAmount} />

          <PopupButtons
            loading={loading}
            onConfirm={handleAddFunds}
            onCancel={closePopup}
          />
        </Popup>
      )}

      {/* WITHDRAW POPUP */}
      {showWithdraw && (
        <Popup title="Withdraw funds">
          <Input amount={amount} setAmount={setAmount} />

          <PopupButtons
            loading={loading}
            onConfirm={handleWithdraw}
            onCancel={closePopup}
          />
        </Popup>
      )}

      {/* FUNDS STATEMENT */}
      <FundsStatement />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Popup({ title, children }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#111] p-6 w-[360px] rounded-xl">
        <h3 className="mb-4 text-lg">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Input({ amount, setAmount }) {
  return (
    <input
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full p-2 mb-4 bg-[#0a0a0a] border border-zinc-700 rounded"
    />
  );
}

function PopupButtons({ onConfirm, onCancel, loading }) {
  return (
    <div className="flex gap-3">
      <button
        disabled={loading}
        onClick={onConfirm}
        className={`flex-1 py-2 rounded ${
          loading ? "bg-green-600/50" : "bg-green-600"
        }`}
      >
        {loading ? "Processing..." : "Confirm"}
      </button>

      <button
        disabled={loading}
        onClick={onCancel}
        className="flex-1 bg-zinc-700 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between mb-2">
      <span className="text-gray-400">{label}</span>
      <span className={highlight ? "text-blue-400" : ""}>{value}</span>
    </div>
  );
}
