'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    employeeNumber: {
      type: DataTypes.STRING(50),
      allowNull: false, // 必填
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // 必填
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'O'), // 定义 ENUM 值
      defaultValue: 'O', // 默认值设置为 'O'
    },
    phone: DataTypes.STRING(100),
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // 默认值为 false
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true, // 自动更新数据库的时间戳
  });
  return Employee;
};