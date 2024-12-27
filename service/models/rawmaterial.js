'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RawMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RawMaterial.belongsTo(models.Company, { foreignKey: 'companyId' });
    }
  }
  RawMaterial.init({
    materialName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    companyId: DataTypes.INTEGER,
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    computeUnit: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: DataTypes.DATE,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RawMaterial',
    timestamps: true, // 自动更新数据库的时间戳
  });
  return RawMaterial;
};