import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pending = total - completed;

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <h3>Total Tasks: {total}</h3>
        <h3>Completed: {completed}</h3>
        <h3>Pending: {pending}</h3>
      </div>

      <hr />

      {tasks.length === 0 ? (
        <h3>No tasks yet</h3>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
}

export default Dashboard;