const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
  maxRequests: Number,
  windowMinutes: Number
});

module.exports = mongoose.model("RateLimit", rateLimitSchema);
