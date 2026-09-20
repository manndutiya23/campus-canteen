const statusLabels = {
  ORDERED: "Placed",
  PREPARING: "Cooking",
  READY: "Ready for Pickup",
  COLLECTED: "Collected",
};

function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      {statusLabels[status] || status}
    </span>
  );
}

export default StatusBadge;