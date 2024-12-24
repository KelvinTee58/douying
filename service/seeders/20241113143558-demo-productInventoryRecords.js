'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductInventoryRecords', [
      {
        productWarehouseId: 1, // 假设存在一个产品仓库 ID 为 1
        type: 'IN',
        quantity: 100,
        unit: 'KG',
        computeUnit: 100,
        transactionDate: new Date(),
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 假设有一个操作员 ID
        operatorName: 'Operator A',
        remarks: '初始入库',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productWarehouseId: 2, // 假设存在一个产品仓库 ID 为 2
        type: 'OUT',
        quantity: 50,
        unit: 'KG',
        computeUnit: 50,
        transactionDate: new Date(),
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 假设有一个操作员 ID
        operatorName: 'Operator B',
        remarks: '产品出库',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductInventoryRecords', null, {});
  }
};
