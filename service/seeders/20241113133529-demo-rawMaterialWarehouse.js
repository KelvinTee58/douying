'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RawMaterialWarehouses', [
      {
        warehouseId: 1,
        rawMaterialId: 1,
        quantity: 100,
        unit: 'KG',
        computeUnit: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 2,
        rawMaterialId: 2,
        quantity: 200,
        unit: 'ton',
        computeUnit: 1000,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RawMaterialWarehouses', null, {});
  }
};
