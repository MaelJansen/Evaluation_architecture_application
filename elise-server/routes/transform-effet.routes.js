const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer.config');
const transformEffetImage = require('../controllers/transform-effet.controller');

router.post('/', upload.single('image'), transformEffetImage);

module.exports = router;
