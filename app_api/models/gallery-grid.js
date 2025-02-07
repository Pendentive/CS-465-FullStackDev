const mongoose = require('mongoose');
const BaseModel = require('./base');

const galleryGridSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

module.exports = BaseModel.discriminator('GalleryGrid', galleryGridSchema);