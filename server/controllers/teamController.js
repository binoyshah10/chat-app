const models = require('../models');

// Requiring User model
const Team = models.Team;
const User = models.User;

exports.getAllTeams = async (req, res) => {
    Team.findAll({
        include: [{
            model: User,
        }]
    }).then(teams => {
        console.log(teams[0].dataValues, teams[1].dataValues)
        res.json({
            success: true,
            message: 'Authentication successful!',
        });
    })
}