'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Product A',
        specification: 'Spec A',
        companyId: 1,
        rawMaterialId: 1,
        quantity: 100,
        unit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Product B',
        specification: 'Spec B',
        companyId: 2,
        rawMaterialId: 2,
        quantity: 200,
        unit: 'pcs',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
