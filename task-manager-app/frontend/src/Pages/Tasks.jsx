import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/tasks");

        // 🔥 FIX: normalize response (array OR object)
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.tasks || [];

        console.log("TASKS API RESPONSE:", data);

        setTasks(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  if (tasks.length === 0) {
    return <h2>No tasks yet</h2>;
  }

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Tasks;