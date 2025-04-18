const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const multer = require('multer');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const path = require('path');

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
router.get('/create-property', ensureAdmin, propertyController.createPropertyForm);
router.post('/create-property', ensureAdmin, upload.array('img', 30), propertyController.createProperty);

// Ruta para listar propiedades activas y seleccionar una para editar
router.get('/list-properties', ensureAdmin, propertyController.listProperties);

// Ruta para mostrar el formulario de edición de una propiedad
router.get('/edit-property/:id', ensureAdmin, propertyController.editPropertyForm);

// Ruta para editar una propiedad
router.post('/edit-property/:id', ensureAdmin, upload.array('img', 30), propertyController.editProperty);

// Middleware para listar rutas
router.get('/routes', (req, res) => {
    const routes = router.stack
        .filter(r => r.route) // Filtra solo las rutas definidas
        .map(r => ({
            method: Object.keys(r.route.methods)[0].toUpperCase(),
            path: r.route.path
        }));
    res.json(routes);
});

module.exports = router;