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

exports.addTeamHandler = (req, res) => {
    const { teamName, user } = req.body;
    this.addTeam(teamName, user)
        .then(response => res.json(response))
        .catch(response => res.status(409).json(response))
}

exports.addTeam = (teamName, user) => {
    return new Promise((resolve, reject) => {
        Team.findOne({
            where: {                
                name: teamName
            }
        }).then(team => {
            if(!team) {
                    Team.create({ name: teamName })
                        .then(team => {
                            // Associate user and team
                            team.addUser(user.id);  
                            // Create new channel
                            Channel.create({ name: 'general' })
                                .then(channel => {
                                    channel.setTeam(team.id);
                                    channel.addUser(user.id);  

                                    resolve({ 
                                        success: true,
                                        message: `Team ${team.name} and channel ${channel.name} were created`,
                                        payload: {
                                            team: {id: team.id, name: team.name},
                                            channel: {id: channel.id, name: channel.name, public: channel.public, dm: channel.dm}
                                        }
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                    Team.destroy({
                                        where: {
                                            id: team.id
                                        }
                                    })
                                    reject({
                                        success: false,
                                        message: `Team and channel couldn't be created ${err}`
                                    })
                                })
                        })
                        .catch(err => {
                            console.log(err)
                            reject({
                                success: false,
                                message: `Team couldn't be created ${err}`
                            })
                      })
            }
            else {
                reject({
                    sucess: false,
                    message: 'Team already exists!'
                });
            }
        }).catch(err => {
            console.log(err)
            reject({
                success: false,
                message: err + " # Add Team query failed!"
            })
        })
    })
}