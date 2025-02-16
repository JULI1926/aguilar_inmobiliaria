'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Owners', [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987654321",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Owners', null, {});
  }
};
