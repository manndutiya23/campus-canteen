const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMenu() {
  const response = await fetch(`${API_BASE_URL}/menu`);

  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status}`);
  }

  return response.json();
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create order");
  }

  return data;
}

export async function getOrder(orderId) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data;
}

export async function getStaffOrders() {
  const response = await fetch(`${API_BASE_URL}/staff/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(
    `${API_BASE_URL}/staff/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
}

export async function collectOrder(orderId) {
  const response = await fetch(
    `${API_BASE_URL}/staff/orders/${orderId}/collect`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to collect order");
  }

  return data;
}