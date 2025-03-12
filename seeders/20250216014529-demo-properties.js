'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [
      {
        transactionType: "Arrendo",
        price: 700000,
        address: "Carrera 47",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 1",
        city: "Ciudad 1",
        neighborhood: "Barrio 1",
        status: "active",
        ownerId: 17,
        description: "Hermosa propiedad ubicada en una zona tranquila, con amplios espacios y excelente iluminación natural.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transactionType: "Venta",
        price: 350000000,
        address: "Carrera 77",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 2",
        city: "Ciudad 2",
        neighborhood: "Barrio 2",
        status: "active",
        ownerId: 18,
        description: "Propiedad en venta con acabados de lujo, ideal para familias grandes, ubicada cerca de parques y centros comerciales.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transactionType: "Venta",
        price: 580000,
        address: "Carrera 81",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 3",
        city: "Ciudad 3",
        neighborhood: "Barrio 3",
        status: "active",
        ownerId: 19,
        description: "Espaciosa propiedad en venta, con jardín privado y excelente distribución de espacios.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transactionType: "Arrendo",
        price: 650000,
        address: "Carrera 92",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 4",
        city: "Ciudad 4",
        neighborhood: "Barrio 4",
        status: "active",
        ownerId: 20,
        description: "Propiedad en arriendo, ideal para oficinas o negocios, ubicada en una zona de alto tráfico.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transactionType: "Venta",
        price: 300000000,
        address: "Carrera 34",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 5",
        city: "Ciudad 5",
        neighborhood: "Barrio 5",
        status: "active",
        ownerId: 17,
        description: "Propiedad en venta con excelente ubicación, cerca de colegios y transporte público.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transactionType: "Venta",
        price: 650000000,
        address: "Carrera 65",
        area: "340",
        rooms: 5,
        bathrooms: 2,
        garage: 1,
        department: "Departamento 6",
        city: "Ciudad 6",
        neighborhood: "Barrio 6",
        status: "active",
        ownerId: 18,
        description: "Propiedad de lujo en venta, con piscina y amplias áreas sociales, ideal para el entretenimiento.",
        residential_stratum: 3,
        property_type: "Casa",
        property_condition: "usado",
        floor: 1,
        year_built: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const properties = await queryInterface.sequelize.query(
      `SELECT id FROM Properties`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const propertyImages = properties.flatMap((property, index) => [
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-1.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-2.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-3.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-4.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-5.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-6.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        propertyId: property.id,
        img: `assets/img/properties/property-${index + 1}-7.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('PropertyImages', propertyImages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PropertyImages', null, {});
    await queryInterface.bulkDelete('Properties', null, {});
  }
};