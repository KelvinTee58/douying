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
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      batchSequence: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('PREPARING', 'PROCESSING', 'COMPLETED', 'RESTART', 'CLOSE', 'DELETE', 'O')
      },
      operator: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      operatorName: {
        allowNull: false,
        type: Sequelize.STRING(100)
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