'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        employeeNumber: 'E0001',
        name: '张三',
        gender: 'M',
        phone: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeNumber: 'E0002',
        name: '李四',
        gender: 'F',
        phone: '12345678902',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeNumber: 'E0003',
        name: '王五',
        gender: 'O', // 默认值
        phone: '12345678903',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeNumber: 'E0004',
        name: '赵六',
        phone: '12345678904',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('employees', null, {});
  }
};
