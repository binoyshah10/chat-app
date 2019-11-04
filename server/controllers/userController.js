const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklist = require('express-jwt-blacklist');
const models = require('../models');
const Op = models.Sequelize.Op

// Requiring User model
const User = models.User;

exports.signUpUser = (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.lastName,
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
        if(!user) {
            // hash password with bcrypt
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
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
                        message: err
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
                    let jwtToken = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
                        expiresIn: 1440,
                        subject: user.dataValues.username,
                      })
                    res.cookie('jwt', jwtToken, { httpOnly: true })
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        payload: user.dataValues
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