const { Property, PropertyImage, Owner } = require('../models');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY; // Asegúrate de tener tu clave de API de Google Maps en las variables de entorno

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: PropertyImage,
        as: 'images' // Cambia 'PropertyImages' a 'images'
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

    res.render('index', {
      properties,
      departments: departments.map(d => ({ department: d.department, count: d.dataValues.count })),
      cities: cities.map(c => ({ city: c.city, department: c.department, count: c.dataValues.count })),
      neighborhoods: neighborhoods.map(n => ({ neighborhood: n.neighborhood, city: n.city, department: n.department, count: n.dataValues.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const renderIndexPage = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: { status: 'active' },
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

    res.render('index', {
      properties,
      departments: departments.map(d => ({ department: d.department, count: d.dataValues.count })),
      cities: cities.map(c => ({ city: c.city, department: c.department, count: c.dataValues.count })),
      neighborhoods: neighborhoods.map(n => ({ neighborhood: n.neighborhood, city: n.city, department: n.department, count: n.dataValues.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [{
        model: PropertyImage,
        as: 'images',
        attributes: ['img']
      }]
    });
    const baseUrl = '/';
    if (property) {
      res.render('property-single', { property, baseUrl, googleMapsApiKey });
    } else {
      res.status(404).send('Property not found');
    }
  } catch (err) {
    console.error('Error fetching property:', err);
    res.status(500).send('Error fetching property');
  }
};

const listProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' }, raw: true });   

    res.render('property/list-properties', { properties });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const createPropertyForm = async (req, res) => {
  try {
    // Obtiene la lista de propietarios de la base de datos
    const owners = await Owner.findAll();
    
    // Renderiza la vista del formulario de creación de propiedades y pasa la lista de propietarios
    res.render('property/create-property', { owners });
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).send('Internal Server Error');
  }
};



const createProperty = async (req, res) => {
  try {
    const { transactionType, price, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description } = req.body;

    // Reemplazar saltos de línea con <br> en la descripción
    const processedDescription = description.replace(/\n/g, '<br>');

    const property = await Property.create({
      transactionType,
      price,
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
      description: processedDescription, // Guardar la descripción procesada
    });

    if (req.files && req.files.length > 0) {
      const imagePaths = [];

      req.files.forEach((file, index) => {
        const newFileName = `property-${property.id}-${index + 1}${path.extname(file.originalname)}`;
        const newPath = path.join(__dirname, '../public/assets/img/properties', newFileName);

        // Mover el archivo a la nueva ubicación con el nuevo nombre
        fs.renameSync(file.path, newPath);

        // Guardar la ruta relativa en la base de datos
        imagePaths.push(`assets/img/properties/${newFileName}`);
      });

      await Promise.all(imagePaths.map((img) => PropertyImage.create({ propertyId: property.id, img })));
    }

    res.redirect('/');
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

    const properties = await Property.findAll({
      where,
      include: [{
        model: PropertyImage,
        as: 'images', // Cambia 'PropertyImages' a 'images'
        attributes: ['img']
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

    res.render('index', {
      properties,
      departments: departments.map(d => ({ department: d.department, count: d.dataValues.count })),
      cities: cities.map(c => ({ city: c.city, department: c.department, count: c.dataValues.count })),
      neighborhoods: neighborhoods.map(n => ({ neighborhood: n.neighborhood, city: n.city, department: n.department, count: n.dataValues.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const editPropertyForm = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id, {
      include: [{ model: PropertyImage, as: 'images' }]
    });
    const owners = await Owner.findAll();

    if (!property) {
      return res.status(404).send('Property not found');
    }

    res.render('property/edit-property', { property, owners });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Otras funciones del controlador...


const editProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionType, price, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description, existingImages } = req.body;

    // Verifica si la propiedad existe
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).send('Property not found');
    }

    // Actualiza la propiedad
    await property.update({
      transactionType, price, address, area, rooms, bathrooms, garage, department, city, neighborhood, status, ownerId, description
    });

    // Maneja las imágenes existentes
    const existingImageIds = Array.isArray(existingImages) ? existingImages : [];
    const currentImages = await PropertyImage.findAll({ where: { propertyId: id } });

    // Elimina imágenes que no están en la lista de imágenes existentes
    const imagesToDelete = currentImages.filter(img => !existingImageIds.includes(img.id.toString()));
    await Promise.all(imagesToDelete.map(async img => {
      try {
        fs.unlinkSync(path.join(__dirname, '../public', img.img)); // Elimina el archivo del sistema de archivos
        await img.destroy(); // Elimina el registro de la base de datos
      } catch (error) {
        console.error('Error eliminando imagen:', error);
      }
    }));

    // Maneja nuevas imágenes
    if (req.files && req.files.length > 0) {
      const imagePaths = [];

      req.files.forEach((file, index) => {
        const newFileName = `property-${property.id}-${Date.now()}-${index + 1}${path.extname(file.originalname)}`;
        const newPath = path.join(__dirname, '../public/assets/img/properties', newFileName);

        // Mueve el archivo a la nueva ubicación con el nuevo nombre
        fs.renameSync(file.path, newPath);

        // Guarda la ruta relativa en la base de datos
        imagePaths.push(`assets/img/properties/${newFileName}`);
      });

      await Promise.all(imagePaths.map(img => PropertyImage.create({ propertyId: property.id, img })));
    }

    res.redirect('/admin/list-properties');
  } catch (error) {
    console.error('Error en editProperty:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProperties,
  renderIndexPage,
  getProperty,
  editProperty,
  editPropertyForm,
  createProperty,
  filterProperties,
  listProperties,
  createPropertyForm,
};