'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductInventoryRecords', [
      {
        productWarehouseId: 1, // 假设存在一个产品仓库 ID 为 1
        type: 'IN',
        quantity: 100,
        unit: 'kg',
        computeUnit: 100,
        transactionDate: new Date(),
        operator: 'uuid-operator-1', // 假设有一个操作员 ID
        operatorName: 'Operator A',
        remarks: '初始入库',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productWarehouseId: 2, // 假设存在一个产品仓库 ID 为 2
        type: 'OUT',
        quantity: 50,
        unit: 'kg',
        computeUnit: 50,
        transactionDate: new Date(),
        operator: 'uuid-operator-2', // 假设有一个操作员 ID
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
