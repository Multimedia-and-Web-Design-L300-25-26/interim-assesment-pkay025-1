const express = require('express');
const { body } = require('express-validator');
const { getAllCryptos, getGainers, getNew, addCrypto } = require('../controllers/cryptoController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all cryptos
router.get('/', getAllCryptos);

// Get top gainers
router.get('/gainers', getGainers);

// Get new listings
router.get('/new', getNew);

// Add new crypto (protected - optional)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('symbol').trim().notEmpty().withMessage('Symbol is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('image').trim().optional(),
    body('change24h').isFloat().optional(),
  ],
  addCrypto
);

module.exports = router;
