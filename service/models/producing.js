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
        as: 'user',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Producing.init({
    productionBatch: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.STRING,
      allowNull: false
    },
    completionTime: DataTypes.DATE,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Producing',
    timestamps: true
  });
  return Producing;
};