const Mongoose = require('../config/db');
const Image = require('../models/image');
const GalleryGrid = require('../models/gallery-grid');
const GalleryHeroVert = require('../models/gallery-hero-vert');
const GalleryBanner = require('../models/gallery-banner');
const RepeaterMenu = require('../models/repeater-menu');
const TypeIntro = require('../models/type-intro');
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
        await GalleryGrid.deleteMany({});
        await GalleryHeroVert.deleteMany({});
        await GalleryBanner.deleteMany({});
        await RepeaterMenu.deleteMany({});
        await TypeIntro.deleteMany({});

        // Seed images
        const createdImages = await Image.insertMany(photos);

        // Create gallery-grid with images
        await GalleryGrid.create({
            title: 'Personal Photography',
            description: 'Collection of personal photographs',
            images: createdImages.map(img => img._id)
        });

        // Create gallery-hero-vert with images
        await GalleryHeroVert.create({
            title: 'Hero Vertical Gallery',
            description: 'Collection of vertical photographs',
            images: createdImages.map(img => img._id),
            padding: 8,
            width: 250,
            height: 700
        });

        // Create gallery-banner with images
        await GalleryBanner.create({
            title: 'Banner Gallery',
            description: 'Collection of banner photographs',
            images: createdImages.map(img => img._id),
            photoEdgeLength: 200,
            barHeight: 6
        });

        // Create repeater-menu with menu-cards
        const menuCards = createdImages.slice(0, 4).map((image, index) => ({
            title: `Menu Card ${index + 1}`,
            image: image._id,
            route: `/menu-card-${index + 1}`
        }));

        await RepeaterMenu.create({
            menuCards: menuCards,
            photoHeight: 450,
            photoWidth: 300,
            photoPaddingX: 8,
            photoPaddingY: 0,
            menuCardPaddingX: 5
        });

        // Create type-intro
        await TypeIntro.create({
            title: 'Defining Moments',
            description: 'The steps of your first child, the final year of high school, and the grand opening of your business are moments that define our lives.<br><br>Studio Custer isn\'t just about taking great photos, we want to see genuine smiles and really dig into why each moment is unique.<br><br>We capture your Defining Moments.',
            leftPadding: 50,
            width: 800,
            height: 300
        });

        console.log(`Seeded ${createdImages.length} images`);
        
    } catch (err) {
        console.error('Seeding error:', err);
    }
};

// Connect to the database and seed
Mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    seedDB().then(() => {
        console.log('Database seeded');
        Mongoose.connection.close();
    });
});