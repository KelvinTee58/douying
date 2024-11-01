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
          userId: "e737832d-5e73-8aa5-9fdf-84a677dd098a",
          originalPassword: "root",
          password: "$2b$10$gS3aeimGK5N3kobajDIhEufGOGlK7bNkWCTEHhdLxu86MBvb8JGee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "56118ea9-aef7-3347-7645-60f65f6aa51b",
          originalPassword: "root",
          password: "$2b$10$gS3aeimGK5N3kobajDIhEufGOGlK7bNkWCTEHhdLxu86MBvb8JGee",
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
