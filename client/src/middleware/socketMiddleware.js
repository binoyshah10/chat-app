import io from "socket.io-client";

const socketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case 'SOCKET_CONNECT':
        if (socket !== null) {
          socket.disconnect();
        }
        // connect to the remote host
        socket = io('http://localhost:5000');
        
        socket.on('connect', () => {
            console.log('socket connected')
        })
        
        socket.on("receiveMessage", (message) => {
            console.log('Message received', message)
            store.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                payload : message
            });
        });
        
        break;

      case 'SOCKET_DISCONNECT':
        if (socket !== null) {
          socket.disconnect();
        }
        socket = null;
        console.log('socket disconnected');
        break;

      case 'SEND_SOCKET_MESSAGE':
        console.log('Sending socket message', action.payload);
        socket.emit(action.payload.socketChannel, action.payload.data);
        break;

      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();