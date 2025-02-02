const pageService = require('../services/pageService');

const landingPageIdentifier = 'personal-photography-page'; // Select page file

/* GET landing page */
const landingPage = async function(req, res, next) {
    try {
        const page = await pageService.getPageData(landingPageIdentifier);

        if (!page) {
            return res.status(404).render('pages/common/error', { message: 'Page not found', error: { status: 404 } });
        }

        const components = page.components.reduce((acc, component) => {
            switch (component.kind) {
                case 'GalleryHeroVert':
                    acc.galleryHeroVert = component;
                    break;
                case 'TypeIntro':
                    acc.typeIntro = component;
                    break;
                case 'RepeaterMenu':
                    acc.repeaterMenu = component;
                    break;
                case 'GalleryBanner':
                    acc.galleryBanner = component;
                    break;
                case 'GalleryGrid':
                    acc.galleryGrid = component;
                    break;
                default:
                    break;
            }
            return acc;
        }, {});

        res.render('pages/common/landing', {
            layout: 'layout-landing',
            title: page.title,
            description: page.description,
            ...components
        });
    } catch (err) {
        console.error('Landing Page Error:', err);
        res.status(500).render('pages/common/error', { message: 'Internal Server Error', error: { status: 500 } });
    }
};

module.exports = {
    landingPage
};