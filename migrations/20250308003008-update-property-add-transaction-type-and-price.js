// filepath: c:\Users\julia\Desktop\EstateAgency\migrations\XXXXXXXXXXXXXX-update-property-add-transaction-type-and-price.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'transactionType', {
      type: Sequelize.STRING,
      allowNull: false,
       defaultValue: 'Venta',
    });
    await queryInterface.addColumn('Properties', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.removeColumn('Properties', 'saleRent');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'saleRent', {
      type: Sequelize.STRING,
      allowNull: false,
     
    });
    await queryInterface.removeColumn('Properties', 'transactionType');
    await queryInterface.removeColumn('Properties', 'price');
  }
};