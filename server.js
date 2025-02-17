// filepath: [server.js](http://_vscodecontentref_/8)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas definidas en propertyRoutes
app.use('/', propertyRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});