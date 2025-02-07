const mongoose = require('mongoose');
const BaseModel = require('./base');

const galleryBannerSchema = new mongoose.Schema({
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    photoEdgeLength: {
        type: Number,
        default: 200 // Default photo edge length value
    },
    barHeight: {
        type: Number,
        default: 6 // Default bar height value
    }
});

module.exports = BaseModel.discriminator('GalleryBanner', galleryBannerSchema);