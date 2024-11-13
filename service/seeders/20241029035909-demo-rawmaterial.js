'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RawMaterials', [
      {
        materialName: '芒果',
        companyId: 1,
        computeUnit: 1,
        unit: 'KG',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '新鲜的芒果',
      },
      {
        materialName: '火龙果',
        companyId: 2,
        computeUnit: 1,
        unit: 'KG',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '火龙果在成熟阶段',
      },
      {
        materialName: '木瓜',
        companyId: 1,
        computeUnit: 1,
        unit: 'KG',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '木瓜在加工中',
      },
      {
        materialName: '菠萝',
        companyId: 3,
        computeUnit: 1,
        unit: 'KG',
        createdAt: new Date(),
        updatedAt: new Date(),
        remark: '菠萝已完成加工',
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RawMaterials', null, {});
  }
};
