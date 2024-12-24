'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Producings', [
      {
        productionBatch: 'Batch001',
        batchSequence: 1,
        type: 'PREPARING',
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a',
        operatorName: 'Operator A',
        completionTime: new Date(),
        remarks: 'Initial production batch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productionBatch: 'Batch002',
        batchSequence: 2,
        type: 'PROCESSING',
        operator: 'e737832d-5e73-8aa5-9fdf-84a677dd098a',
        operatorName: 'Operator B',
        remarks: 'Second production batch',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Producings', null, {});
  }
};
