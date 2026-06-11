const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/test-server", (req, res) => {
  res.json({ message: "Server is working" });
});

const taskRoutes = require("./routes/tasks");

app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
