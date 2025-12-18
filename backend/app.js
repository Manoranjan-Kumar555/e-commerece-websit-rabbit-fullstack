import express from "express"; // Optional here unless you're using it
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import dbConnection from "./db/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouters from "./routes/userRoute.js";
import productRouters from "./routes/productRoutex.js";
import cartRouters from "./routes/cartRoute.js";

// dotenv.config({ path: ".env" });
dotenv.config();

const app = express();

// Middleware
const origin = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

// ------------------------
// BODY PARSER (BUILT-IN)
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Health check
app.get("/", (req, res) => {
  const formattedDateTime = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

  res.json({
    success: true,
    message:
      "Welcome! to Node Project ekart-project :- E.Commerce Website Apps  (Youtuber :- Webelite Builders)",
    datetime: formattedDateTime,
  });
});

// ------------------------
// STATIC FOLDER (for image uploads)
// ------------------------
// Serve uploaded files (User Images)
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "../public/userImages"))
// );

// Routes for user
app.use("/api/v1/user", userRouters);

// Routes for Products
app.use("/api/v1/product", productRouters);

// Routes for Cart
app.use("/api/v1/cart", cartRouters);

// Error handler
app.use(errorHandler);

// DB Connection
dbConnection();

export default app;
