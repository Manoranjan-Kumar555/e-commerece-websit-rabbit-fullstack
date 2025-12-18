import jwt from "jsonwebtoken";

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default authMiddleware;



// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const { promisify } = require("util");

// const authMiddleware = (roles = []) => {
//   // normalize roles to an array of strings for reliable comparison
//   const allowedRoles = Array.isArray(roles)
//     ? roles.map(String)
//     : roles !== undefined && roles !== null
//     ? [String(roles)]
//     : [];

//   return async (req, res, next) => {
//     try {
//       // token can come as:
//       // - Authorization: "Bearer <token>"
//       // - Authorization: "<token>"
//       // - ?token=<token>
//       // - body.token
//       const authHeader = req.headers.authorization;
//       const queryToken = req.query && req.query.token;
//       const bodyToken = req.body && req.body.token;

//       let token = null;

//       if (authHeader) {
//         // accept "Bearer <token>" or just "<token>"
//         const parts = authHeader.split(" ");
//         token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : authHeader;
//       } else if (queryToken) {
//         token = queryToken;
//       } else if (bodyToken) {
//         token = bodyToken;
//       }

//       if (!token) {
//         return res.status(401).json({ message: "Unauthorized: token required" });
//       }

//       if (!process.env.JWT_SECRET) {
//         console.error("JWT_SECRET is not set in environment");
//         return res.status(500).json({ message: "Server configuration error" });
//       }

//       const verifyAsync = promisify(jwt.verify);
//       const decoded = await verifyAsync(token, process.env.JWT_SECRET);

//       // attach decoded payload to req.user
//       req.user = decoded;

//       // if roles specified, check membership
//       if (allowedRoles.length && !allowedRoles.includes(String(decoded.role))) {
//         return res.status(403).json({ message: "Forbidden: Access denied" });
//       }

//       return next();
//     } catch (error) {
//       console.error("Auth Middleware Error:", error);
//       // distinguish expired vs invalid token if you want (optional)
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }
//   };
// };

// module.exports = authMiddleware;

