const Page = require('../models/page');
const TypeIntro = require('../models/page-components/type-intro');

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
    const user = req.user; // TODO: FIX when rba is implemented
    console.log('User:', user);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const userRole = user.role;
    const pageIdentifier = req.params.identifier;

    let populateOptions;
    if (userRole === 'admin') {
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
            }
        };
    } else if (userRole === 'editor') {             // TODO: Restrict Further
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
            }
        };
    } else if (userRole === 'express') {            // TODO: Restrict further
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
            }
        };
    } else {                                        // TODO: Restrict further
        populateOptions = {
            path: 'components',
            populate: {
                path: 'images menuCards.image',
                model: 'Image',
                select: 'path title'
            }
        };
    }

    try {
        let page;

        if (userRole === 'admin') {
            page = await Page.findOne({ identifier: pageIdentifier }).populate(populateOptions);
        } else if (userRole === 'express') {
            page = await Page.findOne({ identifier: pageIdentifier }).populate(populateOptions);
        } else if (userRole === 'editor') {
            // Editors can only access the portfolio-personal page
            if (pageIdentifier === 'page-portfolio-personal') {
                page = await Page.findOne({ identifier: pageIdentifier }).populate(populateOptions);
            } else {
                return res.status(403).json({ message: 'Forbidden: Editors can only access page-portfolio-personal' });
            }
        }
        else {
            return res.status(403).json({ message: 'Forbidden: Invalid Role' });
        }

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

// UPDATE a page by ID
const updatePageById = async (req, res) => {
    try {
        const page = await Page.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        console.error('Error updating page by ID:', err);
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a page by identifier
const updatePageByIdentifier = async (req, res) => {
    try {
        const page = await Page.findOneAndUpdate(
            { identifier: req.params.identifier }, 
            req.body, 
            { new: true}
        );
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (err) {
        console.error('Error updating page by identifier:', err);
        res.status(400).json({ message: err.message });
    }
};

// DELETE a page
const deletePage = async (req, res) => {
    try {
        await Page.deleteOne({ identifier: req.params.identifier });
        res.status(200).json({ message: 'Page deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPages,
    getPageById,
    getPageByIdentifier,
    createPage,
    updatePageById,
    updatePageByIdentifier,
    deletePage,
};