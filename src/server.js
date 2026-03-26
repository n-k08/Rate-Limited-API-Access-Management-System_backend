require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();  // 🔥 MUST BE CALLED
const app = express();

// 🔥 Connect DB
connectDB();

// 🔥 Middlewares
app.use(cors());
app.use(express.json()); // VERY IMPORTANT (fixes your issue)

// 🔥 Routes
app.use("/api/auth", require("./routes/auth.route"));
// (add others later if needed)

// 🔥 Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});