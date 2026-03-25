const Order = require("../model/OrdersModel");
const Holdings = require("../model/HoldingsModel");

exports.newOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { instrument, side, qty, price, exchange, product } = req.body;

    // 1️⃣ Save Order
    await Order.create({
      userId,
      instrument,
      side,
      qty,
      price,
      exchange,
      product,
      status: "EXECUTED",
    });

    // 2️⃣ Update Holdings
    let holding = await Holdings.findOne({ userId, instrument });

    if (side === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg =
          ((holding.avg * holding.qty) + price * qty) / totalQty;
        holding.qty = totalQty;
        await holding.save();
      } else {
        await Holdings.create({
          userId,
          instrument,
          qty,
          avg: price,
        });
      }
    }

    if (side === "SELL") {
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ message: "INSUFFICIENT_QTY" });
      }

      holding.qty -= qty;
      if (holding.qty === 0) {
        await Holdings.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    res.json({ message: "ORDER_EXECUTED" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ORDER_FAILED" });
  }
};
