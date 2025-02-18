// filepath: /c:/Users/julia/Desktop/EstateAgency/routes/admin.js
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const propertyController = require('../controllers/propertyController');


// Ruta para el dashboard del administrador
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Ruta para crear una propiedad
router.get('/create-property', ensureAdmin, (req, res) => {
    res.render('admin/create-property');
  });
router.post('/admin/create-property', ensureAdmin, upload.single('img'), propertyController.createProperty);
  

module.exports = router;