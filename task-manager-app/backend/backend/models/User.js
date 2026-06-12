const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true } // 🔥 THIS IS REQUIRED
);

module.exports = mongoose.model("User", userSchema);