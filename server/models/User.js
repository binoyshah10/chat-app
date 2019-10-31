'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
  }, { underscored: true });

  return User;
};