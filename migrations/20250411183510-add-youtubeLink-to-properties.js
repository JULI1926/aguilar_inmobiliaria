'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'youtubeLink', {
      type: Sequelize.STRING,
      allowNull: true, // Puede estar vacío
      defaultValue: null // Valor por defecto
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'youtubeLink');
  }
};

