'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('warehouses', [
      {
        warehouseName: '主产品仓库',
        address: '上海市浦东新区',
        detailedAddress: '浦东南路1234号',
        areaCode: '021',
        capacity: 1000.0,
        type: 'P',
        unit: 'KG',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warehouseName: '原料池',
        address: '上海市浦东新区',
        detailedAddress: '浦东南路1234号',
        areaCode: '021',
        capacity: 1000.0,
        type: 'R',
        unit: 'KG',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        warehouseName: '分仓库',
        address: '北京市朝阳区',
        detailedAddress: '朝阳路567号',
        areaCode: '010',
        capacity: 500.0,
        type: 'P',
        unit: 'KG',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('warehouses', null, {});
  }
};
