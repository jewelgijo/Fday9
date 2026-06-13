import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const priorityColor =
    task.priority === "high"
      ? "#ef4444"
      : task.priority === "medium"
      ? "#f59e0b"
      : "#22c55e";

  const statusColor =
    task.status === "completed"
      ? "#16a34a"
      : "#f59e0b";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {task.title}
      </h3>

      <p>{task.description}</p>

      {/* Priority */}
      <p>
        <strong>Priority:</strong>{" "}
        <span
          style={{
            background: priorityColor,
            color: "white",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {task.priority.toUpperCase()}
        </span>
      </p>

      {/* Status */}
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            background: statusColor,
            color: "white",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {task.status.toUpperCase()}
        </span>
      </p>

      {/* Due Date */}
      {task.dueDate && (
        <p>
          <strong>Due:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "15px",
        }}
      >
        {/* Edit */}
        <button
          onClick={() => onEdit(task)}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaEdit />
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(task._id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaTrash />
          Delete
        </button>

        {/* Toggle Status */}
        <button
          onClick={() => onToggleStatus(task)}
          style={{
            background:
              task.status === "completed"
                ? "#f59e0b"
                : "#16a34a",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {task.status === "completed" ? (
            <>
              <FaClock />
              Mark Pending
            </>
          ) : (
            <>
              <FaCheckCircle />
              Mark Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;