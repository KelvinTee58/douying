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
        foreignKey: {
          name: 'operator', // 外键名称与 User 模型中的字段名一致
          allowNull: false,
        },
        as: 'operatorDetails',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  ProductInventoryRecord.init({
    productWarehouseId: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('IN', 'OUT', 'MOVING_IN', 'MOVING_OUT', 'SUPPLEMENT', 'WITHDRAWAL', 'O'),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(50), // 字符串类型，50个字符足够
      allowNull: false,
    },
    computeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    beforeQuantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    beforeUnit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    beforeComputeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    afterQuantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    afterUnit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    afterComputeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    operator: DataTypes.UUID,
    operatorName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    remark: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ProductInventoryRecord',
    timestamps: true,
  });
  return ProductInventoryRecord;
};