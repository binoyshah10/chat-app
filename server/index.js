const express = require('express');
const socketio = require('socket.io');
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

app.use(jwt({secret: process.env.JWT_SECRET, isRevoked: blacklist.isRevoked}).unless({path: ['/register', '/login']}));

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

models.sequelize.sync().then(() => {
    server.listen(PORT, () => {console.log(`Server has started on ${PORT}`)});
});


