'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [
      {
        img: "assets/img/properties/property-1.jpg",
        saleRent: "Arrendo | $700000",
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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-2.jpg",
        saleRent: "Venta | $350.000.000",
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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-3.jpg",
        saleRent: "Venta | $580.000",
        link: "property-single.html",
        address: "Carrera 81",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 3",
        city: "Ciudad 3",
        neighborhood: "Barrio 3",
        status: "active",
        ownerId: 3, // ID del propietario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-4.jpg",
        saleRent: "Arrendo | $650.000",
        link: "property-single.html",
        address: "Carrera 92",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 4",
        city: "Ciudad 4",
        neighborhood: "Barrio 4",
        status: "active",
        ownerId: 4, // ID del propietario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-5.jpg",
        saleRent: "Venta | $300.000.000",
        link: "property-single.html",
        address: "Carrera 34",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 5",
        city: "Ciudad 5",
        neighborhood: "Barrio 5",
        status: "active",
        ownerId: 1, // ID del propietario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        img: "assets/img/properties/property-6.jpg",
        saleRent: "Venta | $650.000.000",
        link: "property-single.html",
        address: "Carrera 65",
        area: "340m2",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 6",
        city: "Ciudad 6",
        neighborhood: "Barrio 6",
        status: "active",
        ownerId: 2, // ID del propietario
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {});
  }
};