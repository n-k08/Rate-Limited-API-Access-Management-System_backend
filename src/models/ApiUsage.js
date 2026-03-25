const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  count: Number,
  startTime: Date,
});

module.exports = mongoose.model("ApiUsage", usageSchema);