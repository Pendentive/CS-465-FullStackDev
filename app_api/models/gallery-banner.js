const mongoose = require('mongoose');
const Image = require('./image');

const galleryBannerSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
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

module.exports = mongoose.model('GalleryBanner', galleryBannerSchema);