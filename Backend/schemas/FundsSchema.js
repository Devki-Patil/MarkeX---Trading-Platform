const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },

  equity: {
    openingBalance: { type: Number, default: 0 },
    availableCash: { type: Number, default: 0 },
    usedMargin: { type: Number, default: 0 },
  },

  commodity: {
    openingBalance: { type: Number, default: 0 },
    availableCash: { type: Number, default: 0 },
    usedMargin: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = FundsSchema;
