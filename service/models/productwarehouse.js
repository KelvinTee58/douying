'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 关联到产品表
      ProductWarehouse.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });

      // 关联到仓库表
      ProductWarehouse.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId',
        as: 'warehouse'
      });
    }
  }
  ProductWarehouse.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    computeUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductWarehouse',
    timestamps: true
  });
  return ProductWarehouse;
};