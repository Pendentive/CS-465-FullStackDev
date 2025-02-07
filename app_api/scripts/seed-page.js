const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Image = require('../models/image');
const GalleryHeroVert = require('../models/gallery-hero-vert');
const TypeIntro = require('../models/type-intro');
const RepeaterMenu = require('../models/repeater-menu');
const GalleryBanner = require('../models/gallery-banner');
const GalleryGrid = require('../models/gallery-grid');
const Page = require('../models/page');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Connect to the database
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

const galleryPath = path.join(__dirname, '../../public/images/portfolio/personal');
const photoFiles = fs.readdirSync(galleryPath);

const photos = photoFiles.map((filename, index) => ({
    filename,
    title: `Photo ${index + 1}`,
    alt: `Personal photo ${index + 1}`,
    description: `Personal gallery photo ${index + 1}`,
    path: `/images/portfolio/personal/${filename}`,
    category: 'personal'
}));

const seedPage = async () => {
    try {
        // Clear existing data
        await Image.deleteMany({});
        await GalleryHeroVert.deleteMany({});
        await TypeIntro.deleteMany({});
        await RepeaterMenu.deleteMany({});
        await GalleryBanner.deleteMany({});
        await GalleryGrid.deleteMany({});
        await Page.deleteMany({});

        // Seed images
        const createdImages = await Image.insertMany(photos);

        // Create gallery-hero-vert with images
        const galleryHeroVert = await GalleryHeroVert.create({
            title: 'Hero Vertical Gallery',
            description: 'Collection of vertical photographs',
            images: createdImages.map(img => img._id),
            padding: 8,
            width: 250,
            height: 700,
            identifier: 'gallery-hero-vert-1',
            tags: ['hero', 'vertical']
        });

        // Create type-intro
        const typeIntro = await TypeIntro.create({
            title: 'Defining Moments',
            description: 'The steps of your first child, the final year of high school, and the grand opening of your business are moments that define our lives.<br><br>Studio Custer isn\'t just about taking great photos, we want to see genuine smiles and really dig into why each moment is unique.<br><br>We capture your Defining Moments.',
            leftPadding: 50,
            width: 800,
            height: 300,
            identifier: 'type-intro-1',
            tags: ['intro', 'defining moments']
        });

        // Create repeater-menu with menu-cards
        const menuCards = createdImages.slice(0, 4).map((image, index) => ({
            title: `Menu Card ${index + 1}`,
            image: image._id,
            route: `/menu-card-${index + 1}`
        }));

        const repeaterMenu = await RepeaterMenu.create({
            title: 'Menu Repeater',
            description: 'A collection of menu cards',
            menuCards: menuCards,
            photoHeight: 450,
            photoWidth: 300,
            photoPaddingX: 8,
            photoPaddingY: 0,
            menuCardPaddingX: 5,
            identifier: 'repeater-menu-1',
            tags: ['menu', 'repeater']
        });

        // Create gallery-banner with images
        const galleryBanner = await GalleryBanner.create({
            title: 'Banner Gallery',
            description: 'Collection of banner photographs',
            images: createdImages.map(img => img._id),
            photoEdgeLength: 200,
            barHeight: 6,
            identifier: 'gallery-banner-1',
            tags: ['banner', 'gallery']
        });

        // Create gallery-grid with images
        const galleryGrid = await GalleryGrid.create({
            title: 'Personal Photography',
            description: 'Collection of personal photographs',
            images: createdImages.map(img => img._id),
            identifier: 'gallery-grid-1',
            tags: ['grid', 'personal']
        });

        // Create page entry
        const page = await Page.create({
            title: 'Personal Photography Page',
            description: 'A page showcasing personal photography',
            identifier: 'personal-photography-page', // identifier 
            components: [
                galleryHeroVert._id,
                typeIntro._id,
                repeaterMenu._id,
                galleryBanner._id,
                galleryGrid._id
            ],
            componentsModel: [
                'GalleryHeroVert',
                'TypeIntro',
                'RepeaterMenu',
                'GalleryBanner',
                'GalleryGrid'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Page seeded successfully:', page);
        mongoose.disconnect();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.disconnect();
    }
};

seedPage();