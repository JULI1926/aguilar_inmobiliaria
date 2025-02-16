// filepath: /c:/Users/julia/Desktop/EstateAgency/migrations/20250216194530-remove-district-from-properties.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'district');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'district', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '' // Valor predeterminado para evitar errores en SQLite
    });
  }
};