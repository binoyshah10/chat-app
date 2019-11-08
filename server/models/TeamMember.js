module.exports = (sequelize, DataTypes) => {
    const TeamMember = sequelize.define('TeamMember', {
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {  tableName: 'team_member' });
  
    return TeamMember;
  };