import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";
import toast from "react-hot-toast";

export default function Funds() {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("input");

  const fetchFunds = async () => {
    try {
      const res = await api.get("/api/funds");
      setFunds(res.data);
    } catch {
      toast.error("Failed to load funds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const handleTransaction = async () => {
    setStep("loading");

    try {
      if (modalType === "add") {
        await api.post("/api/funds/add", { amount });
      } else {
        await api.post("/api/funds/withdraw", { amount });
      }

      setStep("success");

      setTimeout(() => {
        setModalType(null);
        setAmount("");
        setStep("input");
        fetchFunds();
      }, 2000);
    } catch {
      toast.error("Transaction failed");
      setStep("input");
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading Funds...</div>;
  }

  const equity = funds?.equity || {};

  return (
    <div className="p-6 text-gray-200">

      {/* BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setModalType("add");
            setStep("input");
          }}
          className="bg-green-600 px-5 py-2 rounded-lg"
        >
          Add Cash
        </button>

        <button
          onClick={() => {
            setModalType("withdraw");
            setStep("input");
          }}
          className="bg-red-600 px-5 py-2 rounded-lg"
        >
          Withdraw
        </button>
      </div>

      {/* CARD */}
      <div className="bg-[#111] p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl mb-4">Equity</h2>
        <Row label="Available Cash" value={equity.availableCash} />
        <Row label="Used Margin" value={equity.usedMargin} />
        <Row label="Opening Balance" value={equity.openingBalance} />
      </div>

      {/* MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setModalType(null);
              setAmount("");
              setStep("input");
            }}
          />

          <div className="relative bg-[#111] w-[360px] p-6 rounded-2xl border border-zinc-700 shadow-2xl text-center">

            {/* INPUT */}
            {step === "input" && (
              <>
                <h2 className="text-xl mb-4">
                  {modalType === "add" ? "Add Funds" : "Withdraw Funds"}
                </h2>

                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 mb-4 bg-black border border-zinc-700 rounded text-center"
                />

                <button
                  onClick={() => {
                    if (!amount || amount <= 0) {
                      toast.error("Enter valid amount");
                      return;
                    }

                    if (modalType === "add") {
                      setStep("qr"); // only add
                    } else {
                      handleTransaction(); // withdraw direct
                    }
                  }}
                  className="w-full py-2 bg-blue-600 rounded"
                >
                  Continue
                </button>
              </>
            )}

            {/* QR ONLY FOR ADD */}
            {step === "qr" && modalType === "add" && (
              <>
                <h2 className="mb-3">Scan QR to Pay</h2>

                <div className="bg-white p-4 rounded mb-3">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?am=${amount}`}
                    alt="QR"
                    className="mx-auto"
                  />
                </div>

                <p className="text-sm text-gray-400 mb-3">
                  ₹ {amount}
                </p>

                <button
                  onClick={handleTransaction}
                  className="w-full py-2 bg-green-600 rounded"
                >
                  I have paid
                </button>
              </>
            )}

            {/* LOADING */}
            {step === "loading" && (
              <div className="py-10">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Processing...</p>
              </div>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <div className="py-10">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce text-2xl">
                  ✓
                </div>
                <p className="text-green-400 text-lg">
                  {modalType === "add"
                    ? "Payment Successful"
                    : "Withdrawal Successful"}
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between mb-3 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-blue-400 font-semibold">
        ₹ {Number(value || 0).toFixed(2)}
      </span>
    </div>
  );
}