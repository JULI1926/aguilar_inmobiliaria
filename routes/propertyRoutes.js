const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/', propertyController.renderIndexPage);
router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getProperty);

// Ruta protegida para el panel de administración
router.get('/admin', ensureAdmin, (req, res) => {
  res.render('admin', { user: req.user });
});

module.exports = router;