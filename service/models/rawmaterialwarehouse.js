'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RawMaterialWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RawMaterialWarehouse.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
      RawMaterialWarehouse.belongsTo(models.RawMaterial, { foreignKey: 'rawMaterialId', as: 'rawMaterial' });
    }
  }
  RawMaterialWarehouse.init({
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rawMaterialId: {
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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RawMaterialWarehouse',
    timestamps: true
  });
  return RawMaterialWarehouse;
};