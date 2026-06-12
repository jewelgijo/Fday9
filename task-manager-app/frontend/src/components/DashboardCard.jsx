function DashboardCard({ title, value, color }) {
  return (
    <div style={{ border: "1px solid gray", padding: 20, margin: 10 }}>
      <h3>{title}</h3>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default DashboardCard;