const orderService = require("../services/order.service");

function getOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
}

module.exports = {
  getOrder,
};
