const RepeaterMenu = require('../models/repeater-menu');

// GET all repeater-menu components
const getAllRepeaterMenu = async (req, res) => {
    try {
        const repeaterMenus = await RepeaterMenu.find().populate('menuCards.image');
        res.status(200).json(repeaterMenus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET repeater-menu by ID
const getRepeaterMenuById = async (req, res) => {
    try {
        const repeaterMenu = await RepeaterMenu.findById(req.params.id).populate('menuCards.image');
        if (!repeaterMenu) {
            return res.status(404).json({ message: 'RepeaterMenu not found' });
        }
        res.status(200).json(repeaterMenu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRepeaterMenu,
    getRepeaterMenuById
};