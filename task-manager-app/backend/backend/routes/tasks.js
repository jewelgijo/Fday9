const router = require("express").Router();
const Task = require("../models/Task");

// GET ALL
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({
      message: err.message
    });
  }
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

// PATCH (toggle status / partial update)
// TOGGLE STATUS (PATCH)
router.patch("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.json(updatedTask);
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