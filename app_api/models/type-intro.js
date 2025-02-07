const mongoose = require('mongoose');
const BaseModel = require('./base');

const typeIntroSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    leftPadding: {
        type: Number,
        required: true,
        default: 50 // Default left padding value
    },
    width: {
        type: Number,
        required: true,
        default: 800 // Default width value
    },
    height: {
        type: Number,
        required: true,
        default: 400 // Default height value
    }
});

module.exports = BaseModel.discriminator('TypeIntro', typeIntroSchema);