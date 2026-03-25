const { Schema } = require("mongoose");

const PositionsSchema = new Schema(
  {
    // 🔥 ADD THIS (MOST IMPORTANT)
    userId: {
  type: String,          // 🔥 CHANGE THIS
  required: true,
  index: true,
},


    product: {
      type: String,
      enum: ["MIS", "CNC", "NRML"],
      required: true,
    },

    instrument: {
      type: String,
      required: true,
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE", "CDS", "MCX", "NFO"],
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },

    avg: {
      type: Number,
      required: true,
    },

    ltp: {
      type: Number,
      required: true,
    },

    pnl: {
      type: Number,
      default: 0,
    },

    chg: {
      type: Number,
      default: 0,
    },

    tag: {
      type: String,
      default: null,
    },

    prevClose: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = PositionsSchema;
