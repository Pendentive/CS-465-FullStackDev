const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    identifier: { // Ensure the identifier field is included
        type: String,
        unique: true,
        required: true
    },
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'componentsModel'
    }],
    componentsModel: [{
        type: String,
        required: true,
        enum: ['GalleryHeroVert', 'TypeIntro', 'RepeaterMenu', 'GalleryBanner', 'GalleryGrid']
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Page', pageSchema);