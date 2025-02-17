// filepath: /c:/Users/julia/Desktop/EstateAgency/migrations/20250216194530-remove-district-from-properties.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'description', {
      type: Sequelize.STRING(1500),
      allowNull: false,
      defaultValue: '' // Valor predeterminado para evitar errores en SQLite
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'description');
  }
};