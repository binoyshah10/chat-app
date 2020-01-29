const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklist = require('express-jwt-blacklist');
const models = require('../models');
const Op = models.Sequelize.Op
const teamController = require('../controllers/teamController');

// Requiring models
const Team = models.Team;
const User = models.User;
const Channel = models.Channel;

exports.signUpUser = (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }
    const teamName = req.body.teamName;
		const joinNewTeam = req.body.joinNewTeam

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

                    let userData = {
                        id: user.id,
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        username: user.username, 
                        email: user.email
                    };

                    // Check status of joinNewTeam
                    if(joinNewTeam) {
                        // Create new team and channel
                        teamController.addTeam(teamName, user).then(response => {
                            if (response.success === true) {
                                let jwtToken = jwt.sign(userData, process.env.JWT_SECRET, {
                                    expiresIn: '6h',
                                    subject: user.dataValues.username,
                                  })
                                res.cookie('jwt', jwtToken, { httpOnly: true })
                                res.json({ 
                                    success: true,
                                    message: user.email + ' signed up!', 
                                    payload: userData
                                })
                            } else {
                                // new team creation failed
                                res.json({ 
                                    success: false,
                                    message: response.message 
                                })
                            }
                        })
                    } else { 
                        // join existing team
                        Team.findOne({
                            where: {
                                name: teamName 
                            }
                        }).then(team => {
                            // console.log(team)
                            if(team) {
                                // team found
                                Channel.findAll({
                                    where: {
                                            teamId: team.dataValues.id,
                                        }
                                }).then(channels => {
                                    team.addUser(user.id);  
                                    channels.forEach(channel => {
                                        channel.addUser(user.id)
                                    })
                                    let jwtToken = jwt.sign(userData, process.env.JWT_SECRET, {
                                        expiresIn: '6h',
                                        subject: user.dataValues.username,
                                      })
                                    res.cookie('jwt', jwtToken, { httpOnly: true })
                                    res.json({ 
                                        success: true,
                                        message: user.email + ' signed up!',
                                        payload: userData 
                                    })
                                }).catch(
                                    // channel finding query error
                                )
                            } else {
                                // team not found
                                res.json({
                                    success: false,
                                    message: "Team doesn't exist, couldn't create user"
                                })
                            }
                        }).catch(
                            // team finding query error
                        );
                    }
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
                        id: user.id,
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        username: user.username, 
                        email: user.email
                    };
                    let jwtToken = jwt.sign(userData, process.env.JWT_SECRET, {
                        expiresIn: '6h',
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
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: "User has successfully logged out"
    })
}

exports.isAuthenticated = (req, res) => {
    const userData = {
        id: req.user.id,
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

exports.searchUser = (req, res) => {
    const userName = req.query.userName;
    
    User.findAll({
        attributes: ['firstName', 'lastName', 'email'],
        where: {
            [Op.or] : [
                {
                    firstName: { [Op.iLike]: `%${userName}%` }
                },
                {
                    lastName: { [Op.iLike]: `%${userName}%` }
                }
            ]
        }
      }).then(users => {
          users = users.map(user => {
              return {
                  value: `${user.dataValues.email}`, 
                  label: `${user.dataValues.firstName} ${user.dataValues.lastName}`
                }});
          res.json(users);
      })
}

exports.addUsersToTeam = (req, res) => {
    const { usersEmails, teamInfo } = req.body;
    User.findAll({
        where: {
            [Op.or] : usersEmails
        }
    }).then(users => {
        Team.findOne({
            where: {                
                name: teamInfo.name
            }
        }).then(team => {
            team.addUsers(users).then(response => {
                res.json({ 
                    success: true,
                    message: `The selected users were added to Team ${team.name}`,
                })
            })
            .catch(err => {
                res.json({ 
                    success: false,
                    message: `The selected users couldn't be added to Team ${team.name}`,
                })
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: `Could not find Team ${teamInfo.name}`
            })
        })
    })
}
