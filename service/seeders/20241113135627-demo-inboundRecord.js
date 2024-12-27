'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('InboundRecords', [
      {
        rawMaterialWarehouseId: 1,
        quantity: 500.000,
        unit: 'KG',
        computeUnit: 1.000,
        beforeQuantity: 400.000,
        beforeUnit: 'KG',
        beforeComputeUnit: 1.000,
        afterQuantity: 500.000,
        afterUnit: 'KG',
        afterComputeUnit: 1.000,
        type: 'IN',
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 填写用户 UUID
        operatorName: 'John Doe',
        remark: 'Received batch A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rawMaterialWarehouseId: 2,
        quantity: 2.000,
        unit: 'TON',
        computeUnit: 1000.000,
        beforeQuantity: 3.000,
        beforeUnit: 'TON',
        beforeComputeUnit: 1000.000,
        afterQuantity: 2.000,
        afterUnit: 'TON',
        afterComputeUnit: 1000.000,
        type: 'OUT',
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 填写用户 UUID
        operatorName: 'Jane Smith',
        remark: 'Removed batch B',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InboundRecords', null, {});
  }
};
