const galleriesEndpoint = 'http://localhost:3000/api/galleries';
const galleryHeroVertEndpoint = 'http://localhost:3000/api/gallery-hero-vert';
const galleryBannerEndpoint = 'http://localhost:3000/api/gallery-banner';
const repeaterMenuEndpoint = 'http://localhost:3000/api/repeater-menu';
const typeIntroEndpoint = 'http://localhost:3000/api/type-intro';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};

/* GET landing page */
const landingPage = async function(req, res, next) {
    try {
        const [galleriesResponse, galleryHeroVertResponse, galleryBannerResponse, repeaterMenuResponse, typeIntroResponse] = await Promise.all([
            fetch(galleriesEndpoint, options),
            fetch(galleryHeroVertEndpoint, options),
            fetch(galleryBannerEndpoint, options),
            fetch(repeaterMenuEndpoint, options),
            fetch(typeIntroEndpoint, options)
        ]);

        const galleries = await galleriesResponse.json();
        const galleryHeroVerts = await galleryHeroVertResponse.json();
        const galleryBanners = await galleryBannerResponse.json();
        const repeaterMenus = await repeaterMenuResponse.json();
        const typeIntros = await typeIntroResponse.json();

        let message = null;
        if (!(galleries instanceof Array)) {
            message = 'API lookup error';
            galleries = [];
        } else {
            if (!galleries.length) {
                message = 'No galleries exist in our database!';
            }
        }

        const galleryData = galleries[0]; // Assuming you want the first gallery
        const galleryHeroVertData = galleryHeroVerts[0]; // Assuming you want the first gallery hero vert
        const galleryBannerData = galleryBanners[0]; // Assuming you want the first gallery banner
        const repeaterMenuData = repeaterMenus[0]; // Assuming you want the first repeater menu
        const typeIntroData = typeIntros[0]; // Assuming you want the first type intro

        res.render('pages/common/landing', {
            layout: 'layout-landing',
            title: 'Welcome to Studio Custer',
            galleryImages: galleryData.images,
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
            message
        });
    } catch (err) {
        console.error('Landing Page Error:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    landingPage
};