const express = require('express');
const router = express.Router();
const { getPortfolio, addPortfolioItem, deletePortfolioItem } = require('../controllers/portfolioController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getPortfolio);
router.post('/', protect, admin, addPortfolioItem);
router.delete('/:id', protect, admin, deletePortfolioItem);

module.exports = router;
