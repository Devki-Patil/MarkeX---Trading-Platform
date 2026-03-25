const { Schema } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    instrument: { type: String, required: true },
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    ltp: { type: Number, default: 0 },
    prevClose: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ===== VIRTUALS (same as before) =====
HoldingsSchema.virtual("current").get(function () {
  return this.qty * this.ltp;
});

HoldingsSchema.virtual("pnl").get(function () {
  return (this.ltp - this.avg) * this.qty;
});

HoldingsSchema.virtual("netchg").get(function () {
  return ((this.ltp - this.avg) / this.avg) * 100;
});

HoldingsSchema.virtual("daychg").get(function () {
  if (!this.prevClose || this.prevClose === 0) return 0;
  return ((this.ltp - this.prevClose) / this.prevClose) * 100;
});

module.exports = HoldingsSchema;
