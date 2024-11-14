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
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      detailedAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      areaCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('P', 'R', 'O'),
        defaultValue: 'O', // 默认值为O
      },
      capacity: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 999999
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