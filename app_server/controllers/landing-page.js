const pageService = require('../services/pageService');

const landingPageIdentifier = 'personal-photography-page'; // Set Page

/* GET landing page */
const landingPage = async function(req, res, next) {
    try {
        const page = await pageService.getPageData(landingPageIdentifier);

        if (!page) {
            return res.status(404).render('pages/common/error', { message: 'Page not found', error: { status: 404 } });
        }

        const components = pageService.processPageComponents(page);

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