function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <p>{task.status}</p>

      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>

      <button onClick={() => onToggleStatus(task)}>
        {task.status === "completed"
          ? "Mark Pending"
          : "Mark Complete"}
      </button>
    </div>
  );
}

export default TaskCard;