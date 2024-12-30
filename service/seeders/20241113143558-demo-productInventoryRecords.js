'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductInventoryRecords', [
      {
        productWarehouseId: 1, // 假设存在一个产品仓库 ID 为 1
        productionBatch: 'Batch001',
        type: 'IN',
        cost: 100.50, // 使用 DECIMAL 数据
        quantity: 100.000,
        unit: 'KG',
        computeUnit: 100.000,
        beforeQuantity: 50.000,
        beforeUnit: 'KG',
        beforeComputeUnit: 50.000,
        afterQuantity: 150.000,
        afterUnit: 'KG',
        afterComputeUnit: 150.000,
        transactionDate: new Date(),
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 假设有一个操作员 ID
        operatorName: 'Operator A',
        remark: '初始入库',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productWarehouseId: 2, // 假设存在一个产品仓库 ID 为 2
        productionBatch: 'Batch001',
        type: 'OUT',
        cost: 50.20, // 使用 DECIMAL 数据
        quantity: 50.000,
        unit: 'KG',
        computeUnit: 50.000,
        beforeQuantity: 150.000,
        beforeUnit: 'KG',
        beforeComputeUnit: 150.000,
        afterQuantity: 100.000,
        afterUnit: 'KG',
        afterComputeUnit: 100.000,
        transactionDate: new Date(),
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 假设有一个操作员 ID
        operatorName: 'Operator B',
        remark: '产品出库',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductInventoryRecords', null, {});
  }
};
