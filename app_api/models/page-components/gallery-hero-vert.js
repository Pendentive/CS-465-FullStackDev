const mongoose = require('mongoose');
const BaseModel = require('./base');

const galleryHeroVertSchema = new mongoose.Schema({
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

module.exports = BaseModel.discriminator('GalleryHeroVert', galleryHeroVertSchema);