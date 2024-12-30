'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInventoryRecord extends Model {
    static associate(models) {
      // define association here
      // 定义与 productWarehouse 表的关联
      ProductInventoryRecord.belongsTo(models.ProductWarehouse, {
        foreignKey: {
          name: 'productWarehouseId',
          allowNull: false,
        },
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

      // 新增的生产批次关联
      ProductInventoryRecord.belongsTo(models.Producing, {
        foreignKey: {
          name: 'productionBatch', // 外键名称
          allowNull: false,        // 可以根据业务决定是否允许为空
        },
        targetKey: 'productionBatch',  // Producing 表中的 productionBatch 字段
        onDelete: 'NO ACTION',          // 当 Producing 记录删除时，InboundRecord 的 productionBatch 会设为 NULL
        onUpdate: 'CASCADE',           // 当 Producing 的 productionBatch 更新时，InboundRecord 的 productionBatch 会自动更新
      });
    }
  }
  ProductInventoryRecord.init({
    productWarehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productionBatch: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
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