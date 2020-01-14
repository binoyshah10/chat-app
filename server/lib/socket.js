const messageController = require('../controllers/messageController');

module.exports = (io) => {

    let subscribedChannels = []

    io.on('connection', socket => {

        const pub = require('redis').createClient();
        const sub = require('redis').createClient();

        console.log('client connected')
        console.log( socket.client.conn.server.clientsCount + " users connected" );

         pub.pubsub('channels', (err, channels) => {
            if (err) {
                console.log(err);
            } else {
                subscribedChannels = channels.slice();
            }
        });
    
        // subscribing to channels
        socket.on('setTeamChannel', data => {
            console.log('Subscribed channels ' + subscribedChannels.toString());

            const { team, channel } = data;
            const redisChannel = `${team.name}-${channel.name}`;

            // check if channel is subscribed
            if(!subscribedChannels.includes(redisChannel)) {
                sub.subscribe(redisChannel);
                subscribedChannels.push(redisChannel);
            } 
        })
    
        socket.on('sendMessage', data => {
            // console.log(data);
            data['createdAt'] = new Date();

            const { team, channel } = data;
            const redisChannel = `${team.name}-${channel.name}`;
            
            pub.publish(redisChannel, JSON.stringify(data));
            messageController.storeMessage(data);
        })

        
        sub.on("message", (channel, data) => {
            // console.log("sub channel " + channel + ": " + data);
            io.emit('receiveMessage', JSON.parse(data));
            
            io.clients((error, clients) => {
                if (error) throw error;
                // console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
            });

        });

        socket.on('error', err => {
            console.log(error);
        })
    })
}
