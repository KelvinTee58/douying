"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "loginAttempts", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // 初始值为 0
      }),
      queryInterface.addColumn("Users", "lockUntil", {
        type: Sequelize.DATE,
        allowNull: true, // 可为空
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Users", "loginAttempts"), queryInterface.removeColumn("Users", "lockUntil")]);
  },
};
