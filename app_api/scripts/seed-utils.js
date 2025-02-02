const Image = require('../models/image');

const seedImages = async (photos, category) => {
    await Image.deleteMany({ category });
    return await Image.insertMany(photos);
};

module.exports = {
    seedImages
};