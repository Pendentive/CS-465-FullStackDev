const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedImages } = require('./seed-utils');
const GalleryHeroVert = require('../models/page-components/gallery-hero-vert');
const TypeIntro = require('../models/page-components/type-intro');
const GalleryGrid = require('../models/page-components/gallery-grid');
const GalleryBanner = require('../models/page-components/gallery-banner');
const Page = require('../models/page');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Connect to the database
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

const galleryPath = path.join(__dirname, '../../public/images/portfolio/personal');
const photoFiles = fs.readdirSync(galleryPath);

const photos = photoFiles.slice(20, 40).map((filename, index) => ({
    filename,
    title: `Photo ${index + 1}`,
    alt: `Personal portfolio photo ${index + 1}`,
    description: `Personal portfolio gallery photo ${index + 1}`,
    path: `/images/portfolio/personal/${filename}`,
    category: 'personal'
}));

const seedPersonalPortfolioPage = async () => {
    try {
        // Seed images
        const createdImages = await seedImages(photos, 'personal');

        // Create gallery-hero-vert with images
        const galleryHeroVert = await GalleryHeroVert.create({
            title: 'Hero Vertical Gallery',
            description: 'Collection of vertical photographs',
            images: createdImages.slice(0, 4).map(img => img._id),
            padding: 10,
            width: 600,
            height: 800,
            identifier: 'gallery-hero-vert-personal',
            tags: ['hero', 'vertical']
        });

        // Create type-intro
        const typeIntro = await TypeIntro.create({
            title: 'Personal',
            description: 'We come from a family of five children and are proud of it. The importance of memories and togetherness shared bring you all closer.<br><br>Whether it\'s your senior graduating, a new engagement, the birth of your newborn, or this year\'s family photos we\'d love to capture your moments.',
            leftPadding: 50,
            width: 800,
            height: 300,
            identifier: 'type-intro-personal',
            tags: ['intro', 'personal']
        });

        // Create gallery-grid with images
        const galleryGrid = await GalleryGrid.create({
            title: 'Personal Photography',
            description: 'Collection of personal photographs',
            images: createdImages.map(img => img._id),
            identifier: 'gallery-grid-personal',
            tags: ['grid', 'personal']
        });

        // Create gallery-banner with images
        const galleryBanner = await GalleryBanner.create({
            title: 'Banner Gallery',
            description: 'Collection of banner photographs',
            images: createdImages.slice(0, 15).map(img => img._id),
            photoEdgeLength: 200,
            barHeight: 6,
            identifier: 'gallery-banner-personal',
            tags: ['banner', 'gallery']
        });

        // Create page entry
        const page = await Page.create({
            title: 'Personal Portfolio Page',
            description: 'A page showcasing personal portfolio content',
            identifier: 'page-portfolio-personal',
            components: [
                galleryHeroVert._id,
                typeIntro._id,
                galleryGrid._id,
                galleryBanner._id
            ],
            componentsModel: [
                'GalleryHeroVert',
                'TypeIntro',
                'GalleryGrid',
                'GalleryBanner'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Personal portfolio page seeded successfully:', page);
        mongoose.disconnect();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.disconnect();
    }
};

seedPersonalPortfolioPage();