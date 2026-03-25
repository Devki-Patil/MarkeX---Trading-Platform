const mongoose = require("mongoose");

// =======================
// REFRESH TOKEN SCHEMA
// =======================
const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// =======================
// USER SCHEMA
// =======================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ✅ FIXED: use sub-schema properly
    refreshTokens: {
      type: [refreshTokenSchema],
      default: [], // 🔥 IMPORTANT (prevents crash)
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;