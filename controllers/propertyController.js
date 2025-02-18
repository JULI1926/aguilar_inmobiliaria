const { Property } = require('../models');
const path = require('path');
const fs = require('fs');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' } });

    // Obtener valores únicos de department, city y neighborhood
    const departments = [...new Set(properties.map(property => property.department))];
    const cities = [...new Set(properties.map(property => property.city))];
    const neighborhoods = [...new Set(properties.map(property => property.neighborhood))];

    res.render('index', { properties, departments, cities, neighborhoods });
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Error fetching properties');
  }
};

const renderIndexPage = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' } });

    // Obtener valores únicos de department, city y neighborhood
    const departments = [...new Set(properties.map(property => property.department))];
    const cities = [...new Set(properties.map(property => property.city))];
    const neighborhoods = [...new Set(properties.map(property => property.neighborhood))];

    res.render('index', { properties, departments, cities, neighborhoods });
  } catch (err) {
    console.error('Error rendering index page:', err);
    res.status(500).send('Error rendering index page');    
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (property) {
      res.render('property-single', { property });
    } else {
      res.status(404).send('Property not found');
    }
  } catch (err) {
    console.error('Error fetching property:', err);
    res.status(500).send('Error fetching property');
  }
};

const createProperty = async (req, res) => {
  try {
    const { saleRent, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description } = req.body;
    const img = req.file;

    // Guardar la imagen en la carpeta public/assets/img/properties
    const imgPath = path.join(__dirname, '../public/assets/img/properties', img.originalname);
    fs.writeFileSync(imgPath, img.buffer);

    const newProperty = await Property.create({
      img: `assets/img/properties/${img.originalname}`,
      saleRent,
      address,
      area,
      rooms,
      bathrooms,
      garage,
      department,
      city,
      neighborhood,
      status,
      ownerId,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.redirect('/');
  } catch (err) {
    console.error('Error creating property:', err);
    res.status(500).send('Error creating property');
  }
};

const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const [updated] = await Property.update(req.body, {
      where: { id: propertyId }
    });
    if (updated) {
      const updatedProperty = await Property.findByPk(propertyId);
      res.status(200).json(updatedProperty);
    } else {
      res.status(404).send('Property not found');
    }
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).send('Error updating property');
  }
};

module.exports = {
    getProperties,
    renderIndexPage,
    getProperty,
    updateProperty,
    createProperty,
};