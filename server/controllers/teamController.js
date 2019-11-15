const models = require('../models');

// Requiring User model
const Team = models.Team;
const User = models.User;

exports.getAllTeams = (req, res) => {
    Team.findAll({
        attributes: ['id','name'],
        include: [{
            attributes: [],
            model: User,
            where: { id: req.body.id}
        }]
    }).then(teams => {
        teams = teams.map(team => team.dataValues)
        res.json({
            success: true,
            message: 'Queried all teams from DB!',
            payload: teams
        });
    })
}