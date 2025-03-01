'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'img');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'img', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '' // Proporciona un valor predeterminado
    });
  }
};