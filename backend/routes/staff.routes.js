const express = require("express");

const staffController = require(
  "../controllers/staff.controller"
);

const router = express.Router();

/*
GET /staff/orders

Returns:
ORDERED
PREPARING
READY
*/
router.get(
  "/orders",
  staffController.getStaffOrders
);

/*
PATCH /staff/orders/:orderId/status

Example:
{
  "status": "PREPARING"
}
*/
router.patch(
  "/orders/:orderId/status",
  staffController.updateOrderStatus
);

/*
PATCH /staff/orders/:orderId/collect

READY → COLLECTED
*/
router.patch(
  "/orders/:orderId/collect",
  staffController.collectOrder
);

module.exports = router;