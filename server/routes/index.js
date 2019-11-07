const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
// const auth = jwt({ secret: process.env.JWT_SECRET });

// Require controller modules
const userController = require('../controllers/userController');

// User Routes
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/isAuthenticated', userController.isAuthenticated);

router.get('/', (req, res) => {
    res.send('hello');
})


module.exports = router;