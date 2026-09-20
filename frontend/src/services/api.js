const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMenu() {
  console.log("API URL:", API_BASE_URL);

  const response = await fetch(`${API_BASE_URL}/menu`);

  console.log("API response:", response.status);

  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status}`);
  }

  return response.json();
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