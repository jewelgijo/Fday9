const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors({
  origin: "*", // you can restrict later to your frontend URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================== ROUTES ==================
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ================== HEALTH CHECK ==================
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ================== DATABASE + SERVER START ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });