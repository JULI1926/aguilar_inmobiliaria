require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

console.log(`Database URL: ${process.env.DATABASE_URL}`);


const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV;

// Configurar Sequelize para usar PostgreSQL
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
