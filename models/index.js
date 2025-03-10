const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

console.log(`Database URL: ${process.env.DATABASE_URL}`);

// Importar los modelos correctamente sin requerir `sequelize` dentro de ellos
const Owner = require('./owner')(sequelize, DataTypes);
const Property = require('./property')(sequelize, DataTypes);
const PropertyImage = require('./propertyImage')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

// Definir relaciones entre modelos
Owner.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(Owner, { foreignKey: 'ownerId' });

Property.hasMany(PropertyImage, { foreignKey: 'propertyId', as: 'images' });
PropertyImage.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

// Sincronizar base de datos
sequelize.sync();

module.exports = { sequelize, Owner, Property, PropertyImage, User };
