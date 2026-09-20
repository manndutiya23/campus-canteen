import StatusBadge from "./StatusBadge";

function OrderCard({
  order,
  onStartPreparing,
  onMarkReady,
  onMarkCollected,
  onViewDetails,
}) {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3>{order.orderId}</h3>
          <p>{order.student.name}</p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={item.itemId}>
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-card-footer">
        <div>
          <strong>₹{order.totalAmount}</strong>
        </div>

        <div className="order-actions">
          <button
            className="secondary-button"
            onClick={() => onViewDetails(order)}
          >
            Details
          </button>

          {order.status === "ORDERED" && (
            <button
              className="primary-button"
              onClick={() => onStartPreparing(order.orderId)}
            >
              Start Cooking
            </button>
          )}

          {order.status === "PREPARING" && (
            <button
              className="primary-button"
              onClick={() => onMarkReady(order.orderId)}
            >
              Mark Ready
            </button>
          )}

          {order.status === "READY" && (
            <button
              className="primary-button"
              onClick={() => onMarkCollected(order.orderId)}
            >
              Mark Collected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;