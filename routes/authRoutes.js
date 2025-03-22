const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', (req, res) => {
  res.render('admin/login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/auth/login');
    });
});

// Ruta para mostrar el formulario de recuperación de contraseña
router.get('/forgot-password', (req, res) => {
  res.render('admin/forgotPassword', {message: ''}); // Renderiza la vista forgotPassword.ejs
});

// Ruta para procesar la solicitud de recuperación de contraseña
router.post('/forgot-password', userController.forgotPassword);

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  res.render('auth/resetPassword', { token }); // Renderiza la vista resetPassword.ejs con el token
});

// Ruta para procesar el restablecimiento de contraseña
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;