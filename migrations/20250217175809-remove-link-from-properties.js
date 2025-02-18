// filepath: /c:/Users/julia/Desktop/EstateAgency/migrations/20250217-remove-link-from-properties.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'link');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'link', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};