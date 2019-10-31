const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser')

const models = require('./models');
const routes = require('./routes/index');

const jwt = require('express-jwt');


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cookieParser());

app.use(jwt({credentialsRequired: true, secret: process.env.JWT_SECRET}).unless({path: ['/register', '/login']}));

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err});
      return;
    }
    next();
});

app.use(routes);

const server = http.createServer(app);
const io = socketio(server);

models.sequelize.sync().then(() => {
    server.listen(PORT, () => {console.log(`Server has started on ${PORT}`)});
});


