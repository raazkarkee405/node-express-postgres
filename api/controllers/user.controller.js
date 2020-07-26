const User = require('../models/user.model');
const db = require('../../database/postgres');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require('../../app/app');


let getAllUser = async (req,res)=>{
    try {
        const result = await User.findAll({
            where: {
                invitedby: req.userData.userId
            }
        });
        if(result){
            return res.status(200).json({
                message:"success",
                result:result
            })
        }
        else{
            return res.status(400).json({
                message:"error",
                result:result
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// // Create a new user
// const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
// console.log("Jane's auto-generated ID:", jane.id);

let signUpUser = async (req, res) => {
    try{
        let user = {};
        let username = req.body.username;
        let email = req.body.email;
        let password = req.hashPassword;
        let userObj = await User.create({
        username: username,
        email: email,
        password: password
    })
    console.log("User",userObj);
    if(!userObj){
        throw new Error("something went wrong");
    }
    user["email"] = userObj.email;
    user["username"] = userObj.username;
    return res.status(200).json({
        message: "success",
        result: user
    })
    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

// user login
let userLogin = async (req, res) => {
    try{
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        console.log('user', user);
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(400).json({
                      message: "Invalid credential"
                    });
                  }
                  if (result) {
                    const token = jwt.sign(
                      {
                        email: user.email,
                        userId: user.id
                      },
                      process.env.JWT_KEY,
                      {
                          expiresIn: "1h"
                      }
                    );
                    return res.status(200).json({
                        message: "Successful",
                        token: token
                      });
                  }else{
                      res.status(400).json({
                          message: 'Invalid credential'
                      })
                  }      
            })
        }else{
            throw new Error('Invalid credential');
        }

    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

//Add member 
let addMember = async(req, res) => {
    try{
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
    console.log("User",userObj);
    if(!userObj){
        throw new Error("something went wrong");
    }
    user["email"] = userObj.email;
    user["username"] = userObj.username;
    user["your email"] = req.userData.email
    return res.status(200).json({
        message: "success",
        result: user
    })
    }
    catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllUser,
    signUpUser,
    userLogin,
    addMember
}