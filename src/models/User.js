const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

module.exports = mongoose.model("User", userSchema);