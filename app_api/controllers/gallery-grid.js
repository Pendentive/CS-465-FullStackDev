const GalleryGrid = require('../models/gallery-grid');

// GET all gallery-grid
const getAllGalleryGrid = async (req, res) => {
    try {
        const galleries = await GalleryGrid.find().populate('images');
        res.status(200).json(galleries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET gallery-grid by ID
const getGalleryGridById = async (req, res) => {
    try {
        const gallery = await GalleryGrid.findById(req.params.id).populate('images');
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllGalleryGrid,
    getGalleryGridById
};