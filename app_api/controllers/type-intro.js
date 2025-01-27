const TypeIntro = require('../models/type-intro');

// GET all type-intro components
const getAllTypeIntro = async (req, res) => {
    try {
        const typeIntros = await TypeIntro.find();
        res.status(200).json(typeIntros);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET type-intro by ID
const getTypeIntroById = async (req, res) => {
    try {
        const typeIntro = await TypeIntro.findById(req.params.id);
        if (!typeIntro) {
            return res.status(404).json({ message: 'TypeIntro not found' });
        }
        res.status(200).json(typeIntro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE type-intro
const updateTypeIntro = async (req, res) => {
    try {
        const typeIntro = await TypeIntro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!typeIntro) {
            return res.status(404).json({ message: 'TypeIntro not found' });
        }
        res.status(200).json(typeIntro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllTypeIntro,
    getTypeIntroById,
    updateTypeIntro
};