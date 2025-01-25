const mongoose = require('mongoose');
const Image = require('./image');

const gallerySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Gallery', gallerySchema);