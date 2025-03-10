const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Asegúrate de tener un modelo User

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Especifica que el campo de autenticación es 'email'
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      console.log(`Attempting to authenticate user with email: ${email}`);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('Usuario Incorrecto.');
        return done(null, false, { message: 'Usuario Incorrecto.' });
      }
      console.log(`User found: ${JSON.stringify(user)}`);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Contraseña Incorrecta.');
        return done(null, false, { message: 'Contraseña Incorrecta.' });
      }
      console.log('Authentication successful.');
      return done(null, user);
    } catch (err) {
      console.error('Error during authentication:', err);
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;