'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // define association here
      Company.hasMany(models.Product, {
        foreignKey: {
          allowNull: true,  // 允许外键为 NULL
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',  // 当 Company 被删除时，Product 中的外键会设置为 NULL
      });
    }
  }
  Company.init({
    companyName: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    contactPerson: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    contactPhone: DataTypes.STRING(100),
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
      type: DataTypes.STRING(50),
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