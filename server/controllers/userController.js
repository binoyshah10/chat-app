const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklist = require('express-jwt-blacklist');
const models = require('../models');
const Op = models.Sequelize.Op

// Requiring User model
const User = models.User;

exports.signUpUser = (req, res) => {
    console.log("here")
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.password,
        password: req.body.password
      }
    console.log(userData);
    User.findOne({
        where: {
            [Op.or] : [
                {
                    email: req.body.email
                },
                {
                    username: req.body.username
                }
            ]
        }
    }).then(user => {
        console.log(user)
        if(!user) {
            // hash password with bcrypt
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                console.log('here 2')
                User.create(userData)
                  .then(user => {
                    res.json({ 
                        success: true,
                        message: user.email + ' signed up!' 
                    })
                  })
                  .catch(err => {
                    res.json({
                        success: false,
                        message: err.errors[0]
                    })
                  })
              })
        }
        else {
            res.json({
                sucess: false,
                message: 'User already exists!'
            });
        }
    }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            message: err + " # Sign Up query failed!"
        })
    })
}

exports.loginUser = (req, res) => {
    console.log(req.body)
    if(req.body.emailOrUsername && req.body.password) {
        User.findOne({
            where: {
                [Op.or] : [
                    {
                        email: req.body.emailOrUsername || ''
                    },
                    {
                        username: req.body.emailOrUsername || ''
                    }
                ]
            }
        }).then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    let userData = {
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        username: user.username, 
                        email: user.email
                    };
                    let jwtToken = jwt.sign(userData, process.env.JWT_SECRET, {
                        expiresIn: 1440,
                        subject: user.dataValues.username,
                      })
                    res.cookie('jwt', jwtToken, { httpOnly: true })
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        payload: userData
                    });
                }
            }
            else {
                res.status(400).json({ 
                    success: false,
                    message: 'User does not exist or incorrect password' 
                })
            }
        }).catch(err => {
            res.json({
                success: false,
                message: err + " # Login query failed!"
            });
        })
    }
    else {
        res.json({
            success: false,
            message: "Email or Username not provided"
        })
    }  
}

exports.logoutUser = (req, res) => {
    blacklist.revoke(req.user)
    res.status(200).json({
        success: true,
        message: "User has successfully logged out"
    })
}

exports.isAuthenticated = (req, res) => {
    const userData = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
        email: req.user.email
    }
    
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        payload: userData
    })
}
