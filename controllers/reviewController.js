const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        
        const review = new Review({
            user: req.user._id,
            rating,
            comment
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).populate('user', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReview, getReviews };
