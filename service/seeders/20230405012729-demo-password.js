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
      "Passwords",
      [
        {
          uid: "e737832d-5e73-8aa5-9fdf-84a677dd098a",
          originalPassword: "root",
          password: "9eYhXZFhWXGy/ErDMT6psw==",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uid: "56118ea9-aef7-3347-7645-60f65f6aa51b",
          originalPassword: "test",
          password: "VNabslRI71ybT5BEYKFYdw==",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uid: "56118ea9-aef7-3347-7645-60f65f6aa51c",
          originalPassword: "root",
          password: "VNabslRI71ybT5BEYKFYdw==",
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
    await queryInterface.bulkDelete("Passwords", null, {});
  },
};
