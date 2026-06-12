const router = require("express").Router();
const Task = require("../models/Task");

// GET ALL
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// UPDATE (EDIT)
router.put("/:id", async (req, res) => {
  try {
    console.log("TASK ID:", req.params.id);
    console.log("REQUEST BODY:", req.body);

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log("UPDATED TASK FROM DB:", updatedTask);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found (ID does not exist in DB)"
      });
    }

    res.json(updatedTask);
  } catch (err) {
    console.log("PUT ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;