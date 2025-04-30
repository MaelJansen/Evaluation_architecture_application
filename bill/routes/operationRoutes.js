const express = require("express");
const { saveOperation, applyOperation } = require("../controller/operationController");

const router = express.Router();

router.post("/:imageId/transforms", saveOperation);
router.get("/:imageId/generate-modification", applyOperation);

module.exports = router;
