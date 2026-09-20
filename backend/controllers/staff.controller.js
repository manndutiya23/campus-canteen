const {
  getActiveOrders,
  getOrderById,
  updateOrderStatus,
  collectOrder,
} = require("../services/dynamodb.service");

async function getStaffOrders(req, res) {
  try {
    const orders = await getActiveOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching staff orders:", error);

    res.status(500).json({
      message: "Failed to fetch staff orders",
    });
  }
}

async function getStaffOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
}

async function changeOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updatedOrder =
      await updateOrderStatus(orderId, status);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);

    const statusCode =
      error.message === "Order not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message: error.message,
    });
  }
}

async function markOrderCollected(req, res) {
  try {
    const { orderId } = req.params;

    const updatedOrder =
      await collectOrder(orderId);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error collecting order:", error);

    const statusCode =
      error.message === "Order not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message: error.message,
    });
  }
}

module.exports = {
  getStaffOrders,
  getStaffOrder,
  changeOrderStatus,
  markOrderCollected,
};