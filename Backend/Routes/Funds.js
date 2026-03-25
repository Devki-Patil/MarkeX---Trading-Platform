const express = require("express");
const router = express.Router();
const { Auth } = require("../Middleware/Auth");

const {
  getFunds,
  addFunds,
  withdrawFunds,
  getFundsStatement, 
} = require("../Controllers/FundsController");

router.get("/", Auth, getFunds);
router.post("/add", Auth, addFunds);
router.get("/statement", Auth, getFundsStatement);
router.post("/withdraw", Auth, withdrawFunds);
module.exports = router;