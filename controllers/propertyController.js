const { Property, PropertyImage } = require('../models');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: PropertyImage,
        as: 'PropertyImages'
      }]
    });

    // Obtener valores únicos de department, city y neighborhood
    const departments = await Property.findAll({
      attributes: ['department', [Sequelize.fn('COUNT', Sequelize.col('department')), 'count']],
      group: ['department']
    });
    const cities = await Property.findAll({
      attributes: ['city', 'department', [Sequelize.fn('COUNT', Sequelize.col('city')), 'count']],
      group: ['city', 'department']
    });
    const neighborhoods = await Property.findAll({
      attributes: ['neighborhood', 'city', 'department', [Sequelize.fn('COUNT', Sequelize.col('neighborhood')), 'count']],
      group: ['neighborhood', 'city', 'department']
    });

    // Mapear propiedades para incluir solo la primera URL de imagen
    const propertiesWithImages = properties.map(property => {
      const image = property.PropertyImages.length > 0 ? `/img/properties/${property.PropertyImages[0].img}` : null;
      console.log(`Property ID: ${property.id}, Image URL: ${image}`);
      return {
        ...property.dataValues,
        image
      };
    });

    res.render('index', {
      properties: propertiesWithImages,
      departments: departments.map(d => ({ name: d.department, count: d.dataValues.count })),
      cities: cities.map(c => ({ name: c.city, department: c.department, count: c.dataValues.count })),
      neighborhoods: neighborhoods.map(n => ({ name: n.neighborhood, city: n.city, department: n.department, count: n.dataValues.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const renderIndexPage = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: PropertyImage,
        as: 'images',
        attributes: ['img']
      }]
    });

    const departments = await Property.findAll({
      attributes: ['department', [Sequelize.fn('COUNT', Sequelize.col('department')), 'count']],
      group: ['department']
    });

    const cities = await Property.findAll({
      attributes: ['city', 'department', [Sequelize.fn('COUNT', Sequelize.col('city')), 'count']],
      group: ['city', 'department']
    });

    const neighborhoods = await Property.findAll({
      attributes: ['neighborhood', 'city', 'department', [Sequelize.fn('COUNT', Sequelize.col('neighborhood')), 'count']],
      group: ['neighborhood', 'city', 'department']
    });

    res.render('index', { properties, departments, cities, neighborhoods });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    const baseUrl = '/';
    if (property) {
      res.render('property-single', { property, baseUrl });
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
    const property = await Property.create({
      saleRent, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description
    });

    if (req.files && req.files.img) {
      let images = req.files.img;
      const imagePaths = [];

      if (!Array.isArray(images)) {
        images = [images];
      }

      images.forEach((image) => {
        const imagePath = `assets/img/properties/${image.name}`;
        image.mv(path.join(__dirname, '..', 'public', imagePath));
        imagePaths.push(imagePath);
      });

      await Promise.all(imagePaths.map(img => PropertyImage.create({ propertyId: property.id, img })));
    }

    res.redirect('/admin/properties');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const filterProperties = async (req, res) => {
  try {
    const { search } = req.query;
    let where = {};

    if (search && search !== 'all') {
      where = {
        [Sequelize.Op.or]: [
          { neighborhood: { [Sequelize.Op.like]: `%${search}%` } },
          { city: { [Sequelize.Op.like]: `%${search}%` } },
          { department: { [Sequelize.Op.like]: `%${search}%` } }
        ]
      };
    }

    const properties = await Property.findAll({ where });

    // Obtener valores únicos de department, city y neighborhood
    const departments = await Property.findAll({
      attributes: ['department', [Sequelize.fn('COUNT', Sequelize.col('department')), 'count']],
      group: ['department']
    });
    const cities = await Property.findAll({
      attributes: ['city', 'department', [Sequelize.fn('COUNT', Sequelize.col('city')), 'count']],
      group: ['city', 'department']
    });
    const neighborhoods = await Property.findAll({
      attributes: ['neighborhood', 'city', 'department', [Sequelize.fn('COUNT', Sequelize.col('neighborhood')), 'count']],
      group: ['neighborhood', 'city', 'department']
    });

    res.render('index', {
      properties,
      departments: departments.map(d => ({ name: d.department, count: d.dataValues.count })),
      cities: cities.map(c => ({ name: c.city, department: c.department, count: c.dataValues.count })),
      neighborhoods: neighborhoods.map(n => ({ name: n.neighborhood, city: n.city, department: n.department, count: n.dataValues.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const listProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' }, raw: true });   

    res.render('admin/list-properties', { properties });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const updateProperty = async (req, res) => {
  try {
    const { saleRent, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description } = req.body;
    const img = req.file ? req.file.filename : null;

    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).send('Property not found');
    }

    property.saleRent = saleRent;
    property.address = address;
    property.area = area;
    property.rooms = rooms;
    property.bathrooms = bathrooms;
    property.garage = garage;
    property.department = department;
    property.city = city;
    property.neighborhood = neighborhood;
    property.status = status;
    property.ownerId = ownerId;
    property.description = description;
    if (img) {
      property.img = img;
    }

    await property.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProperties,
  renderIndexPage,
  getProperty,
  updateProperty,
  createProperty,
  filterProperties,
  listProperties,
};