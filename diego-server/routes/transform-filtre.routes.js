const express = require('express');
const router = express.Router();
const {upload} = require('../../utils/multer.config');
const transformImageFiltre = require('../controllers/transform-filtre.controller');

router.post('/', upload.single('image'), transformImageFiltre);

module.exports = router;
