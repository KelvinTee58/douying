'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InboundRecord extends Model {
    static associate(models) {
      // define association here
      InboundRecord.belongsTo(models.RawMaterialWarehouse, {
        foreignKey: {
          name: 'rawMaterialWarehouseId',
          allowNull: false,
        },
      });

      InboundRecord.belongsTo(models.User, {
        foreignKey: {
          name: 'operator', // 外键名称与 User 模型中的字段名一致
          allowNull: false,
        },
        as: 'operatorUser',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // 新增的生产批次关联
      InboundRecord.belongsTo(models.Producing, {
        foreignKey: {
          name: 'productionBatch', // 外键名称
          allowNull: false,        // 可以根据业务决定是否允许为空
        },
        targetKey: 'productionBatch',  // Producing 表中的 productionBatch 字段
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      });

    }
  }

  InboundRecord.init({
    rawMaterialWarehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productionBatch: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    cost: DataTypes.DECIMAL(10, 2),
    dock: DataTypes.DECIMAL(10, 2),
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    computeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    beforeQuantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    beforeUnit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    beforeComputeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    afterQuantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    afterUnit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    afterComputeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    withdrawalId: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const value = this.getDataValue('withdrawalId');
        return value ? (Array.isArray(value) ? value : JSON.parse(value)) : [];
      },
      set(value) {
        this.setDataValue('withdrawalId',
          typeof value === 'string' ? value : JSON.stringify(value)
        );
      }
    },
    type: {
      type: DataTypes.ENUM('IN', 'OUT', 'COMPLETED', 'SUPPLEMENT', 'WITHDRAWAL', 'O'),
      allowNull: false
    },
    operator: {
      type: DataTypes.UUID,
      allowNull: false
    },
    operatorName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'InboundRecord',
    timestamps: true
  });

  return InboundRecord;
};
