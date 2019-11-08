'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
      firstName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The first name can only contain letters and numbers',
          },
          len: {
            args: [3, 25],
            msg: 'The first name needs to be between 3 and 25 characters long',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The last name can only contain letters and numbers',
          },
          len: {
            args: [3, 25],
            msg: 'The last name needs to be between 3 and 25 characters long',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The username can only contain letters and numbers',
          },
          len: {
            args: [3, 25],
            msg: 'The username needs to be between 3 and 25 characters long',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 100],
            msg: 'The password needs to be between 5 and 100 characters long',
          },
        },
      },
  }, { underscored: true });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: models.TeamMember,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    // N:M
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};