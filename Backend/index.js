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
  cors: { origin: "http://localhost:5173" },
  credentials: true,
});

const PORT = process.env.PORT || 3002;

// ================= MIDDLEWARE =================
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/funds", require("./Routes/Funds"));

// ================= TEST =================
app.get("/", (req, res) => res.send("API working"));

// ================= STOCK LIST =================
app.get("/allStocks", (req, res) => {
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
    console.log("PROFILE ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
});


// ================= HOLDINGS =================
app.get("/holdings", Auth, async (req, res) => {
  const data = await HoldingsModel.find({ userId: req.user.userId });
  res.json(data);
});

// ================= ORDERS =================
app.get("/orders", Auth, async (req, res) => {
  const data = await OrdersModel.find({ userId: req.user.userId }).sort({
    createdAt: -1,
  });
  res.json(data);
});

// ================= POSITIONS =================
app.get("/allPositions", Auth, async (req, res) => {
  console.log("USER ID:", req.user.userId);

  const data = await PositionsModel.find({
    userId: req.user.userId,
  });

  console.log("POSITIONS:", data);

  res.json(data);
});

// ================= PLACE ORDER =================
app.post("/newOrder", Auth, async (req, res) => {
  try {
    let { instrument, side, qty, price, exchange, product } = req.body;

    // =========================
    // VALIDATION
    // =========================
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

    // =========================
    // FETCH FUNDS
    // =========================
    const funds = await FundsModel.findOne({ userId: req.user.userId });

    if (!funds) {
      return res.status(400).json({ message: "FUNDS_NOT_FOUND" });
    }

    // =========================
    // BUY VALIDATION
    // =========================
    if (side === "BUY" && funds.equity.availableCash < qty * price) {
      return res.status(400).json({ message: "NO_FUNDS" });
    }

    // =========================
    // CREATE ORDER 
    // =========================
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

    // =========================
    // HOLDINGS UPDATE
    // =========================
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

    // ================= POSITION UPDATE =================
let position = await PositionsModel.findOne({
  userId: req.user.userId,
  instrument,
});

if (side === "BUY") {
  if (!position) {
    position = new PositionsModel({
      userId: req.user.userId,
      instrument,
      qty,
      avg: price,
      ltp: price,
    });
  } else {
    const totalCost =
      position.avg * position.qty + price * qty;

    const totalQty = position.qty + qty;

    position.avg = totalCost / totalQty;
    position.qty = totalQty;
    position.ltp = price;
  }

  await position.save();
}

if (side === "SELL") {
  if (!position || position.qty < qty) {
    return res.status(400).json({ message: "NO_POSITION_QTY" });
  }

  position.qty -= qty;

  if (position.qty === 0) {
    await PositionsModel.deleteOne({ _id: position._id });
  } else {
    position.ltp = price;
    await position.save();
  }
}

    // =========================
    // SAVE FUNDS
    // =========================
    await funds.save();

    // =========================
    // SOCKET EVENTS
    // =========================
    io.emit("fundsUpdate");

    io.emit("orderUpdate", {
      ...order._doc,
      time: Math.floor(Date.now() / 1000),
    });

    res.json({ success: true });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});



// ================= LIVE CANDLE GENERATOR =================
setInterval(() => {
  const candle = {
    time: Math.floor(Date.now() / 1000),
    open: 100 + Math.random() * 10,
    high: 110 + Math.random() * 10,
    low: 90 + Math.random() * 10,
    close: 100 + Math.random() * 10,
  };

  io.emit("candleUpdate", candle);
}, 2000);

// ================= SOCKET =================
io.on("connection", () => {
});

// ================= DB =================
const PORT = process.env.PORT || 10000;

// START SERVER FIRST
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});

// THEN CONNECT DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));