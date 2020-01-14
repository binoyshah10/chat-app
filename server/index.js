const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');

const models = require('./models');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(cors({
  credentials: true, 
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept']
}));

app.use(jwt({
  secret: process.env.JWT_SECRET, 
  isRevoked: blacklist.isRevoked,
  getToken: (req) => {
    if(req.cookies.jwt) {
      return req.cookies.jwt
    }
    return null;
  }
}).unless({path: ['/signup', '/login']}));

app.use(routes);

app.use(function(err, req, res, next) {
  console.log(err);
  if(err.name === 'UnauthorizedError') {
    res.status(err.status).send({message:err});
    return;
  }
  next();
});

const server = http.createServer(app);
const io = socketio(server);
// app.set('socketio', io);

const messaging = require('./lib/socket.js')(io);

models.sequelize.sync().then(() => {
    server.listen(PORT, () => {console.log(`Server has started on ${PORT}`)});
});

