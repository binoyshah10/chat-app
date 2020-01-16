const models = require('../models');

// Requiring User model
const Channel = models.Channel;

exports.getChannelsForTeam = (req, res) => {
    Channel.findAll({
        attributes: ['id','name', 'public', 'dm'],
        where: {
            teamId: req.body.teamId,
          }
    }).then(channels => {
        channels = channels.map(channel => channel.dataValues)
        console.log(channels)
        res.json({
            success: true,
            message: `Queried channels for team ${req.body.teamName} from DB!`,
            payload: channels
        });
    })
}

exports.addChannel = (req, res) => {
    const { teamName, user } = req.body;

    // Create new team
    Team.findOne({
        where: {                
            name: teamName
        }
    }).then(team => {
        if(!team) {
                Team.create({ name: teamName })
                    .then(team => {
                        // Associate user and team
                        team.setUsers(user.id);  
                        // Create new channel
                        Channel.create({ name: 'general' })
                            .then(channel => {
                                channel.setTeam(team.id);
                                channel.setUsers(user.id);  
                                res.json({ 
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