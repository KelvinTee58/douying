'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Inbounds', [
      {
        batchNumber: 'BAT20141103001',
        warehouseId: 1,
        rawMaterialId: 1,
        supplierId: 1,
        quantity: 100.5,
        unit: 'KG',
        receivedBy: 'e737832d-5e73-8aa5-9fdf-84a677dd098a',
        receivedName: '张三',
        receivedAt: new Date(),
        remark: 'First inbound batch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        batchNumber: 'BAT20141103002',
        warehouseId: 2,
        rawMaterialId: 2,
        supplierId: 2,
        quantity: 200,
        unit: 'pcs',
        receivedBy: 'e737832d-5e73-8aa5-9fdf-84a677dd098a',
        receivedName: '李四',
        receivedAt: new Date(),
        remark: 'Second inbound batch',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inbounds', null, {});
  }
};
