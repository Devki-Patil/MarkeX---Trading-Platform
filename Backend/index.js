require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

// MODELS
const HoldingsModel = require("./model/HoldingsModel");
const OrdersModel = require("./model/OrdersModel");
const PositionsModel = require("./model/PositionsModel");
const FundsModel = require("./model/FundsModel");
const UserModel = require("./model/UserModel");

// AUTH
const { Auth } = require("./Middleware/Auth");
const authRoutes = require("./Routes/Auth");

// STATIC DATA
const stockData = require("../dashboard/src/data/Data");

const app = express();
const server = http.createServer(app);

// SOCKET
const io = new Server(server, {
  cors: { origin: "*" },
});

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/funds", require("./Routes/Funds"));

// ================= TEST =================
app.get("/", (req, res) => res.send("API working 🚀"));

// ================= STOCKS =================
app.get("/api/stocks", (req, res) => {
  res.json(stockData.stocks);
});

// ================= PROFILE =================
app.get("/api/user/profile", Auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId);
    const funds = await FundsModel.findOne({ userId });
    const holdings = await HoldingsModel.find({ userId });

    let invest = 0;
    let current = 0;

    holdings.forEach((h) => {
      invest += h.qty * h.avg;
      current += h.qty * h.ltp;
    });

    const pnl = invest > 0 ? ((current - invest) / invest) * 100 : 0;

    res.json({
      name: user?.name || "User",
      email: user?.email || "no-email",
      balance: funds?.equity?.availableCash || 0,
      pnl: Number(pnl.toFixed(2)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= HOLDINGS =================
app.get("/api/holdings", Auth, async (req, res) => {
  const data = await HoldingsModel.find({ userId: req.user.userId });
  res.json(data);
});

// ================= ORDERS =================
app.get("/api/orders", Auth, async (req, res) => {
  const data = await OrdersModel.find({ userId: req.user.userId }).sort({
    createdAt: -1,
  });
  res.json(data);
});

// ================= POSITIONS =================
app.get("/api/positions", Auth, async (req, res) => {
  const data = await PositionsModel.find({
    userId: req.user.userId,
  });
  res.json(data);
});

// ================= PLACE ORDER =================
app.post("/api/order", Auth, async (req, res) => {
  try {
    let { instrument, side, qty, price, exchange, product } = req.body;

    if (!instrument || !side || !qty || !price) {
      return res.status(400).json({ message: "INVALID_DATA" });
    }

    if (!exchange) exchange = "NSE";
    if (!product) product = "CNC";

    instrument = instrument.toUpperCase();
    qty = Number(qty);
    price = Number(price);

    if (qty <= 0 || price <= 0) {
      return res.status(400).json({ message: "INVALID_QTY_PRICE" });
    }

    const funds = await FundsModel.findOne({ userId: req.user.userId });

    if (!funds) {
      return res.status(400).json({ message: "FUNDS_NOT_FOUND" });
    }

    if (side === "BUY" && funds.equity.availableCash < qty * price) {
      return res.status(400).json({ message: "NO_FUNDS" });
    }

    const order = await OrdersModel.create({
      userId: req.user.userId,
      instrument,
      exchange,
      product,
      side,
      qty,
      price,
      status: "EXECUTED",
    });

    let holding = await HoldingsModel.findOne({
      userId: req.user.userId,
      instrument,
    });

    if (side === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;

        holding.avg =
          (holding.avg * holding.qty + price * qty) / totalQty;

        holding.qty = totalQty;
        holding.ltp = price;

        await holding.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.userId,
          instrument,
          qty,
          avg: price,
          ltp: price,
        });
      }

      funds.equity.availableCash -= qty * price;
    }

    if (side === "SELL") {
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ message: "NO_QTY" });
      }

      holding.qty -= qty;

      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        holding.ltp = price;
        await holding.save();
      }

      funds.equity.availableCash += qty * price;
    }

    await funds.save();

    io.emit("fundsUpdate");
    io.emit("orderUpdate", {
      ...order._doc,
      time: Math.floor(Date.now() / 1000),
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SOCKET =================
io.on("connection", () => {});

// ================= DB =================
const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log("Server running on", PORT);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));