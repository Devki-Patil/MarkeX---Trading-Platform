const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    instrument: {
      type: String,
      required: true,
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE", "CDS", "MCX"],
      required: true,
    },

    product: {
      type: String,
      enum: ["MIS", "CNC", "NRML"],
      required: true,
    },

    side: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    orderType: {
      type: String,
      enum: ["MARKET", "LIMIT", "SL", "SL-M"],
      default: "MARKET",
    },

    qty: {
      type: Number,
      required: true,
    },

    filledQty: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },

    triggerPrice: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PARTIALLY_FILLED",
        "COMPLETE",
        "EXECUTED",
        "CANCELLED",
        "REJECTED",
      ],
      default: "EXECUTED",
    },

    exchangeOrderId: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = OrdersSchema;
