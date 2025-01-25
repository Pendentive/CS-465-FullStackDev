const Gallery = require('../models/gallery');

// GET all galleries
const getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find().populate('images');
        res.status(200).json(galleries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET gallery by ID
const getGalleryById = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id).populate('images');
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllGalleries,
    getGalleryById
};