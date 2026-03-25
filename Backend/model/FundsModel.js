const mongoose = require("mongoose");
const FundsSchema = require("../schemas/FundsSchema");

module.exports = mongoose.model("Funds", FundsSchema);
