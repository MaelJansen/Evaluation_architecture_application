const express = require("express");
const { saveOperation } = require("../controller/operationController");

const router = express.Router();

router.post("/images/:images/transforms", saveOperation);

module.exports = router;
