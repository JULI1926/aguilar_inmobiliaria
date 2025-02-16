const { Sequelize } = require('sequelize'); // ✅ Importa Sequelize aquí

module.exports = (sequelize, DataTypes) => {  
  const Owner = sequelize.define('Owner', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_documento: {
      type: DataTypes.ENUM('CC', 'NIT', 'CE', 'Pasaporte'),
      allowNull: false
    },
    numero_documento: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW // ✅ Usa Sequelize correctamente
    }
  });

  return Owner;
};
