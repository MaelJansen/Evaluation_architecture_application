const express = require("express");
require('dotenv').config();
const operationRoutes = require("./routes/operationRoutes");
const sequelize = require("./database");

const app = express();
const port = process.env.BILL_SERVER_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", operationRoutes);

sequelize
  .sync()
  .then(() => app.listen(port, () => console.log("🆗 Server is listenning on port " + port)))
  .catch((err) => console.log("Error : " + err));
