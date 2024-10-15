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
        onDelete: "NULL",
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
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      loginAttempts: DataTypes.INTEGER,
      lockUntil: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // 自动更新数据库的时间戳
    }
  );
  return User;
};
