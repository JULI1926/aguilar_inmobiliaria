const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

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

module.exports = router;