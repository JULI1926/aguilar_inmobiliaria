require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('./config/passport');
const flash = require('connect-flash');

const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const indexRoutes = require('./routes/indexRoutes');
const methodOverride = require('method-override');


const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto proporcionado por Heroku o 3000 por defecto

// Seleccionar la URL de la base de datos según el entorno
const env = process.env.NODE_ENV || 'development';
const databaseUrl = env === 'production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV;

let sequelize;
if (env === 'production') {
  // Configurar Sequelize para usar PostgreSQL en producción
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Configurar Sequelize para usar SQLite en desarrollo y prueba
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databaseUrl.split('sqlite://')[1]
  });
}

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
app.use(methodOverride('_method'));

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