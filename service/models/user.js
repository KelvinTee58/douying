"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        onDelete: "SET NULL",
        foreignKey: {
          allowNull: false,
        },
      });
      // define association here
      User.hasOne(models.Password);
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: DataTypes.STRING,
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
