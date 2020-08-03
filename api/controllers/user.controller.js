const User = require('../models/user.model');
const db = require('../../database/postgres');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    response
} = require('../../app/app');
const helper = require('../utilities/helper');
const RefreshToken = require('../models/refresh_tokens.model');

// get all users
let getAllUser = async (req, res) => {
    try {
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                invitedby: req.userData.userId
            }
        });
        if (result) {
            return res.status(200).json({
                message: "success",
                result: result
            })
        } else {
            return res.status(400).json({
                message: "Not found",
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// get my profile
let getMyProfile = async (req, res) => {
    try {
        const result = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.userData.userId
            }
        });
        if (result) {
            return res.status(200).json({
                message: "success",
                result: result
            })
        } else {
            return res.status(400).json({
                message: "User details not found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// Create a new user

let signUpUser = async (req, res) => {
    try {
        let user = {};
        let username = req.body.username;
        let email = req.body.email;
        let password = req.hashPassword;
        let userObj = await User.create({
            username: username,
            email: email,
            password: password
        })
        //  console.log("User",userObj);
        if (!userObj) {
            throw new Error("something went wrong");
        }
        user["email"] = userObj.email;
        user["username"] = userObj.username;
        return res.status(200).json({
            message: "success",
            result: user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// user login
let userLogin = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        //    console.log('user', user);
        if (user) {
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: "Invalid credential"
                    });
                }
                if (result) {
                    let payload = {
                        email: user.email,
                        userId: user.id
                    }
                    let accessToken = helper.createAccessToken(payload);
                    let refreshToken = helper.createRefreshToken(payload);
                    let myRefreshToken = await RefreshToken.findOne({
                        where: {
                            userId: user.id
                        }
                    })
                    if (myRefreshToken) {
                        var rToken = await RefreshToken.update({
                            tokens: refreshToken
                        }, {
                            where: {
                                userId: user.id,
                            }
                        })
                    } else {
                        var rToken = await RefreshToken.create({
                            userId: user.id,
                            tokens: refreshToken
                        })
                    }
                    console.log("refresh token", rToken);
                    return res.status(200).json({
                        message: "Login Successful",
                        access_token: accessToken,
                        refresh_token: refreshToken
                    });
                } else {
                    res.status(400).json({
                        message: 'Invalid credential'
                    })
                }
            })
        } else {
            throw new Error('Invalid credential');
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// Get Access Tokens
let getAccessToken = async (req, res) => {
    try {
        console.log("tokens", req.body.refresh_token)
        if (!req.body.refresh_token && req.body.refresh_token !== RefreshToken.tokens) {
            throw new Error("Refresh token is required")
        }
        let refreshToken = req.body.refresh_token
        const decoded = jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH);
        let myRefreshToken = await RefreshToken.findOne({
            where: {
                userId: decoded.userId
            }
        })
        console.log("my refresh", myRefreshToken);
        if (!myRefreshToken) {
            throw new Error("Invalid Refresh Token");
        }
        let payload = {
            email: decoded.email,
            userId: decoded.userId
        }
        let accessToken = helper.createAccessToken(payload);
        return res.status(200).json({
            message: "Success",
            access_token: accessToken
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// user logout
let userLogout = async (req, res) => {
    try {
        const result = await RefreshToken.destroy({
            where: {
                userId: req.userData.userId
            }
        })

        console.log("token deleted", result);
        if (result) {
            return res.status(200).json({
                message: "Logout successful"
            })
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

//Add member 
let addMember = async (req, res) => {
    try {
        let user = {};
        let username = req.body.username;
        let email = req.body.email;
        let password = req.hashPassword;
        let userObj = await User.create({
            username: username,
            email: email,
            password: password,
            invitedby: req.userData.userId
        })
        //  console.log("User",userObj);
        if (!userObj) {
            throw new Error("Something went wrong");
        }
        user["email"] = userObj.email;
        user["username"] = userObj.username;
        user["Created By"] = req.userData.email
        return res.status(200).json({
            message: "New Member Added Successfully",
            result: user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

//Delete a Member 
let deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.destroy({
            where: {
                id: id,
                invitedby: req.userData.userId

            }
        })
        //     console.log('deleted', result);
        if (result) {
            return res.status(200).json({
                message: "User Deleted Successfully"
            })
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }
    } catch (error) {
        //     console.log("error", error);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

// Update user and member details
let updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let results = null
        let query = {}
        //      console.log(typeof(id), typeof(req.userData.userId));
        if (id === req.userData.userId) {
            query["id"] = id
            results = await User.findOne({
                where: query
            });
        } else {
            query["id"] = id
            query["invitedby"] = req.userData.userId
            results = await User.findOne({
                where: query
            });
        }
        //       console.log("query", query);
        //       console.log("result data", results);
        if (results) {
            const usrObj = await User.update({
                username: req.body.username,
                phone: req.body.phone,
                address: req.body.address,
            }, {
                where: query,
                returning: true,

            })
            //      console.log('user object', usrObj);
            if (!usrObj) {
                throw new Error('Something went wrong');
            } else {
                const result = await User.findOne({
                    attributes: {
                        exclude: ['password']
                    },
                    where: query
                });
                // delete user.password;
                return res.status(200).json({
                    message: "User details Updated Successfully",
                    result: result
                })
            }
        } else {

            return res.status(400).json({
                message: "User not found"
            })
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


module.exports = {
    getAllUser,
    getMyProfile,
    signUpUser,
    userLogin,
    addMember,
    deleteMember,
    updateUser,
    getAccessToken,
    userLogout
}