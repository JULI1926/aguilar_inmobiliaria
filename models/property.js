module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      saleRent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
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
      }
    });
  
    return Property;
  };
  