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