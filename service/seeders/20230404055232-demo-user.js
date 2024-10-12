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
          id: "e737832d-5e73-8aa5-9fdf-84a677dd098a",
          roleId: 1,
          name: "郑大海",
          username: "root",
          phone: "15816081222",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "56118ea9-aef7-3347-7645-60f65f6aa51b",
          roleId: 2,
          name: "test1",
          username: "test1",
          phone: "10086",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "56118ea9-aef7-3347-7645-60f65f6aa51c",
          roleId: 3,
          name: "test2",
          username: "test2",
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
