const jwt = require("jsonwebtoken");

// =======================
// AUTH MIDDLEWARE
// =======================
const Auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "NO_TOKEN" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "INVALID_OR_EXPIRED_TOKEN" });
  }
};

// =======================
// ROLE GUARD
// =======================
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "ACCESS_DENIED" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "FORBIDDEN" });
    }

    next();
  };
};

module.exports = {
  Auth,
  authorizeRoles,
};
