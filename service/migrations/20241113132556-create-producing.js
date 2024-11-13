'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Producings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productionBatch: {
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('PREPARING', 'PROCESSING', 'COMPLETED', 'RESTART', 'O')
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
        allowNull: false,
        type: Sequelize.STRING
      },
      completionTime: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Producings');
  }
};