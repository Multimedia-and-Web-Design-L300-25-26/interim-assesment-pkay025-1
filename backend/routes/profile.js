const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get profile (protected)
router.get('/', auth, getProfile);

// Update profile (protected)
router.put('/', auth, updateProfile);

module.exports = router;
