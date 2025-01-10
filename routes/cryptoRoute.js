const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

// Route to get available routes
router.get("/", cryptoController.getRoutes);

// Route to get cryptocurrency stats
router.get("/stats", cryptoController.getStats);

// Route to calculate deviation in data
router.get("/deviation", cryptoController.getDeviation);

module.exports = router;
