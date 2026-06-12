function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid red", padding: 10 }}>
      <h3>{task.title}</h3>

      <button
        onClick={() => {
          console.log("EDIT CLICK WORKS");
          onEdit(task);
        }}
      >
        Edit
      </button>

      <button
        onClick={() => {
          console.log("DELETE CLICK WORKS");
          onDelete(task._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;