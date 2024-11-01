'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('warehouses', [
      {
        warehouseName: '默认主仓库',
        address: "广东省-湛江市-雷州市",
        areaCode: "440882",
        detailedAddress: "东里镇西塘西村（村西边）",
        capacity: 1000.0,
        unit: 'ton',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('warehouses', null, {});
  }
};
