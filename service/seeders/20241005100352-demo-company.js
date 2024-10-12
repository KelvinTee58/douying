'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [
      {
        companyName: 'ABC公司',
        contactPerson: '张三',
        contactPhone: '12345678901',
        address: '上海市浦东新区',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: 'XYZ公司',
        contactPerson: '李四',
        contactPhone: '09876543210',
        address: '北京市朝阳区',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companies', null, {});
  }
};