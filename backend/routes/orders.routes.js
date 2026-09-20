const express = require("express");

const ordersController = require(
  "../controllers/orders.controller"
);

const router = express.Router();

/*
GET /orders/:orderId

Returns the current order and status.
Used by the student order-status page for polling.
*/
router.get(
  "/:orderId",
  ordersController.getOrder
);

module.exports = router;
