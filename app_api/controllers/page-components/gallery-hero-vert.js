const GalleryHeroVert = require('../models/gallery-hero-vert');

// GET all gallery-hero-vert
const getAllGalleryHeroVert = async (req, res) => {
    try {
        const galleries = await GalleryHeroVert.find().populate('images');
        res.status(200).json(galleries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET gallery-hero-vert by ID
const getGalleryHeroVertById = async (req, res) => {
    try {
        const gallery = await GalleryHeroVert.findById(req.params.id).populate('images');
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllGalleryHeroVert,
    getGalleryHeroVertById
};