const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');

// Require controller modules
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');
const channelController = require('../controllers/channelController');
const messageController = require('../controllers/messageController');

// User Routes
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/isAuthenticated', userController.isAuthenticated);
router.get('/searchUser', userController.searchUser)
router.post('/addUsersToTeam', userController.addUsersToTeam)

// Teams routes
router.post('/getAllTeams', teamController.getAllTeams);
router.post('/addTeam', teamController.addTeamHandler);

// Channel routes
router.post('/getChannels', channelController.getChannelsForTeam);
router.post('/addChannel', channelController.addChannel);

// Message routes
router.post('/getMessages', messageController.getMessages);

router.get('/', (req, res) => {
    res.send('hello');
})


module.exports = router;