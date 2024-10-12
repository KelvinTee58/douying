"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Companies", [
      {
        companyName: "ABC公司",
        contactPerson: "张三",
        contactPhone: "12345678901",
        address: "上海市浦东新区",
        detailedAddress: "浦东大道100号",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "XYZ公司",
        contactPerson: "李四",
        contactPhone: "09876543210",
        address: "北京市朝阳区",
        detailedAddress: "朝阳北路200号",
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
    return queryInterface.bulkDelete('Companies', null, {});
  },
};
