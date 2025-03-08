// filepath: /c:/Users/julia/Desktop/EstateAgency/routes/admin.js
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const express = require('express');
const router = express.Router();



// Ruta para el dashboard del administrador
router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});



module.exports = router;  