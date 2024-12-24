'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Product A',
        specification: 'Spec A',
        computeUnit: 1,
        unit: 'KG',
        remark: '666',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Product B',
        specification: 'Spec B',
        computeUnit: 1,
        unit: 'KG',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
