"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      // userId: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      // },
      roleId: {
        // name of the key we're adding
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        defaultValue: 99,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lockUntil: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
