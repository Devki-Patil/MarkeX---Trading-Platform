import { useState, useEffect, useCallback } from "react";
import { LineChart, Trash2 } from "lucide-react";
import BuyPopUp from "../Pages/Features/Trading/BuyPopUp";
import SellPopUp from "../Pages/Features/Trading/SellPopUp";
import api from "../../Services/AxiosInstance";
import refresh from "../Refresh";

export default function LeftPanel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [search, setSearch] = useState("");

  /* =======================
     FETCH MARKET STOCKS
     ======================= */
  const fetchStocks = useCallback(async () => {
    try {
      const res = await api.get("/stocks");
      console.log(" RESPONSE:", res);
      console.log(" DATA:", res.data);

      // ✅ FIX HERE
      setAllStocks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(
        "STOCK FETCH ERROR:",
        err?.response?.data || err.message
      );
    }
  }, []);

  /* =======================
     FETCH HOLDINGS
     ======================= */
  const fetchHoldings = useCallback(async () => {
    try {
      const res = await api.get("/holdings");
      console.log("HOLDINGS RESPONSE:", res.data);

      // ✅ FIX HERE
      setHoldings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(
        "HOLDINGS FETCH ERROR:",
        err?.response?.data || err.message
      );
    }
  }, []);

  /* =======================
     EFFECTS
     ======================= */
  useEffect(() => {
    fetchStocks();
    fetchHoldings();

    const unsub = refresh.subscribe(() => {
      fetchStocks();
      fetchHoldings();
    });

    return () => unsub();
  }, [fetchStocks, fetchHoldings]);

  /* =======================
     HELPERS
     ======================= */
  const normalize = (str = "") =>
    str.toLowerCase().replace(/\s+/g, "");

  const getHoldingQty = (instrument) => {
    const h = holdings.find(
      (h) => normalize(h.instrument) === normalize(instrument)
    );
    return h ? Number(h.qty) : 0;
  };

  const visibleStocks = allStocks.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* =======================
     HANDLERS
     ======================= */
  const handleBuy = (stock, e) => {
    e.stopPropagation();
    setSelectedStock(stock);
    setActionType("BUY");
  };

  const handleSell = (stock, e) => {
    e.stopPropagation();
    setSelectedStock(stock);
    setActionType("SELL");
  };

  /* =======================
     UI
     ======================= */
  return (
    <div className="relative flex flex-col h-full text-gray-200 text-sm">

      {/* SEARCH */}
      <div className="p-4 border-b border-zinc-800">
        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] text-gray-300 px-3 py-2 rounded-md outline-none"
        />
      </div>

      {/* STOCK LIST */}
      <div className="flex-1 overflow-y-auto">
        {visibleStocks.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            No stocks found
          </div>
        ) : (
          visibleStocks.map((item, index) => {
            const holdingQty = getHoldingQty(item.name);
            const canSell = holdingQty > 0;
            const isNegative = Number(item.change) < 0;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between hover:bg-[#1a1a1a]"
              >
                {/* LEFT */}
                <div className="flex flex-col">
                  <span
                    className={`font-medium ${
                      isNegative ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {item.name}
                  </span>

                  {holdingQty > 0 && (
                    <span className="text-xs text-gray-400">
                      Holding: {holdingQty}
                    </span>
                  )}
                </div>

                {/* RIGHT */}
                {hoveredIndex === index ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleBuy(item, e)}
                      className="px-3 py-1 rounded bg-blue-500 text-white"
                    >
                      B
                    </button>

                    <button
                      disabled={!canSell}
                      onClick={(e) => handleSell(item, e)}
                      className={`px-3 py-1 rounded ${
                        canSell
                          ? "bg-red-500 text-white"
                          : "bg-red-900/40 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      S
                    </button>

                    <LineChart size={18} />
                    <Trash2 size={18} className="cursor-pointer" />
                  </div>
                ) : (
                  <div className="flex flex-col text-right">
                    <span className="font-medium">
                      ₹ {item.price}
                    </span>
                    <span
                      className={`text-xs ${
                        isNegative ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.change} ({item.percent}%)
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* BUY POPUP */}
      {actionType === "BUY" && selectedStock && (
        <BuyPopUp
          stock={selectedStock}
          onClose={() => {
            setSelectedStock(null);
            setActionType(null);
          }}
        />
      )}

      {/* SELL POPUP */}
      {actionType === "SELL" && selectedStock && (
        <SellPopUp
          stock={selectedStock}
          holdingQty={getHoldingQty(selectedStock.name)}
          onClose={() => {
            setSelectedStock(null);
            setActionType(null);
          }}
        />
      )}
    </div>
  );
}