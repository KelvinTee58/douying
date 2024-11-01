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

        companyName: "默认",
        contactPerson: "郑",
        contactPhone: "15816081222",
        address: "广东省-湛江市-雷州市",
        areaCode: "440882",
        detailedAddress: "东里镇西塘西村（村西边）",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "XYZ公司",
        contactPerson: "李四",
        address: "广东省-湛江市-雷州市",
        areaCode: "440882",
        detailedAddress: "东里镇西塘西村（村西边）",
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
