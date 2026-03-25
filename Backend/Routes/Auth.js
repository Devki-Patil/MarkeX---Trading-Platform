const express = require("express");
const router = express.Router(); // 🔥 THIS WAS MISSING

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../Controllers/AuthControllers");

// ================= AUTH ROUTES =================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

module.exports = router;
