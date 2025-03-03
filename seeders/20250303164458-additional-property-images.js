'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const properties = await queryInterface.sequelize.query(
      `SELECT id FROM Properties`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const additionalPropertyImages = properties.flatMap((property, index) => [
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

    await queryInterface.bulkInsert('PropertyImages', additionalPropertyImages, {});
  },

  down: async (queryInterface, Sequelize) => {
    const properties = await queryInterface.sequelize.query(
      `SELECT id FROM Properties`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const propertyIds = properties.map(property => property.id);

    await queryInterface.bulkDelete('PropertyImages', {
      propertyId: {
        [Sequelize.Op.in]: propertyIds
      },
      img: {
        [Sequelize.Op.like]: 'assets/img/properties/property-%-4.jpg'
      }
    });

    await queryInterface.bulkDelete('PropertyImages', {
      propertyId: {
        [Sequelize.Op.in]: propertyIds
      },
      img: {
        [Sequelize.Op.like]: 'assets/img/properties/property-%-5.jpg'
      }
    });

    await queryInterface.bulkDelete('PropertyImages', {
      propertyId: {
        [Sequelize.Op.in]: propertyIds
      },
      img: {
        [Sequelize.Op.like]: 'assets/img/properties/property-%-6.jpg'
      }
    });

    await queryInterface.bulkDelete('PropertyImages', {
      propertyId: {
        [Sequelize.Op.in]: propertyIds
      },
      img: {
        [Sequelize.Op.like]: 'assets/img/properties/property-%-7.jpg'
      }
    });
  }
};