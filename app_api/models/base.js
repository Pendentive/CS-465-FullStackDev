const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    identifier: {
        type: String,
        unique: true,
        required: true
    },
    tags: [String]
}, { discriminatorKey: 'kind', timestamps: true });

module.exports = mongoose.model('BaseModel', baseSchema);