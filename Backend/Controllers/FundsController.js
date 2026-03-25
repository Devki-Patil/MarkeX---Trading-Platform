const FundsModel = require("../model/FundsModel");
const FundsTransaction = require("../model/FundsTransactionModel");

/* ===============================
   CREATE DEFAULT FUNDS (ON SIGNUP)
=============================== */
async function createDefaultFunds(userId) {
  const existing = await FundsModel.findOne({
    userId: userId.toString(),
  });

  if (existing) return existing;

  return await FundsModel.create({
    userId: userId.toString(),
    equity: {
      openingBalance: 100000,
      availableCash: 100000,
      usedMargin: 0,
    },
    commodity: {
      openingBalance: 50000,
      availableCash: 50000,
      usedMargin: 0,
    },
  });
}

/* ===============================
   GET FUNDS
=============================== */
async function getFunds(req, res) {
  try {
    let funds = await FundsModel.findOne({
      userId: req.user.userId.toString(),
    });

    if (!funds) {
      funds = await createDefaultFunds(req.user.userId);
    }

    res.json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ===============================
   ADD FUNDS (DUMMY)
=============================== */
async function addFunds(req, res) {
  try {
    const { amount, method } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "INVALID_AMOUNT" });
    }

    let funds = await FundsModel.findOne({
      userId: req.user.userId.toString(),
    });

    if (!funds) {
      funds = await createDefaultFunds(req.user.userId);
    }

    funds.equity.availableCash += Number(amount);
    funds.equity.openingBalance += Number(amount);
    await funds.save();

    await FundsTransaction.create({
      userId: req.user.userId.toString(),
      type: "ADD",
      amount: Number(amount),
      method: method || "UPI",
      balanceAfter: funds.equity.availableCash,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("ADD FUNDS ERROR:", err);
    res.status(500).json({ message: "FAILED_TO_ADD_FUNDS" });
  }
}

/* ===============================
   WITHDRAW FUNDS
=============================== */
async function withdrawFunds(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "INVALID_AMOUNT" });
    }

    const funds = await FundsModel.findOne({
      userId: req.user.userId.toString(),
    });

    if (!funds || funds.equity.availableCash < amount) {
      return res.status(400).json({ message: "INSUFFICIENT_BALANCE" });
    }

    funds.equity.availableCash -= Number(amount);
    await funds.save();

    await FundsTransaction.create({
      userId: req.user.userId.toString(),
      type: "WITHDRAW",
      amount: Number(amount),
      balanceAfter: funds.equity.availableCash,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("WITHDRAW ERROR:", err);
    res.status(500).json({ message: "WITHDRAW_FAILED" });
  }
}

/* ===============================
   FUNDS STATEMENT
=============================== */
async function getFundsStatement(req, res) {
  try {
    const txns = await FundsTransaction.find({
      userId: req.user.userId.toString(),
    }).sort({ createdAt: -1 });

    res.json(txns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createDefaultFunds,
  getFunds,
  addFunds,
  withdrawFunds,
  getFundsStatement,
};
