const app = require("./app");
const config = require("./config/env");

app.listen(config.PORT, () => {
  console.log(
    `Campus Canteen API running on http://localhost:${config.PORT}`
  );
});