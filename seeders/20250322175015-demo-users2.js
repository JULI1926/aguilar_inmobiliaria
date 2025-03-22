'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash('adminpassword', 10);

      const adminUser = [
        {
          name: "Admin User",
          email: "aguilarinmobiliarios@gmail.com",
          phone: "1234567890",
          user: "adminuser",
          password: hashedPassword,
          rol: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      console.log('Inserting admin user:', adminUser);

      await queryInterface.bulkInsert('Users', adminUser, {});
    } catch (error) {
      console.error('Error inserting admin user:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', { email: "admin@example.com" }, {});
    } catch (error) {
      console.error('Error deleting admin user:', error);
    }
  }
};