const router = require("express").Router();
console.log("Auth routes loaded");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Saving user...");

    await user.save();

    console.log("User saved!");

    res.json({ message: "User registered successfully" });

  } catch (err) {
  console.error("REGISTER ERROR:", err);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "process.env.JWT_SECRET",
      { expiresIn: "1d" }
    );

    res.json({ token, message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;