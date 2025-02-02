const pageService = require('../services/pageService');

const personalPageIdentifier = 'page-portfolio-personal'; // Set page

/* GET personal portfolio page */
const portfolioPersonal = async function(req, res, next) {
    try {
        const page = await pageService.getPageData(personalPageIdentifier);

        if (!page) {
            return res.status(404).render('pages/common/error', { message: 'Page not found', error: { status: 404 } });
        }

        const components = pageService.processPageComponents(page);

        res.render('pages/portfolio/personal', {
            layout: 'layout-portfolio',
            title: page.title,
            description: page.description,
            ...components
        });
    } catch (err) {
        console.error('Portfolio Personal Page Error:', err);
        res.status(500).render('pages/common/error', { message: 'Internal Server Error', error: { status: 500 } });
    }
};

module.exports = {
    portfolioPersonal
};