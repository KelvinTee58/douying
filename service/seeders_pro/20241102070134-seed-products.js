'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: '芒果丁',
        specification: '10X10mm',
        companyId: 1,
        rawMaterialId: 1,
        quantity: 100,
        unit: 'ton',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: '芒果碎',
        specification: '碎丁',
        companyId: 2,
        rawMaterialId: 2,
        quantity: 200,
        unit: 'ton',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
