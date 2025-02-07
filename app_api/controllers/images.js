const Image = require('../models/image');

// GET all images
const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET image by ID
const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllImages,
    getImageById
};