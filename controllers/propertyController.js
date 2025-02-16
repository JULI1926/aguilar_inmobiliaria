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

module.exports = {
    getProperties,
    renderIndexPage,
    
};