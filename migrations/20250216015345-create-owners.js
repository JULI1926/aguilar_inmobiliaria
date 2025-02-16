'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Owners', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_documento: {
        type: Sequelize.ENUM('CC', 'NIT', 'CE', 'Pasaporte'),
        allowNull: false
      },
      numero_documento: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_registro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Owners');
  }
};