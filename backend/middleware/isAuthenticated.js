import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid!",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded token:", decoded);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Login token has expired!",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Token verification failed or token is invalid!",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Attach to request for next handlers
    req.id = user.id;
    req.user = user;

    next();
  } catch (error) {
    console.error("IsAuthenticate middleware error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ---------------------------
// ADMIN AUTHORIZATION MIDDLEWARE
// ---------------------------
export const isAdmin = async (req, res, next) => {
  try {
    // ✅ Safety check so it doesn't crash
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! User not found in request.",
      });
    }

    if (req.user.role === "admin") {
      return next(); // ✅ MUST call next()
    }

    // ❌ If not admin
    return res.status(403).json({
      success: false,
      message: "Access denied! Admins only.",
    });
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
