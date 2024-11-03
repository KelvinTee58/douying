'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      specification: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // 关联公司表
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rawMaterialId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RawMaterials', // 关联原料表
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.TEXT
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Products');
  }
};