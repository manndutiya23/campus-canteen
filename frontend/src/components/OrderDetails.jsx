import StatusBadge from "./StatusBadge";

function OrderDetails({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{order.orderId}</h2>
            <p>{order.student.name}</p>
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="details-section">
          <h3>Order Details</h3>

          {order.items.map((item) => (
            <div className="detail-item" key={item.itemId}>
              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity}</p>
              </div>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="details-section">
          <div className="detail-row">
            <span>Student</span>
            <strong>{order.student.name}</strong>
          </div>

          <div className="detail-row">
            <span>Identifier</span>
            <strong>{order.student.identifier}</strong>
          </div>

          <div className="detail-row">
            <span>Payment</span>
            <strong>{order.payment.status}</strong>
          </div>

          <div className="detail-row">
            <span>Pickup Code</span>
            <strong>{order.pickupCode}</strong>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <StatusBadge status={order.status} />
          </div>

          <div className="detail-row total-row">
            <span>Total</span>
            <strong>₹{order.totalAmount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;