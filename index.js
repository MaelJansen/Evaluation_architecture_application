const express = require("express");
const bodyParser = require("body-parser");
const operationRoutes = require("./routes/operationRoutes");
const sequelize = require("./database");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/images", operationRoutes);

sequelize
  .sync()
  .then(() => app.listen(PORT, () => console.log("🆗 Server is listenning on port " + PORT)))
  .catch((err) => console.log("Error : " + err));
