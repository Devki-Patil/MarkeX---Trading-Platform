const express = require("express");
const router = express.Router();

const { Auth } = require("../Middleware/Auth");
const FundsModel = require("../model/FundsModel");

router.get("/dashboard", Auth, async (req, res) => {
  try {
    const funds = await FundsModel.findOne({
      userId: req.user.userId,
    });

    res.json({
      equity: Number(funds.equity.availableCash.toFixed(2)),
      commodity: Number(
        (funds.commodity?.availableCash || 0).toFixed(2)
      ),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;