'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Owners', [
      {
        nombre: "John",
        apellido: "Doe",
        tipo_documento: "CC",
        numero_documento: "123456789",
        telefono: "123456789",
        email: "john@example.com",
        direccion: "123 Main St",
        ciudad: "Ciudad 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Jane",
        apellido: "Smith",
        tipo_documento: "CC",
        numero_documento: "987654321",
        telefono: "987654321",
        email: "jane@example.com",
        direccion: "456 Elm St",
        ciudad: "Ciudad 2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Alice",
        apellido: "Johnson",
        tipo_documento: "CE",
        numero_documento: "1122334455",
        telefono: "1122334455",
        email: "alice@example.com",
        direccion: "789 Oak St",
        ciudad: "Ciudad 3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Bob",
        apellido: "Brown",
        tipo_documento: "NIT",
        numero_documento: "9988776655",
        telefono: "9988776655",
        email: "bob@example.com",
        direccion: "321 Pine St",
        ciudad: "Ciudad 4",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Owners', null, {});
  }
};