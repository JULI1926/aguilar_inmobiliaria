const { Property } = require('../models');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' } });
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Error fetching properties');
  }
};

const renderIndexPage = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'active' } });
    res.render('index', { properties });
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

module.exports = {
    getProperties,
    renderIndexPage,
    getProperty,
};