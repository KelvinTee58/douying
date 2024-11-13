'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('InboundRecords', [
      {
        rawMaterialWarehouseId: 1,
        quantity: 500,
        unit: 'kg',
        computeUnit: 1,
        changeType: 'IN',
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a', // 填写用户 UUID
        operatorName: 'John Doe',
        remark: 'Received batch A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rawMaterialWarehouseId: 2,
        quantity: 2,
        unit: 'ton',
        computeUnit: 1000,
        changeType: 'OUT',
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
