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
    companyName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contactPerson: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contactPhone: DataTypes.STRING,
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    detailedAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    areaCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // 默认值为 false
    },
    deletedAt: DataTypes.DATE // 添加 deletedAt 字段，用于软删除
  }, {
    sequelize,
    modelName: 'Company',
    timestamps: true, // 自动更新数据库的时间戳
  });
  return Company;
};