const express = require('express');
const router = express.Router();
const wagesController = require('../Controllers/wagesController');

// נתיב לחישוב השכר
router.post('/calculate', wagesController.calculateWages);

module.exports = router;
