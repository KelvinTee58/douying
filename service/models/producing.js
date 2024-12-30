'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producing.belongsTo(models.User, {
        foreignKey: {
          name: 'operator', // 外键名称与 User 模型中的字段名一致
          allowNull: false,
        },
        as: 'operatorUser',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // 生产批次可以有多个入库记录
      Producing.hasMany(models.InboundRecord, {
        foreignKey: 'productionBatch',
        onDelete: 'NO ACTION', // 如果 Producing 被删除，相关的 InboundRecord 的 productionBatch 设置为 NULL
        onUpdate: 'CASCADE',
      });

      // 生产批次可以有多个入库记录
      Producing.hasMany(models.ProductInventoryRecord, {
        foreignKey: 'productionBatch',
        onDelete: 'NO ACTION', // 如果 Producing 被删除，相关的 InboundRecord 的 productionBatch 设置为 NULL
        onUpdate: 'CASCADE',
      });
    }
  }
  Producing.init({
    productionBatch: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,  // 确保 productionBatch 字段唯一
    },
    batchSequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('PREPARING', 'PROCESSING', 'COMPLETED', 'RESTART', 'CLOSE', 'DELETE', 'O'),
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
    completionTime: DataTypes.DATE,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Producing',
    timestamps: true
  });
  return Producing;
};