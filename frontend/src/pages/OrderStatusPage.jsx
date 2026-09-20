import { useParams } from "react-router-dom";

import OrderStatusTimeline from "../components/OrderStatusTimeline";
import PickupCodeCard from "../components/PickupCodeCard";
import ReadyBanner from "../components/ReadyBanner";
import StatusBadge from "../components/StatusBadge";

import { usePollOrderStatus } from "../hooks/usePollOrderStatus";
import { useOrderReadyNotification } from "../hooks/useOrderReadyNotification";

function OrderStatusPage() {
  const { orderId } = useParams();

  const { order, loading, error, refresh } = usePollOrderStatus(orderId);

  useOrderReadyNotification(order);

  return (
    <div className="order-status-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Campus Canteen</p>
          <h1>Order Status</h1>
        </div>
      </header>

      <main className="order-status-content">
        {loading && !order && <div className="empty-state">Loading order...</div>}

        {error && !order && (
          <div className="empty-state">
            <h3>Order not found</h3>
            <p>{error}</p>
          </div>
        )}

        {order && (
          <div className="order-status-card">
            <div className="order-status-top">
              <div>
                <h2>{order.orderId}</h2>
                <p>{order.student.name}</p>
              </div>

              <StatusBadge status={order.status} />
            </div>

            <OrderStatusTimeline status={order.status} />

            {order.status === "READY" && <ReadyBanner orderId={order.orderId} />}

            {order.status === "COLLECTED" ? (
              <div className="collected-state">
                <span className="collected-icon">✅</span>
                <p>This order has been collected. Enjoy your meal!</p>
              </div>
            ) : (
              <PickupCodeCard
                pickupCode={order.pickupCode}
                emphasized={order.status === "READY"}
              />
            )}

            <div className="details-section">
              <h3>Order Details</h3>

              {order.items.map((item) => (
                <div className="detail-item" key={item.itemId}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="detail-row total-row">
                <span>Total</span>
                <strong>₹{order.totalAmount}</strong>
              </div>
            </div>

            <button className="secondary-button refresh-status-button" onClick={refresh}>
              Refresh
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderStatusPage;
