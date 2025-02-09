const GalleryHeroVert = require('../models/gallery-hero-vert');
const TypeIntro = require('../models/type-intro');
const GalleryGrid = require('../models/gallery-grid');
const GalleryBanner = require('../models/gallery-banner');
const RepeaterMenu = require('../models/repeater-menu');

const getComponentModel = (componentType) => {
    switch (componentType) {
        case 'GalleryHeroVert':
            return GalleryHeroVert;
        case 'TypeIntro':
            return TypeIntro;
        case 'GalleryGrid':
            return GalleryGrid;
        case 'GalleryBanner':
            return GalleryBanner;
        case 'RepeaterMenu':
            return RepeaterMenu;
        default:
            throw new Error('Invalid component type');
    }
};

const getAllComponents = async (req, res) => {
    const { componentType } = req.params;

    try {
        const ComponentModel = getComponentModel(componentType);
        const components = await ComponentModel.find({});
        res.status(200).json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getComponentById = async (req, res) => {
    const { componentType, id } = req.params;
    try {
        const ComponentModel = getComponentModel(componentType);
        let component;

        switch (componentType) {
            case 'GalleryHeroVert':
            case 'GalleryGrid':
            case 'GalleryBanner':
                component = await ComponentModel.findById(id).populate('images');
                break;
            case 'RepeaterMenu':
                component = await ComponentModel.findById(id).populate('menuCards.image');
                break;
            default:
                component = await ComponentModel.findById(id);
        }

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json(component);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateComponent = async (req, res) => {
    const { componentType, id } = req.params;

    try {
        const ComponentModel = getComponentModel(componentType);

        const component = await ComponentModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.status(200).json(component);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllComponents,
    getComponentById,
    updateComponent
};