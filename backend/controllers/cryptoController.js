const { validationResult } = require('express-validator');
const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cryptos', error: err.message });
  }
};

exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $ne: null } }).sort({ change24h: -1 });
    res.json(gainers);
  } catch (err) {
    console.error('Error fetching gainers:', err.message);
    res.status(500).json({ message: 'Error fetching gainers', error: err.message });
  }
};

exports.getNew = async (req, res) => {
  try {
    // Fetch custom cryptos sorted by newest
    const data = await Crypto.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching new cryptos', error: err.message });
  }
};

exports.addCrypto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, symbol, price, image, change24h } = req.body;

    // Check if crypto already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(400).json({ message: 'Cryptocurrency already exists' });
    }

    const crypto = new Crypto({
      name,
      symbol: symbol.toUpperCase(),
      price,
      image,
      change24h,
    });

    await crypto.save();
    res.status(201).json({ message: 'Crypto added successfully', crypto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding crypto', error: err.message });
  }
};
