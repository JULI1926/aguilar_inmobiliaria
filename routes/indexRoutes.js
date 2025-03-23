const express = require('express');
const propertyController = require('../controllers/propertyController');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', propertyController.renderIndexPage);

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
  
router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getProperty);


// Ruta para obtener propiedades filtradas
router.get('/filter', propertyController.filterProperties);

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

// Manejo del formulario de contacto
router.post('/contact', contactController.handleContactForm);

router.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy');
});

module.exports = router;