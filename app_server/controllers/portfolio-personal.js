const galleryGridEndpoint = 'http://localhost:3000/api/gallery-grid';
const galleryHeroVertEndpoint = 'http://localhost:3000/api/gallery-hero-vert';
const galleryBannerEndpoint = 'http://localhost:3000/api/gallery-banner';
const typeIntroEndpoint = 'http://localhost:3000/api/type-intro';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};

/* GET portfolio view */
const portfolioPersonal = async function(req, res, next) {
    try {
        const [galleryGridResponse, galleryHeroVertResponse, galleryBannerResponse, typeIntroResponse] = await Promise.all([
            fetch(galleryGridEndpoint, options),
            fetch(galleryHeroVertEndpoint, options),
            fetch(galleryBannerEndpoint, options),
            fetch(typeIntroEndpoint, options)
        ]);

        const galleryGrids = await galleryGridResponse.json();
        const galleryHeroVerts = await galleryHeroVertResponse.json();
        const galleryBanners = await galleryBannerResponse.json();
        const typeIntros = await typeIntroResponse.json();

        let message = null;
        if (!(galleryGrids instanceof Array)) {
            message = 'API lookup error';
            galleryGrids = [];
        } else {
            if (!galleryGrids.length) {
                message = 'No galleries exist in our database!';
            }
        }

        const galleryGridData = galleryGrids[0]; // Assuming you want the first gallery grid
        const galleryHeroVertData = galleryHeroVerts[0]; // Assuming you want the first gallery hero vert
        const galleryBannerData = galleryBanners[0]; // Assuming you want the first gallery banner
        const typeIntroData = typeIntros[0]; // Assuming you want the first type intro

        res.render('pages/portfolio/personal', {
            layout: 'layout-portfolio',
            title: 'Personal Photography',
            galleryImages: galleryGridData.images,
            galleryHeroVertPadding: galleryHeroVertData.padding,
            galleryHeroVertWidth: galleryHeroVertData.width,
            galleryHeroVertHeight: galleryHeroVertData.height,
            galleryBannerPhotoEdgeLength: galleryBannerData.photoEdgeLength,
            galleryBannerBarHeight: galleryBannerData.barHeight,
            typeIntro: {
                title: typeIntroData.title,
                description: typeIntroData.description,
                leftPadding: typeIntroData.leftPadding,
                width: typeIntroData.width,
                height: typeIntroData.height
            },
            message
        });
    } catch (err) {
        console.error('Portfolio Error:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    portfolioPersonal
};