// routers/shiftRoute.js
const express = require('express');
const router = express.Router();
const shiftController = require('../Controllers/shiftController');

router.post('/addWorkplace', shiftController.addWorkplace);
router.post('/addShift', shiftController.addShift);
router.put('/updat', shiftController.updateShift)
router.delete('/delete', shiftController.deleteShift);

module.exports = router;
