const galleryHeroVertEndpoint = 'http://localhost:3000/api/gallery-hero-vert';
const galleryBannerEndpoint = 'http://localhost:3000/api/gallery-banner';
const repeaterMenuEndpoint = 'http://localhost:3000/api/repeater-menu';
const typeIntroEndpoint = 'http://localhost:3000/api/type-intro';
const galleryGridEndpoint = 'http://localhost:3000/api/gallery-grid';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};

/* GET landing page */
const landingPage = async function(req, res, next) {
    try {
        const [galleryHeroVertResponse, galleryBannerResponse, repeaterMenuResponse, typeIntroResponse, galleryGridResponse] = await Promise.all([
            fetch(galleryHeroVertEndpoint, options),
            fetch(galleryBannerEndpoint, options),
            fetch(repeaterMenuEndpoint, options),
            fetch(typeIntroEndpoint, options),
            fetch(galleryGridEndpoint, options)
        ]);

        const galleryHeroVerts = await galleryHeroVertResponse.json();
        const galleryBanners = await galleryBannerResponse.json();
        const repeaterMenus = await repeaterMenuResponse.json();
        const typeIntros = await typeIntroResponse.json();
        const galleryGrids = await galleryGridResponse.json();

        const galleryHeroVertData = galleryHeroVerts[0]; // Assuming you want the first gallery hero vert
        const galleryBannerData = galleryBanners[0]; // Assuming you want the first gallery banner
        const repeaterMenuData = repeaterMenus[0]; // Assuming you want the first repeater menu
        const typeIntroData = typeIntros[0]; // Assuming you want the first type intro
        const galleryGridData = galleryGrids[0]; // Assuming you want the first gallery grid

        let message = null; // Initialize the message variable

        res.render('pages/common/landing', {
            layout: 'layout-landing',
            title: 'Welcome to Studio Custer',
            galleryHeroVertImages: galleryHeroVertData.images,
            galleryHeroVertPadding: galleryHeroVertData.padding,
            galleryHeroVertWidth: galleryHeroVertData.width,
            galleryHeroVertHeight: galleryHeroVertData.height,
            galleryBannerPhotoEdgeLength: galleryBannerData.photoEdgeLength,
            galleryBannerBarHeight: galleryBannerData.barHeight,
            menuCards: repeaterMenuData.menuCards,
            photoHeight: repeaterMenuData.photoHeight,
            photoWidth: repeaterMenuData.photoWidth,
            photoPaddingX: repeaterMenuData.photoPaddingX,
            photoPaddingY: repeaterMenuData.photoPaddingY,
            menuCardPaddingX: repeaterMenuData.menuCardPaddingX,
            typeIntro: {
                title: typeIntroData.title,
                description: typeIntroData.description,
                leftPadding: typeIntroData.leftPadding,
                width: typeIntroData.width,
                height: typeIntroData.height
            },
            message // Pass the message variable to the view
        });
    } catch (err) {
        console.error('Landing Page Error:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    landingPage
};