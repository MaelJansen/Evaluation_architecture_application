const express = require("express");
const { saveOperation, applyOperation } = require("../controller/operationController");
const {uploadImage} = require('../../utils/multer.config');

const router = express.Router();

router.post("/:imageId/transforms", uploadImage.single('image'), saveOperation);
router.get("/:imageId/generate-modification", applyOperation);

module.exports = router;
