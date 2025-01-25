const Mongoose = require('./db');
const Image = require('./image');
const Gallery = require('./gallery');
const fs = require('fs');
const path = require('path');

// Read gallery images from directory
const galleryPath = path.join(__dirname, '../../public/images/portfolio/personal');
const photoFiles = fs.readdirSync(galleryPath);

// Create photo objects array
const photos = photoFiles.map((filename, index) => ({
    filename,
    title: `Photo ${index + 1}`,
    alt: `Personal photo ${index + 1}`,
    description: `Personal gallery photo ${index + 1}`,
    path: `/images/portfolio/personal/${filename}`,
    category: 'personal'
}));

// Seed database function
const seedDB = async () => {
    try {
        // Clear existing data
        await Image.deleteMany({});
        await Gallery.deleteMany({});

        // Seed images
        const createdImages = await Image.insertMany(photos);

        // Create gallery with images
        await Gallery.create({
            title: 'Personal Photography',
            description: 'Collection of personal photographs',
            images: createdImages.map(img => img._id)
        });

        console.log(`Seeded ${createdImages.length} images`);
        
    } catch (err) {
        console.error('Seeding error:', err);
    }
};

// Run seeding
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});