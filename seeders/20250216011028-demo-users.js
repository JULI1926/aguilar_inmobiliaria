'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash('password123', 10);

      const users = [
        {
          nombre: "Admin",
          apellido: "User",
          email: "admin@example.com",
          password: hashedPassword,
          rol: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: "Normal",
          apellido: "User",
          email: "user@example.com",
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