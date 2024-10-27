'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // 添加新字段
    await queryInterface.addColumn('Companies', 'areaCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Companies', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('Companies', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Companies', 'areaCode');
    await queryInterface.removeColumn('Companies', 'isDeleted');
    await queryInterface.removeColumn('Companies', 'deletedAt');
  }
};
