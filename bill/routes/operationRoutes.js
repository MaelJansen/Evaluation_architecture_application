const express = require("express");
const { saveOperation, applyOperation } = require("../controller/operationController");
const {uploadImage} = require('../../utils/multer.config');

const router = express.Router();

router.post("/:imageId/:idUtilisateur/transforms", uploadImage.single('image'), saveOperation);
router.get("/:imageId/:idUtilisateur/modification", applyOperation);

module.exports = router;
