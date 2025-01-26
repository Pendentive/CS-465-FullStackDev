const mongoose = require('mongoose');
const Image = require('./image');

const galleryHeroVertSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    padding: {
        type: Number,
        default: 10 // Default padding value
    },
    width: {
        type: Number,
        default: 350 // Default width value
    },
    height: {
        type: Number,
        default: 600 // Default height value
    }
});

module.exports = mongoose.model('GalleryHeroVert', galleryHeroVertSchema);