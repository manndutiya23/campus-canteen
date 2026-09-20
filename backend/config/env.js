require("dotenv").config();

const config = {
  PORT: process.env.PORT || 5000,
  CANTEEN_ID: process.env.CANTEEN_ID || "KJSCE-MAIN",
};

module.exports = config;