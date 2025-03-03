// filepath: /c:/Users/julia/Desktop/EstateAgency/routes/admin.js
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const path = require('path');


// Ruta para el dashboard del administrador
router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/assets/img/properties'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para crear una propiedad
router.get('/create-property', ensureAdmin, (req, res) => {
    res.render('admin/create-property');    
});
router.post('/create-property', ensureAdmin, upload.array('img', 10), propertyController.createProperty);

// Ruta para listar propiedades activas y seleccionar una para editar
router.get('/list-properties', ensureAdmin, propertyController.listProperties);  

module.exports = router;