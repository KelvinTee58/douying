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
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      },
      dock: {
        type: Sequelize.DECIMAL(10, 2)
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2)
      },
      unit: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      computeUnit: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      },
      beforeQuantity: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      },
      beforeUnit: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      beforeComputeUnit: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      },
      afterQuantity: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      },
      afterUnit: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      afterComputeUnit: {
        type: Sequelize.DECIMAL(10, 3),
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
        onDelete: 'CASCADE'
      },
      operatorName: {
        type: Sequelize.STRING(100),
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
