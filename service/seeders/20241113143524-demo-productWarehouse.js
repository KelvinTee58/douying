'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductWarehouses', [
      {
        productId: 1, // 假设产品ID为1
        warehouseId: 1, // 假设仓库ID为1
        quantity: 500,
        unit: '12.5KG/箱',
        computeUnit: 12.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2, // 假设产品ID为2
        warehouseId: 2, // 假设仓库ID为2
        quantity: 300,
        unit: '12.5KG/箱',
        computeUnit: 12.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductWarehouses', null, {});
  }
};
