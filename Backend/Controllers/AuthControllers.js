const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const { createDefaultFunds } = require("./FundsController");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/Token");

/* ================= REGISTER ================= */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      refreshTokens: [], // ✅ important
    });

    // await createDefaultFunds(user._id);

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // ✅ FIX SAFE ARRAY
    if (!user.refreshTokens) {
      user.refreshTokens = [];
    }

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // verify refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // check if token exists in DB
    const tokenExists = user.refreshTokens.find(
      (t) => t.token === token
    );

    if (!tokenExists) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // generate new access token
    const newAccessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.error("REFRESH ERROR:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // remove refresh token from DB
    user.refreshTokens = user.refreshTokens.filter(
      (t) => t.token !== token
    );

    await user.save();

    // clear cookie
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};