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
    }
  }
  Product.init({
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    specification: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    companyId: DataTypes.INTEGER,
    computeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(50),
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