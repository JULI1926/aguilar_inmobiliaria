'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Venta'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    garage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Owners',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(1500),
      allowNull: false,
      defaultValue: ''
    },
    residential_stratum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        min: 1,
        max: 6
      }
    },
    property_type: {
      type: DataTypes.ENUM,
      values: [
        'Local', 'Apartamento', 'Casa', 'Terreno', 'Finca', 'Oficina', 
        'Casa de campo', 'Bodega', 'Casa en conjunto cerrado', 
        'Casa en condominio', 'Penthouse', 'Nave industrial'
      ],
      allowNull: false,
      defaultValue: 'Casa'
    },
    property_condition: {
      type: DataTypes.ENUM,
      values: ['nuevo', 'usado', 'en construcción', 'remodelado'],
      allowNull: false,
      defaultValue: 'usado'
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    year_built: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2000
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {});    
  
  return Property;
};