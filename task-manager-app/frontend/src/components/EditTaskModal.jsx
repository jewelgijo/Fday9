import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function EditTaskModal({ task, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "low",
        status: task.status || "pending",
        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : "",
      });
    }
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      const res = await api.put(
        `/tasks/${task._id}`,
        {
          ...form,
          title: form.title.trim(),
        }
      );

      onUpdate(res.data);

      toast.success("Task updated successfully");

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: 100,
        background: "#fff",
        padding: 20,
        border: "1px solid #ccc",
        zIndex: 999,
      }}
    >
      <h3>Edit Task</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Save
      </button>

      <button onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default EditTaskModal;