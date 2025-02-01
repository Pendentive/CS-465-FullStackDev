const galleryHeroVertEndpoint = 'http://localhost:3000/api/gallery-hero-vert';
const typeIntroEndpoint = 'http://localhost:3000/api/type-intro';
const galleryGridEndpoint = 'http://localhost:3000/api/gallery-grid';
const galleryBannerEndpoint = 'http://localhost:3000/api/gallery-banner';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};

/* GET portfolio view */
const portfolioPersonal = async function(req, res, next) {
    try {
        const [galleryHeroVertResponse, typeIntroResponse, galleryGridResponse, galleryBannerResponse] = await Promise.all([
            fetch(galleryHeroVertEndpoint, options),
            fetch(typeIntroEndpoint, options),
            fetch(galleryGridEndpoint, options),
            fetch(galleryBannerEndpoint, options)
        ]);

        const galleryHeroVerts = await galleryHeroVertResponse.json();
        const typeIntros = await typeIntroResponse.json();
        const galleryGrids = await galleryGridResponse.json();
        const galleryBanners = await galleryBannerResponse.json();

        const galleryHeroVertData = galleryHeroVerts[0]; // Assuming you want the first gallery hero vert
        const typeIntroData = typeIntros[0]; // Assuming you want the first type intro
        const galleryGridData = galleryGrids[0]; // Assuming you want the first gallery grid
        const galleryBannerData = galleryBanners[0]; // Assuming you want the first gallery banner

        let message = null; // Initialize the message variable

        res.render('pages/portfolio/personal', {
            layout: 'layout-portfolio',
            title: 'Personal Photography',
            galleryHeroVertImages: galleryHeroVertData.images,
            galleryHeroVertPadding: galleryHeroVertData.padding,
            galleryHeroVertWidth: galleryHeroVertData.width,
            galleryHeroVertHeight: galleryHeroVertData.height,
            typeIntro: {
                title: typeIntroData.title,
                description: typeIntroData.description,
                leftPadding: typeIntroData.leftPadding,
                width: typeIntroData.width,
                height: typeIntroData.height
            },
            galleryGridImages: galleryGridData.images,
            galleryBannerImages: galleryBannerData.images,
            galleryBannerPhotoEdgeLength: galleryBannerData.photoEdgeLength,
            galleryBannerBarHeight: galleryBannerData.barHeight,
            message // Pass the message variable to the view
        });
    } catch (err) {
        console.error('Portfolio Error:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    portfolioPersonal
};