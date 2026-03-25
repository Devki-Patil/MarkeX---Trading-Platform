const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/HoldingSchema");

const HoldingsModel = mongoose.model("Holding", HoldingsSchema);

module.exports = HoldingsModel;
