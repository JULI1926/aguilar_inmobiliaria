const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config();

const passport = require('./config/passport');
const flash = require('connect-flash');

const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const indexRoutes = require('./routes/indexRoutes');

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto proporcionado por Heroku o 3000 por defecto

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar sesiones
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 horas (en milisegundos)
  }
}));

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar connect-flash
app.use(flash());

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta 'assets'
app.use(express.static(path.join(__dirname, 'assets')));

// Servir archivos estáticos específicos para la ruta '/admin'
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Usar las rutas definidas en propertyRoutes
app.use('/', indexRoutes); // Usa las rutas de la página de inicio
app.use('/admin', propertyRoutes);
app.use('/admin', adminRoutes);
app.use('/admin', ownerRoutes);
app.use('/auth', authRoutes); // Usar las rutas de autenticación

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});