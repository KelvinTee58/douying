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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          roleId: 1,
          name: "郑海军",
          username: "root",
          id: "e737832d-5e73-8aa5-9fdf-84a677dd098a",
          phone: "15816081222",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 10,
          name: "test1",
          username: "test1",
          id: "56118ea9-aef7-3347-7645-60f65f6aa51b",
          phone: "10086",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 10,
          name: "test2",
          username: "test2",
          id: "56118ea9-aef7-3347-7645-60f65f6aa51c",
          phone: "10086",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
