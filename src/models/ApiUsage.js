const mongoose = require("mongoose");

const apiUsageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  endpoint: String,
  count: Number,
  windowStart: Date
});

module.exports = mongoose.model("ApiUsage", apiUsageSchema);
