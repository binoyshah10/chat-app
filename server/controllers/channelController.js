const models = require('../models');
const Op = models.Sequelize.Op

// Requiring models
const Team = models.Team;
const User = models.User;
const Channel = models.Channel;

exports.getChannelsForTeam = (req, res) => {
    Channel.findAll({
        attributes: ['id','name', 'public', 'dm'],
        where: {
            teamId: req.body.teamId,
          }
    }).then(channels => {
        channels = channels.map(channel => channel.dataValues)
        res.json({
            success: true,
            message: `Queried channels for team ${req.body.teamName} from DB!`,
            payload: channels
        });
    })
}

exports.addChannel = (req, res) => {
    const { channelName, team, user } = req.body;
    // Create new team
    Channel.findOne({
        where: {
            [Op.and] : [
                {
                    name: channelName
                },
                {
                    teamId: team.id
                }
            ]
        }
    }).then(channel => {
        if(!channel) {
                Channel.create({ name: channelName })
                    .then(channel => {
                        // Associate team with this channel
                        channel.setTeam(team.id);

                        User.findAll({
                            include: [{
                                attributes: [],
                                model: Team,
                                where: { id: team.id }
                            }]
                        }).then(users => {
                            if(users) {
                                channel.addUsers(users);
                            }
                            res.json({ 
                                success: true,
                                message: `Channel ${channel.name} was created`,
                                payload: {
                                    channel: {id: channel.id, name: channel.name, public: channel.public, dm: channel.dm}
                                }
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: `Channel couldn't be created ${err}`
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            success: false,
                            message: `Channel couldn't be created ${err}`
                        })
                  })
        }
        else {
            res.json({
                sucess: false,
                message: 'Channel already exists!'
            });
        }
    }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            message: err + " # Add Channel query failed!"
        })
    })

}