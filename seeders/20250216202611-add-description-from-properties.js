'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [
      {
        img: "assets/img/properties/property-1.jpg",
        saleRent: "Arriendo | $900000",
        link: "property-single.html",
        address: "Carrera 47",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 1",
        city: "Ciudad 1",
        neighborhood: "Barrio 1",
        status: "active",
        ownerId: 1, // ID del propietario
        description: "Hermosa casa con amplio jardín y excelente ubicación.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-2.jpg",
        saleRent: "Venta | $250.000.000",
        link: "property-single.html",
        address: "Carrera 77",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 2",
        city: "Ciudad 2",
        neighborhood: "Barrio 2",
        status: "active",
        ownerId: 2, // ID del propietario
        description: "Casa moderna con acabados de lujo y excelente vista.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-3.jpg",
        saleRent: "Arriendo | $650000",
        link: "property-single.html",
        address: "Calle 10",
        area: "120m2",
        rooms: 3,
        bathrooms: 1,
        garage: 1,
        department: "Departamento 3",
        city: "Ciudad 3",
        neighborhood: "Barrio 3",
        status: "active",
        ownerId: 3, // ID del propietario
        description: "Apartamento acogedor cerca de transporte público y tiendas.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {});
  }
};