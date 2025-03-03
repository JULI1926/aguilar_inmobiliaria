'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash('  ', 10);

      const users = [
        {
          name: "Admin User",
          email: "admin@example.com",
          phone: "1234567890",
          user: "adminuser",
          password: hashedPassword,
          rol: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Normal User",
          email: "user@example.com",
          phone: "0987654321",
          user: "normaluser",
          password: hashedPassword,
          rol: "user",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      console.log('Inserting users:', users);

      await queryInterface.bulkInsert('Users', users, {});
    } catch (error) {
      console.error('Error inserting users:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {});
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  }
};