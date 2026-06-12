import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // GET TASKS
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const handleTaskAdded = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete task?");
    if (!confirm) return;

    await api.delete(`/tasks/${id}`);

    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // UPDATE
  const handleUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      )
    );
  };

  return (
    <div>
      <h2>Tasks</h2>

      <AddTask onTaskAdded={handleTaskAdded} />

      {tasks.length === 0 ? (
        <h3>No tasks yet</h3>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        ))
      )}

      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Tasks;