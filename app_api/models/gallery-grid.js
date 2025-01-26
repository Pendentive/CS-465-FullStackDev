const mongoose = require('mongoose');
const Image = require('./image');

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

module.exports = mongoose.model('GalleryGrid', galleryGridSchema);