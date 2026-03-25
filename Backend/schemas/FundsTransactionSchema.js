const mongoose = require("mongoose");

const FundsTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["ADD", "WITHDRAW", "BUY", "SELL"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      default: null, // UPI / CARD
    },
  },
  { timestamps: true }
);

module.exports = FundsTransactionSchema;
