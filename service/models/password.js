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
        onDelete: "NULL",
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Password.init(
    {
      originalPassword: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Password",
    }
  );
  return Password;
};
