require("dotenv").config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ Missing required env vars: MONGO_URI and JWT_SECRET");
  console.log("💡 Copy .env.example → .env and fill MONGO_URI from Atlas");
  process.exit(1);
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "API is working 🚀", 
    status: "ok", 
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected" 
  });
});

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api", require("./routes/api.route"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

// Wait for DB before listen
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Health: http://localhost:${PORT}`);
    console.log("🗄️ DB Status:", mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected - set MONGO_URI");
  });
};

startServer();
