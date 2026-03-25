import { useState } from "react";
import api from "../../../../Services/AxiosInstance";
import toast from "react-hot-toast";

export default function BuyPopup({ stock, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock?.price || stock?.ltp || 1);
  const [loading, setLoading] = useState(false);

  const total = (quantity * price).toFixed(2);

  const handleBuy = async () => {
    if (!quantity || quantity <= 0) {
      return toast.error("Enter valid quantity");
    }

    if (!stock || (!stock.symbol && !stock.name && !stock.instrument)) {
      return toast.error("Stock missing");
    }

    if (!price || price <= 0) {
      return toast.error("Invalid price");
    }

    try {
      setLoading(true);

      const payload = {
        instrument: stock.symbol ?? stock.name ?? stock.instrument, 
        side: "BUY", 
        qty: Number(quantity), 
        price: Number(price),
        exchange: "NSE",
        product: "CNC",
      };

      console.log("SENDING:", payload);

      const res = await api.post("/newOrder", payload);

      console.log("BUY SUCCESS:", res.data);

      toast.success("Order placed ");
      onClose();
    } catch (err) {
      console.error("BUY ERROR:", err.response?.data || err.message);

      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message;

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-xl w-[340px] shadow-xl border border-gray-800">

        <h2 className="text-white text-lg mb-4">
          Buy {stock?.symbol ?? stock?.name ?? stock?.instrument}
        </h2>

        <div className="mb-3">
          <label className="text-gray-400 text-sm">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full mt-1 p-2 rounded bg-[#111] text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-400 text-sm">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full mt-1 p-2 rounded bg-[#111] text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-4 flex justify-between text-sm">
          <span className="text-gray-400">Total</span>
          <span className="text-blue-500 font-semibold">₹ {total}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {loading ? "Processing..." : "Buy"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}