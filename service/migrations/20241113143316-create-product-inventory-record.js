'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductInventoryRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productWarehouseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductWarehouses', // 关联 productWarehouse 表
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      type: {
        type: Sequelize.ENUM('IN', 'OUT'),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      computeUnit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      operator: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // 假设 Users 表存在
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      operatorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ProductInventoryRecords');
  }
};