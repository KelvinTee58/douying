'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company",
      });
      Product.belongsTo(models.RawMaterial, {
        foreignKey: "rawMaterialId",
        as: "rawMaterial",
      });
    }
  }
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: DataTypes.INTEGER,
    rawMaterialId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: DataTypes.DATE,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true
  });
  return Product;
};