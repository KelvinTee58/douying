'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RawMaterials', [
      {
        materialName: '芒果',
        companyId: 1,
        quantity: 0,
        unit: 'ton',
        status: 'in_stock',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '',
      },
      {
        materialName: '木瓜',
        companyId: 1,
        quantity: 0,
        unit: 'ton',
        status: 'in_stock',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '',
      },
      {
        materialName: '菠萝',
        companyId: 1,
        quantity: 0,
        unit: 'ton',
        status: 'in_stock',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '',
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RawMaterials', null, {});
  }
};
