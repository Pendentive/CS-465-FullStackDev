const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: { 
        type: String, 
        required: true 
    },
    path: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        default: 'personal'
    },
    metadata: {
        width: Number,
        height: Number,
        size: Number,
        dateCreated: { 
            type: Date, 
            default: Date.now 
        }
    },
    alt: String,
    title: String,
    description: String
});

module.exports = mongoose.model('Image', imageSchema);