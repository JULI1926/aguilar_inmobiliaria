const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// // Ruta para crear una propiedad
// router.get('/property/create', ensureAdmin, (req, res) => {
//   res.render('admin/create-property');
// });
// router.post('/property/create', ensureAdmin, upload.single('img'), propertyController.createProperty);


router.get('/', propertyController.renderIndexPage);
router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getProperty);

// Ruta para actualizar una propiedad
router.put('/property/:id', propertyController.updateProperty);

// Ruta para obtener propiedades filtradas
router.get('/filter', propertyController.filterProperties);

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;