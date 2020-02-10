const models = require('../models');
const {promisify} = require('util');
const client = require('../lib/redis');

// Requiring User model
const Message = models.Message;

// redis promisified functions
const existsAsync = promisify(client.exists).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);

exports.storeMessage = (data) => {
    
    const { team, channel } = data;
    data['createdAt'] = new Date();
    
    const redisChannel = `${team.name}-${channel.name}`;

    // check if set to store channel names exists
    existsAsync('channelsSet').then(res => {
        if(res === 0) { // channelSet does not exists
            const channelsSet = ['channelsSet', redisChannel];
            saddAsync(channelsSet).then(res => {

            })
        } else { 
            
            // check if redis set has a list for channel
            // if not, then create a new list for that channel
            sismemberAsync('channelsSet', redisChannel).then(res => {
                if(res === 0) { // list for channel does not exists
                    const channelList = [redisChannel, JSON.stringify(data)]
                    lpushAsync(channelList).then(res => {
                        client.ltrim(redisChannel, 0, 24);   // trim redis list to 25 messages
                    })
                } else {
                    lpushAsync(redisChannel, JSON.stringify(data)).then(res => {
                        client.ltrim(redisChannel, 0, 24);   // trim redis list to 25 messages
                    })
                }
            })
        }
    })

    // store message in postgres
    const messageData = {
        text: data.message,
        channelId: data.channel.id,
        userId: data.user.id
      }

    Message.create(messageData).then(message => {
        console.log('Message insertion into psql succeeded');
    })
    .catch(err => {
      console.log('Message insertion into psql failed' + err);
    })
}

exports.getMessages = (req, res) => {
    const { team, channel } = req.body
    const redisChannel = `${team.name}-${channel.name}`;

    lrangeAsync(redisChannel, 0, -1).then(messages => {
        messages = messages.map(messageData => JSON.parse(messageData));
        res.json({
            success: true,
            payload: {teamChannelName: redisChannel, messages}
        });
    }).catch(err => {
        res.json({
            success: false,
            message: 'Unable to get messages'
        })
    })
}