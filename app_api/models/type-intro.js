const mongoose = require('mongoose');

const typeIntroSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    leftPadding: {
        type: Number,
        default: 50 // Default left padding value
    },
    width: {
        type: Number,
        default: 800 // Default width value
    },
    height: {
        type: Number,
        default: 400 // Default height value
    }
});

module.exports = mongoose.model('TypeIntro', typeIntroSchema);