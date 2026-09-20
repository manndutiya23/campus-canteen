const express = require("express");

const {
  getStaffOrders,
  getStaffOrder,
  changeOrderStatus,
  markOrderCollected,
} = require("../controllers/staff.controller");

const router = express.Router();

router.get(
  "/orders",
  getStaffOrders
);

router.get(
  "/orders/:orderId",
  getStaffOrder
);

router.patch(
  "/orders/:orderId/status",
  changeOrderStatus
);

router.patch(
  "/orders/:orderId/collect",
  markOrderCollected
);

module.exports = router;