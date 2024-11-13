'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInventoryRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 定义与 productWarehouse 表的关联
      ProductInventoryRecord.belongsTo(models.ProductWarehouse, {
        foreignKey: 'productWarehouseId',
        as: 'productWarehouse',
      });
      // 定义与 User 表的关联
      ProductInventoryRecord.belongsTo(models.User, {
        foreignKey: 'operator',
        as: 'operatorDetails',
      });
    }
  }
  ProductInventoryRecord.init({
    productWarehouseId: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('IN', 'OUT'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    computeUnit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    operator: DataTypes.UUID,
    operatorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductInventoryRecord',
    timestamps: true,
  });
  return ProductInventoryRecord;
};