const apiUrl = 'http://localhost:3000/api/pages';

const getPageData = async (identifier) => {
    try {
        const response = await fetch(`${apiUrl}/identifier/${identifier}`);
        if (!response.ok) {
            throw new Error('Failed to fetch page data');
        }
        const page = await response.json();
        return page;
    } catch (err) {
        console.error('Error fetching page data:', err);
        throw err;
    }
};

const processPageComponents = (page) => {
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
    return components;
};

module.exports = {
    getPageData,
    processPageComponents
};