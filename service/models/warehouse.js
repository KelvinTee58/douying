'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Warehouse.init({
    warehouseName: {
      type: DataTypes.STRING,
      allowNull: false, // 必填
    },
    address: DataTypes.STRING,
    detailedAddress: DataTypes.STRING,
    areaCode: DataTypes.STRING,
    capacity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // 默认值为 false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Warehouse',
    timestamps: true, // 启用时间戳
    paranoid: true, // 启用软删除，自动处理 deletedAt 字段
  });
  return Warehouse;
};