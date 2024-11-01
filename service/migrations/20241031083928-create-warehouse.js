'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warehouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouseName: {
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
      capacity: {
        type: Sequelize.FLOAT
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Warehouses');
  }
};