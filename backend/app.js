const express = require("express");
const cors = require("cors");

const staffRoutes = require(
  "./routes/staff.routes"
);
const ordersRoutes = require(
  "./routes/orders.routes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Campus Canteen API is running",
  });
});

app.use("/staff", staffRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;