const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String },
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
