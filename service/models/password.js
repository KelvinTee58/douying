"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Password.hasOne(models.User);
      // define association here
      Password.belongsTo(models.User, {
        foreignKey: {
          name: 'userId', // 外键名称与 User 模型中的字段名一致
          allowNull: false,
        },
        onDelete: "CASCADE", // 用户删除时，自动删除关联的密码
        onUpdate: "CASCADE", // 用户更新时，自动更新外键
      });
    }
  }
  Password.init(
    {
      originalPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Password",
      timestamps: true, // 自动更新数据库的时间戳
    }
  );
  return Password;
};
