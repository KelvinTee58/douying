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
        foreignKey: {
          name: 'productId',
          allowNull: false,
        }
      });

      // 关联到仓库表
      ProductWarehouse.belongsTo(models.Warehouse, {
        foreignKey: {
          name: 'warehouseId',
          allowNull: false,
        }
      });

      // 添加反向关系：RawMaterialWarehouse 可能有多个 InboundRecord
      ProductWarehouse.hasMany(models.ProductInventoryRecord, {
        foreignKey: 'productWarehouseId',
        onDelete: 'CASCADE',
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
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    computeUnit: {
      type: DataTypes.DECIMAL(10, 3),
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