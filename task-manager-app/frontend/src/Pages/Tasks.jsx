import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // 🔍 SEARCH + FILTER STATE
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // GET TASKS
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE
  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // DELETE
  const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);

    setTasks((prev) => prev.filter((t) => t._id !== id));

    toast.success("Task deleted");
  } catch (err) {
    toast.error("Failed to delete task");
  }
};

  // UPDATE
  const updateTask = (updated) => {
  setTasks((prev) =>
    prev.map((t) => (t._id === updated._id ? updated : t))
  );

  setEditingTask(null);

  toast.success("Task updated");
};

  // TOGGLE STATUS
  const toggleStatus = async (task) => {
  try {
    const res = await api.patch(`/tasks/${task._id}`, {
      status:
        task.status === "completed"
          ? "pending"
          : "completed",
    });

    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? res.data : t
      )
    );

    toast.success("Status updated");
  } catch (err) {
    toast.error("Failed to update status");
  }
};

  // 🔥 SEARCH + FILTER LOGIC
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchFilter = true;

      if (filter === "pending") matchFilter = task.status === "pending";
      if (filter === "completed") matchFilter = task.status === "completed";
      if (filter === "high") matchFilter = task.priority === "high";

      return matchSearch && matchFilter;
    });
  }, [tasks, search, filter]);

  // 📊 COUNTS
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  return (
    <div
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  }}
>
      <h2>Tasks</h2>

      {/* ADD TASK */}
      <AddTask onTaskAdded={addTask} />

      {/* 🔍 SEARCH BAR */}
      <input
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    margin: "15px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

      {/* FILTER BUTTONS */}
      <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  }}
>
        <button onClick={() => setFilter("all")}>
          All ({counts.all})
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending ({counts.pending})
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed ({counts.completed})
        </button>

        <button onClick={() => setFilter("high")}>
          High Priority ({counts.high})
        </button>
      </div>

      {/* TASK LIST */}
      {filteredTasks.length === 0 ? (
  <h3>No tasks found</h3>
) : (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "15px",
      marginTop: "20px",
    }}
  >
    {filteredTasks.map((task) => (
      <TaskCard
        key={task._id}
        task={task}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        onToggleStatus={toggleStatus}
      />
    ))}
  </div>
)}

      {/* EDIT MODAL */}
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default Tasks;