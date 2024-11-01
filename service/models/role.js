'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User)
    }
  }
  Role.init({
    roleName: {
        type: DataTypes.STRING,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true, // 自动更新数据库的时间戳
  });
  return Role;
};