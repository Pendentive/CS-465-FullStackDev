const mongoose = require('mongoose');
const BaseModel = require('./base');

const galleryGridSchema = new mongoose.Schema({
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

module.exports = BaseModel.discriminator('GalleryGrid', galleryGridSchema);