import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (tasks.length === 0) {
    return <h2>No tasks yet</h2>;
  }

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Tasks;