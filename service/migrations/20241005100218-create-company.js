'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contactPerson: {
        type: Sequelize.STRING
      },
      contactPhone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      detailedAddress: {
        type: Sequelize.STRING
      },
      areaCode: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};