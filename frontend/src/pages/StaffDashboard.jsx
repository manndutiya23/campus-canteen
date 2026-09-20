import { useEffect, useState } from "react";

import OrderCard from "../components/OrderCard";
import OrderDetails from "../components/OrderDetails";
import StatusFilter from "../components/StatusFilter";

import {
  getStaffOrders,
  updateOrderStatus,
  collectOrder,
} from "../services/api";

function StaffDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getStaffOrders();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStartPreparing(orderId) {
    try {
      await updateOrderStatus(orderId, "PREPARING");
      await loadOrders();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleMarkReady(orderId) {
    try {
      await updateOrderStatus(orderId, "READY");
      await loadOrders();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleMarkCollected(orderId) {
    try {
      await collectOrder(orderId);
      await loadOrders();
    } catch (error) {
      setError(error.message);
    }
  }

  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter(
          (order) => order.status === activeFilter
        );

  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Campus Canteen</p>
          <h1>Order Management</h1>
        </div>

        <div className="staff-profile">
          <span>Staff</span>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-top">
          <div>
            <h2>Active Orders</h2>
            <p>
              Manage incoming orders and update their status.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={loadOrders}
          >
            Refresh
          </button>
        </div>

        <StatusFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders found</h3>
            <p>There are no orders in this category.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onStartPreparing={handleStartPreparing}
                onMarkReady={handleMarkReady}
                onMarkCollected={handleMarkCollected}
                onViewDetails={setSelectedOrder}
              />
            ))}
          </div>
        )}
      </main>

      <OrderDetails
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default StaffDashboard;