/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2024-11-13 21:35:29
 * @LastEditors: kevinzheng
 * @LastEditTime: 2025-01-02 11:14:03
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RawMaterialWarehouses', [
      {
        warehouseId: 1,
        rawMaterialId: 1,
        quantity: 0.000,
        unit: 'TON',
        computeUnit: 1000.000,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 2,
        rawMaterialId: 2,
        quantity: 0.000,
        unit: 'TON',
        computeUnit: 1000.000,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RawMaterialWarehouses', null, {});
  }
};
