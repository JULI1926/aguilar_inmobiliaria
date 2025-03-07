const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { ensureAdmin } = require('../middleware/auth');

// Ruta para crear un propietario
router.get('/create-owner', ensureAdmin, ownerController.showCreateForm);
router.post('/create-owner', ensureAdmin, ownerController.createOwner);

// Ruta para listar propietarios
router.get('/list-owners', ensureAdmin, ownerController.listOwners);

module.exports = router;