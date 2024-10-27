'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    companyName: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    address: DataTypes.STRING,
    detailedAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    timestamps: true, // 自动更新数据库的时间戳
  });
  return Company;
};