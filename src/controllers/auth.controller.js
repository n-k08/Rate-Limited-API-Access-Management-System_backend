const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
// 🔐 REGISTER
exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { email, password } = req.body;

    // ✅ validation (prevents crash)
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // ✅ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "USER", // default role
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 LOGIN
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // ✅ find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};