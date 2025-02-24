// filepath: /c:/Users/julia/Desktop/EstateAgency/routes/admin.js
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const propertyController = require('../controllers/propertyController');


// Ruta para el dashboard del administrador
router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Ruta para crear una propiedad
router.get('/create-property', ensureAdmin, (req, res) => {
    res.render('admin/create-property');    
});
router.post('/create-property', ensureAdmin, upload.single('img'), propertyController.createProperty);

// Ruta para listar propiedades activas y seleccionar una para editar
router.get('/list-properties', ensureAdmin, propertyController.listProperties);  

module.exports = router;