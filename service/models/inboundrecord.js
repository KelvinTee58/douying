'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InboundRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 关联到原料仓库表
      InboundRecord.belongsTo(models.RawMaterialWarehouse, {
        foreignKey: 'rawMaterialWarehouseId',
        as: 'rawMaterialWarehouse',
      });
      // 关联到 User
      InboundRecord.belongsTo(models.User, {
        foreignKey: 'operator',
        as: 'operatorUser'
      });
    }
  }
  InboundRecord.init({
    rawMaterialWarehouseId: {
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
    changeType: {
      type: DataTypes.ENUM('IN', 'OUT', 'COMPLETED', 'SUPPLEMENT', 'WITHDRAWAL', 'O'),
      allowNull: false
    },
    operator: {
      type: DataTypes.UUID,
      allowNull: false
    },
    operatorName: {
      type: DataTypes.STRING,
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