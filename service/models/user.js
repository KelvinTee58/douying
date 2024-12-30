"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        onDelete: 'SET DEFAULT',
        foreignKey: {
          allowNull: false,
        },
      });
      // define association here
      User.hasOne(models.Password);

      // 添加反向关系：User 可能有多个 InboundRecord
      User.hasMany(models.InboundRecord, {
        foreignKey: 'operator',
        onDelete: 'CASCADE',
      });

      User.hasMany(models.ProductInventoryRecord, {
        foreignKey: 'operator',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: DataTypes.STRING(100),
      loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lockUntil: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // 自动更新数据库的时间戳
    }
  );
  return User;
};
