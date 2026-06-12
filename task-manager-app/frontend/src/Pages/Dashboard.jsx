import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <Link to="/tasks">
        <button>Go to Tasks</button>
      </Link>

      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </div>
  );
}

export default Dashboard;