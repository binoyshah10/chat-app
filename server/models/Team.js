module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, { underscored: true });
  
    Team.associate = (models) => {
      Team.belongsToMany(models.User, {
        through: models.TeamMember,
        foreignKey: {
          name: 'teamId',
          field: 'team_id',
        },
      });
    };
  
    return Team;
  };