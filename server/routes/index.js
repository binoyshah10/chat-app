const express = require('express');
const router  = express.Router();
const jwt = require('express-jwt');
// const auth = jwt({ secret: process.env.JWT_SECRET });

// Require controller modules
const userController = require('../controllers/userController');

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', (req, res) => {
    res.send('hello')
})

module.exports = router;