const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Image = require('../models/Image');
const Kryptonian = require('../models/Kryptonian');

const uploadImage = async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    const kryptonian = await Kryptonian.findOne({ apiKey, isValidApiKey: true });

    if (!kryptonian) {
        return res.status(401).json({ message: 'Invalid API key' });
    }

    if (!req.files || !req.files.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'Invalid file type' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.name);
    await file.mv(filePath);

    const imageBase64 = fs.readFileSync(filePath, 'base64');
    fs.unlinkSync(filePath);

    const newImage = new Image({
        kryptonianId: kryptonian._id,
        imageBase64
    });

    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
};

const getAllImages = async (req, res) => {
    const images = await Image.find();
    res.status(200).json(images.map(image => ({ id: image._id, imageBase64: image.imageBase64 })));
};

const getImage = async (req, res) => {
    const { imageId } = req.params;
    const image = await Image.findById(imageId);

    if (!image) {
        return res.status(404).json({ message: 'Image not found' });
    }

        res.status(200).json({ id: image._id, imageBase64: image.imageBase64 });
};

module.exports = { uploadImage, getAllImages, getImage };

