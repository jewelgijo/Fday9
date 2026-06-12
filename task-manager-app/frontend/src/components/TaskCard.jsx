function TaskCard({ task }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{task.title}</h3>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      {task.description && (
        <p>
          <strong>Description:</strong> {task.description}
        </p>
      )}

      {task.dueDate && (
        <p>
          <strong>Due:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default TaskCard;