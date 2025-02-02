const Image = require('../models/image');
const GalleryHeroVert = require('../models/gallery-hero-vert');
const TypeIntro = require('../models/type-intro');
const RepeaterMenu = require('../models/repeater-menu');
const GalleryBanner = require('../models/gallery-banner');
const GalleryGrid = require('../models/gallery-grid');
const Page = require('../models/page');
const BaseModel = require('../models/base');

const clearData = async (categories) => {
    console.log('Categories to clear:', categories); // Add logging

    const deletePromises = [];

    if (categories.includes('images')) {
        console.log('Deleting images'); // Add logging
        deletePromises.push(Image.deleteMany({}));
    }
    if (categories.includes('galleryHeroVert')) {
        console.log('Deleting galleryHeroVert'); // Add logging
        deletePromises.push(GalleryHeroVert.deleteMany({}));
    }
    if (categories.includes('typeIntro')) {
        console.log('Deleting typeIntro'); // Add logging
        deletePromises.push(TypeIntro.deleteMany({}));
    }
    if (categories.includes('repeaterMenu')) {
        console.log('Deleting repeaterMenu'); // Add logging
        deletePromises.push(RepeaterMenu.deleteMany({}));
    }
    if (categories.includes('galleryBanner')) {
        console.log('Deleting galleryBanner'); // Add logging
        deletePromises.push(GalleryBanner.deleteMany({}));
    }
    if (categories.includes('galleryGrid')) {
        console.log('Deleting galleryGrid'); // Add logging
        deletePromises.push(GalleryGrid.deleteMany({}));
    }
    if (categories.includes('pages')) {
        console.log('Deleting pages'); // Add logging
        deletePromises.push(Page.deleteMany({}));
    }
    if (categories.includes('baseModel')) {
        console.log('Deleting baseModel'); // Add logging
        deletePromises.push(BaseModel.deleteMany({}));
    }

    await Promise.all(deletePromises);
};

module.exports = {
    clearData
};