// filepath: /c:/Users/julia/Desktop/EstateAgency/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getProperty);
router.get('/', propertyController.renderIndexPage);

module.exports = router;