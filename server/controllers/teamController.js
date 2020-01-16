const models = require('../models');

// Requiring models
const Team = models.Team;
const User = models.User;
const Channel = models.Channel;

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

exports.addTeam = (req, res) => {
    const { teamName, user } = req.body;

    // Create new team
    Team.findOne({
        where: {                
            name: teamName
        }
    }).then(team => {
        if(!team) {
                console.log(teamName)
                Team.create({ name: teamName })
                    .then(team => {
                        console.log(team)
                        // Associate user and team
                        team.setUsers(user.id);  
                        console.log(team)
                        // Create new channel
                        Channel.create({ name: 'general' })
                            .then(channel => {
                                console.log(channel)
                                channel.setTeam(team.id);
                                res.json({ 
                                    success: true,
                                    message: `Team ${team.name} and channel ${channel.name} were created`
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                Team.destroy({
                                    where: {
                                        id: team.id
                                    }
                                })
                                res.json({
                                    success: false,
                                    message: `Team and channel couldn't be created ${err}`
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    res.json({
                        success: false,
                        message: `Team couldn't be created ${err}`
                    })
                  })
        }
        else {
            res.json({
                sucess: false,
                message: 'Team already exists!'
            });
        }
    }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            message: err + " # Add Team query failed!"
        })
    })

}