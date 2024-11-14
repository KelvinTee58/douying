'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InboundRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rawMaterialWarehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'RawMaterialWarehouses', // 关联 rawMaterialWarehouse 表
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      dock: {
        type: Sequelize.FLOAT
      },
      cost: {
        type: Sequelize.FLOAT
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      computeUnit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('IN', 'OUT', 'COMPLETED', 'SUPPLEMENT', 'WITHDRAWAL', 'O'),
        allowNull: false
      },
      operator: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users', // 假设 Users 表存在
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      operatorName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      remark: {
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
    await queryInterface.dropTable('InboundRecords');
  }
};