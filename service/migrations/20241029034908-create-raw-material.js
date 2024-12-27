'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RawMaterials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      materialName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      computeUnit: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
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
    await queryInterface.dropTable('RawMaterials');
  }
};