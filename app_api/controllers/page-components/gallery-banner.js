const GalleryBanner = require('../models/gallery-banner');

// GET all gallery-banner
const getAllGalleryBanner = async (req, res) => {
    try {
        const galleries = await GalleryBanner.find().populate('images');
        res.status(200).json(galleries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET gallery-banner by ID
const getGalleryBannerById = async (req, res) => {
    try {
        const gallery = await GalleryBanner.findById(req.params.id).populate('images');
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllGalleryBanner,
    getGalleryBannerById
};