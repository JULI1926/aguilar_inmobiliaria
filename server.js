const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//const { Property } = require('./models');
const propertyController = require('./controllers/propertyController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
// Ruta para la página principal
app.get('/', propertyController.renderIndexPage);

// Ruta para obtener todas las propiedades
app.get('/properties', propertyController.getProperties);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});