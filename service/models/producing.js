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
        foreignKey: 'operator',
        as: 'user'
      });
    }
  }
  Producing.init({
    productionBatch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('PREPARING', 'PROCESSING', 'COMPLETED', 'RESTART', 'O'),
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