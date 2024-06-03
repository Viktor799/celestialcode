const express = require('express');
const router = express.Router();
const { uploadImage, getAllImages, getImage } = require('../controllers/fileController');

router.post('/upload-image', uploadImage);
router.get('/images', getAllImages);
router.get('/images/:imageId', getImage);

module.exports = router;

