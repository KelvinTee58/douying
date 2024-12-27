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
          model: 'ProductWarehouses', // 关联 ProductWarehouses 表
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      type: {
        type: Sequelize.ENUM('IN', 'OUT', 'MOVING_IN', 'MOVING_OUT', 'SUPPLEMENT', 'WITHDRAWAL', 'O'),
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      computeUnit: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
      },
      beforeQuantity: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
      },
      beforeUnit: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      beforeComputeUnit: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
      },
      afterQuantity: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
      },
      afterUnit: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      afterComputeUnit: {
        type: Sequelize.DECIMAL(10, 3),
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
        onDelete: 'CASCADE',
      },
      operatorName: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    await queryInterface.dropTable('ProductInventoryRecords');
  }
};
