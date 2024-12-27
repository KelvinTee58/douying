'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InboundRecord extends Model {
    static associate(models) {
      // define association here
      InboundRecord.belongsTo(models.RawMaterialWarehouse, {
        foreignKey: 'rawMaterialWarehouseId',
        as: 'rawMaterialWarehouse',
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
    }
  }

  InboundRecord.init({
    rawMaterialWarehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
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
