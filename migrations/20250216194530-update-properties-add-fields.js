// filepath: /c:/Users/julia/Desktop/EstateAgency/migrations/20250216015405-update-properties-add-fields.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'district', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Manizales'
    });

    await queryInterface.addColumn('Properties', 'residential_stratum', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        min: 1,
        max: 6
      }
    });

    await queryInterface.addColumn('Properties', 'property_type', {
      type: Sequelize.ENUM,
      values: [
        'Local', 'Apartamento', 'Casa', 'Terreno', 'Finca', 'Oficina', 
        'Casa de campo', 'Bodega', 'Casa en conjunto cerrado', 
        'Casa en condominio', 'Penthouse', 'Nave industrial'
      ],
      allowNull: false,
      defaultValue: 'Casa'
    });

    await queryInterface.addColumn('Properties', 'property_condition', {
      type: Sequelize.ENUM,
      values: ['nuevo', 'usado', 'en construcción'],
      allowNull: false,
      defaultValue: 'usado'
    });

    await queryInterface.addColumn('Properties', 'floor', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });

    await queryInterface.addColumn('Properties', 'year_built', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2000
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'district');
    await queryInterface.removeColumn('Properties', 'residential_stratum');
    await queryInterface.removeColumn('Properties', 'property_type');
    await queryInterface.removeColumn('Properties', 'property_condition');
    await queryInterface.removeColumn('Properties', 'floor');
    await queryInterface.removeColumn('Properties', 'year_built');
  }
};