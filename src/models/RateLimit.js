const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
  requests: Number,
  window: Number, // in minutes
});

module.exports = mongoose.model("RateLimit", rateLimitSchema);