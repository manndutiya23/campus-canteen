const fs = require("fs");
const path = require("path");

const ordersFilePath = path.join(
  __dirname,
  "../data/orders.json"
);

const VALID_STATUSES = [
  "ORDERED",
  "PREPARING",
  "READY",
  "COLLECTED",
];

const STATUS_TRANSITIONS = {
  ORDERED: "PREPARING",
  PREPARING: "READY",
  READY: "COLLECTED",
};

function readOrders() {
  const file = fs.readFileSync(
    ordersFilePath,
    "utf-8"
  );

  return JSON.parse(file);
}

function writeOrders(orders) {
  fs.writeFileSync(
    ordersFilePath,
    JSON.stringify(orders, null, 2)
  );
}

function getActiveOrders() {
  const orders = readOrders();

  return orders.filter(
    (order) =>
      order.status === "ORDERED" ||
      order.status === "PREPARING" ||
      order.status === "READY"
  );
}

function getOrderById(orderId) {
  const orders = readOrders();

  return orders.find(
    (order) => order.orderId === orderId
  );
}

function updateOrderStatus(orderId, newStatus) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error("Invalid order status");
  }

  const orders = readOrders();

  const orderIndex = orders.findIndex(
    (order) => order.orderId === orderId
  );

  if (orderIndex === -1) {
    throw new Error("Order not found");
  }

  const order = orders[orderIndex];

  const expectedNextStatus =
    STATUS_TRANSITIONS[order.status];

  if (expectedNextStatus !== newStatus) {
    throw new Error(
      `Invalid status transition: ${order.status} → ${newStatus}`
    );
  }

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();

  orders[orderIndex] = order;

  writeOrders(orders);

  return order;
}

function collectOrder(orderId) {
  return updateOrderStatus(
    orderId,
    "COLLECTED"
  );
}

function generatePickupCode() {
  return String(
    Math.floor(1000 + Math.random() * 9000)
  );
}

module.exports = {
  getActiveOrders,
  getOrderById,
  updateOrderStatus,
  collectOrder,
  generatePickupCode,
};