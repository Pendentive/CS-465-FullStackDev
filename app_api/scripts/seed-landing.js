const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedImages } = require('./seed-utils');
const GalleryHeroVert = require('../models/gallery-hero-vert');
const TypeIntro = require('../models/type-intro');
const RepeaterMenu = require('../models/repeater-menu');
const GalleryBanner = require('../models/gallery-banner');
const Page = require('../models/page');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Connect to the database
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

const galleryPath = path.join(__dirname, '../../public/images/portfolio/personal');
const photoFiles = fs.readdirSync(galleryPath);

const photos = photoFiles.slice(0, 20).map((filename, index) => ({
    filename,
    title: `Photo ${index + 1}`,
    alt: `Landing page photo ${index + 1}`,
    description: `Landing page gallery photo ${index + 1}`,
    path: `/images/portfolio/personal/${filename}`,
    category: 'landing'
}));

const seedLandingPage = async () => {
    try {
        // Seed images
        const createdImages = await seedImages(photos, 'landing');

        // Create gallery-hero-vert with images
        const galleryHeroVert = await GalleryHeroVert.create({
            title: 'Hero Vertical Gallery',
            description: 'Collection of vertical photographs',
            images: createdImages.slice(0, 6).map(img => img._id),
            padding: 10,
            width: 450,
            height: 950,
            identifier: 'gallery-hero-vert-landing',
            tags: ['hero', 'vertical']
        });

        // Create type-intro
        const typeIntro = await TypeIntro.create({
            title: 'Defining Moments',
            description: 'The steps of your first child, the final year of high school, and the grand opening of your business are moments that define our lives.<br><br>Studio Custer isn\'t just about taking great photos, we want to see genuine smiles and really dig into why each moment is unique.<br><br>We capture your Defining Moments.',
            leftPadding: 50,
            width: 800,
            height: 300,
            identifier: 'type-intro-landing',
            tags: ['intro', 'defining moments']
        });

        // Create repeater-menu with menu-cards
        const menuCardTitles = ['Personal', 'Commercial', 'Full Service', 'About'];
        const menuCardButtonTitles = ['Gallery', 'Gallery', 'Gallery', 'About Us'];
        const menuCardRoutes = ['/personal', '/commercial', '/full-service', '/about']; // Set routes
        const menuCards = createdImages.slice(6, 10).map((image, index) => ({
            title: menuCardTitles[index], // Set titles
            image: image._id,
            route: menuCardRoutes[index], // Set routes
            buttonTitle: menuCardButtonTitles[index] // Set button titles
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
            identifier: 'repeater-menu-landing',
            tags: ['menu', 'repeater']
        });

        // Create gallery-banner with images
        const galleryBanner = await GalleryBanner.create({
            title: 'Banner Gallery',
            description: 'Collection of banner photographs',
            images: createdImages.slice(10, 25).map(img => img._id),
            photoEdgeLength: 200,
            barHeight: 6,
            identifier: 'gallery-banner-landing',
            tags: ['banner', 'gallery']
        });

        // Create page entry
        const page = await Page.create({
            title: 'Landing Page',
            description: 'A page showcasing landing content',
            identifier: 'page-landing',
            components: [
                galleryHeroVert._id,
                typeIntro._id,
                repeaterMenu._id,
                galleryBanner._id
            ],
            componentsModel: [
                'GalleryHeroVert',
                'TypeIntro',
                'RepeaterMenu',
                'GalleryBanner'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Landing page seeded successfully:', page);
        mongoose.disconnect();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.disconnect();
    }
};

seedLandingPage();