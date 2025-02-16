const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Importar los modelos correctamente sin requerir `sequelize` dentro de ellos
const Owner = require('./owner')(sequelize, DataTypes);
const Property = require('./property')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

// Definir relaciones entre modelos
Owner.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(Owner, { foreignKey: 'ownerId' });

// Sincronizar base de datos
sequelize.sync();

module.exports = { sequelize, Owner, Property, User };
