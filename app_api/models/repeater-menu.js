const mongoose = require('mongoose');
const BaseModel = require('./base');
const Image = require('./image');

const menuCardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    route: {
        type: String,
        required: true
    }
});

const repeaterMenuSchema = new mongoose.Schema({
    menuCards: [menuCardSchema],
    photoHeight: {
        type: Number,
        default: 200 // Default photo height value
    },
    photoWidth: {
        type: Number,
        default: 200 // Default photo width value
    },
    photoPaddingX: {
        type: Number,
        default: 10 // Default photo x padding value
    },
    photoPaddingY: {
        type: Number,
        default: 10 // Default photo y padding value
    },
    menuCardPaddingX: {
        type: Number,
        default: 20 // Default menu card x padding value
    }
});

module.exports = BaseModel.discriminator('RepeaterMenu', repeaterMenuSchema);