const mongoose = require("mongoose");
const schema = require("../schemas/FundsTransactionSchema");

module.exports = mongoose.model("FundsTransaction", schema);
