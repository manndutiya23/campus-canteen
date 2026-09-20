const orderService = require("../services/order.service");

function getStaffOrders(req, res) {
  try {
    const orders = orderService.getActiveOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
}

function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updatedOrder =
      orderService.updateOrderStatus(
        orderId,
        status
      );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);

    const statusCode =
      error.message === "Order not found"
        ? 404
        : 400;

    res.status(statusCode).json({
      message: error.message,
    });
  }
}

function collectOrder(req, res) {
  try {
    const { orderId } = req.params;

    const updatedOrder =
      orderService.collectOrder(orderId);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);

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
  updateOrderStatus,
  collectOrder,
};