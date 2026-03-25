const axios = require("axios");

async function getStockPrice(symbol) {
  const res = await axios.get(
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
  );

  return res.data.quoteResponse.result[0];
}

module.exports = getStockPrice;