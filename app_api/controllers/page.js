const Page = require('../models/page');
const TypeIntro = require('../models/type-intro');

// GET all pages
const getAllPages = async (req, res) => {
    try {
        const pages = await Page.find().populate('components');
        res.status(200).json(pages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET page by ID
const getPageById = async (req, res) => {
    const userRole = req.user?.role || 'admin'; // TODO: FIX when rba is implemented

    let populateOptions;
    if (userRole === 'admin') {
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image'
            }
        };
    } else {
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
                select: 'path alt title description' // Select only necessary fields
            }
        };
    }

    try {
        const page = await Page.findById(req.params.id).populate(populateOptions);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET page by identifier
const getPageByIdentifier = async (req, res) => {
    const userRole = req.user?.role || 'admin'; // TODO: FIX when rba is implemented

    let populateOptions;
    if (userRole === 'admin') {
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image'
            }
        };
    } else {
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
                select: 'path alt title description' // Select only necessary fields
            }
        };
    }

    try {
        const page = await Page.findOne({ identifier: req.params.identifier }).populate(populateOptions);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new page
const createPage = async (req, res) => {
    const page = new Page(req.body);
    try {
        const newPage = await page.save();
        res.status(201).json(newPage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a page
const updatePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        console.error('Error updating page:', err); // Add this line to log the error
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a page by identifier
const updatePageByIdentifier = async (req, res) => {
    try {
        const page = await Page.findOneAndUpdate({ identifier: req.params.identifier }, req.body, { new: true });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        console.error('Error updating page by identifier:', err); 
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a specific component
const updateComponent = async (req, res) => {
    const { componentId, componentType } = req.params;
    let ComponentModel;

    switch (componentType) {
        case 'TypeIntro':
            ComponentModel = TypeIntro;
            break;
        // Add other component types here
        default:
            return res.status(400).json({ message: 'Invalid component type' });
    }

    try {
        const component = await ComponentModel.findByIdAndUpdate(componentId, req.body, { new: true });
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json(component);
    } catch (err) {
        console.error('Error updating component:', err);
        res.status(400).json({ message: err.message });
    }
};

// DELETE a page
const deletePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json({ message: 'Page deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPages,
    getPageById,
    getPageByIdentifier,
    createPage,
    updatePage,
    updatePageByIdentifier,
    updateComponent,
    deletePage
};