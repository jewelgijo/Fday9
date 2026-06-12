function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => onEdit(task)}>Edit</button>

      <button onClick={() => onDelete(task._id)}>Delete</button>

      {/* ✅ FIXED BUTTON */}
      <button onClick={() => onToggleStatus(task)}>
        {task.status === "completed"
          ? "Mark Pending"
          : "Mark Complete"}
      </button>
    </div>
  );
}

export default TaskCard;