const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');

// Require controller modules
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');

// User Routes
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/isAuthenticated', userController.isAuthenticated);
router.post('/getAllTeams', teamController.getAllTeams);

router.get('/', (req, res) => {
    res.send('hello');
})


module.exports = router;