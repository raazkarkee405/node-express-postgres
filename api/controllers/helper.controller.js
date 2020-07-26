const User =  require('../models/user.model');
// create hash password
const bcrypt = require('bcrypt');
const { connect } = require('../../app/app');
let createHashPassword = async (req, res, next) => {
    try{
        let hash = await bcrypt.hash(req.body.password, 10);
        req.hashPassword = hash;
        next();

    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

// is email already exists
let isEmailUnique = async (req, res, next) => {
    try{
        const users = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        console.log("all user", users);
        if(users.length > 0){
            return res.status(400).json({
                message: "cannot reuse email"
            })
        }else{
            next();
        }     

    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createHashPassword,
    isEmailUnique
}