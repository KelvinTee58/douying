'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Producing', [
      {
        productionBatch: 'Batch001',
        type: 'PREPARING',
        operator: 'uuid-sample-1',
        operatorName: 'Operator A',
        completionTime: new Date(),
        remarks: 'Initial production batch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productionBatch: 'Batch002',
        type: 'PROCESSING',
        operator: 'uuid-sample-2',
        operatorName: 'Operator B',
        remarks: 'Second production batch',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Producing', null, {});
  }
};
