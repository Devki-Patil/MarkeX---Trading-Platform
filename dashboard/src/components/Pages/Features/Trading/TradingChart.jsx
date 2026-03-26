import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function TradingChart() {
  const chartContainerRef = useRef();
  const candleSeriesRef = useRef();
  const currentCandleRef = useRef(null);

  useEffect(() => {
    // =========================
    // CREATE CHART
    // =========================
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,

      layout: {
        background: { color: "#0a0a0a" },
        textColor: "#DDD",
      },

      grid: {
        vertLines: { color: "#1f1f1f" },
        horzLines: { color: "#1f1f1f" },
      },

      crosshair: {
        mode: 1,
      },

      rightPriceScale: {
        borderColor: "#333",
      },

      timeScale: {
        borderColor: "#333",
        timeVisible: true,
        secondsVisible: true,

        rightBarStaysOnScroll: true,
        barSpacing: 4,      
        minBarSpacing: 2,
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    // =========================
    // CANDLE SERIES
    // =========================
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    candleSeriesRef.current = candleSeries;

    chart.timeScale().applyOptions({ barSpacing: 4 });
    chart.timeScale().fitContent();

    // =========================
    // REAL-TIME SOCKET
    // =========================
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      const price = parseFloat(msg.p);
      const timestamp = Math.floor(msg.T / 1000);

      const current = currentCandleRef.current;

      // First candle
      if (!current) {
        const firstCandle = {
          time: timestamp,
          open: price,
          high: price,
          low: price,
          close: price,
        };

        currentCandleRef.current = firstCandle;
        candleSeries.update(firstCandle);
        return;
      }

      // Same second → update
      if (current.time === timestamp) {
        current.high = Math.max(current.high, price);
        current.low = Math.min(current.low, price);
        current.close = price;

        candleSeries.update(current);
      }

      else {
        const newCandle = {
          time: timestamp,
          open: current.close,
          high: price,
          low: price,
          close: price,
        };

        currentCandleRef.current = newCandle;
        candleSeries.update(newCandle);
      }
    };

    // =========================
    // RESPONSIVE
    // =========================
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      socket.close();
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full rounded-xl overflow-hidden"
    />
  );
}