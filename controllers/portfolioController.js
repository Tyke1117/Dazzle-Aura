const Portfolio = require('../models/Portfolio');

exports.getPortfolio = async (req, res) => {
    try {
        const items = await Portfolio.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addPortfolioItem = async (req, res) => {
    try {
        const { imageUrl, caption, category } = req.body;
        const newItem = await Portfolio.create({ imageUrl, caption, category });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePortfolioItem = async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
