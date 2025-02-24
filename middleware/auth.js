module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },
  ensureAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
      res.locals.user = req.user; // Agregar el usuario a res.locals
      return next();
    }
    res.redirect('/auth/login');
  }
};