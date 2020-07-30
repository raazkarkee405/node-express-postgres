const User = require('../models/user.model');
const db = require('../../database/postgres');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require('../../app/app');
const { findAll, findOne } = require('../models/user.model');


// get all users
let getAllUser = async (req,res)=>{
    try {
        const result = await User.findAll({
            attributes: {exclude: ['password']},
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
                message:"Not found",
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
    try{
        const result = await User.findOne({
            attributes: {exclude: ['password']},
            where: {
                id: req.userData.userId
            }
        });
        if(result){
            return res.status(200).json({
                message:"success",
                result:result
            })
        }else{
            return res.status(400).json({
                message: "User details not found"
            })
        }
    }catch(error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// Create a new user

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
  //  console.log("User",userObj);
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
    //    console.log('user', user);
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
                        message: "Login Successful",
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
  //  console.log("User",userObj);
    if(!userObj){
        throw new Error("Something went wrong");
    }
    user["email"] = userObj.email;
    user["username"] = userObj.username;
    user["Created By"] = req.userData.email
    return res.status(200).json({
        message: "New Member Added Successfully",
        result: user
    })
    }
    catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

//Delete a Member 
let deleteMember = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await User.destroy({
            where: {
               id: id,
               invitedby: req.userData.userId
                
            }
        })
   //     console.log('deleted', result);
        if(result){
            return res.status(200).json({
                message:"User Deleted Successfully"           
            })
        }
        else{
            return res.status(400).json({
                message: "user not found"
            })
        }
    }
    catch(error){
   //     console.log("error", error);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

// Update user and member details
let updateUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        let results = null
        let query = {}
  //      console.log(typeof(id), typeof(req.userData.userId));
        if (id === req.userData.userId){
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
        if(results){
            const usrObj = await User.update(
                {
                    username: req.body.username,
                    phone: req.body.phone,
                    address: req.body.address,
                },
                {  
                    where: query,
                    returning: true,
                   
                } 
            )
  //      console.log('user object', usrObj);
            if(!usrObj){
                throw new Error('Something went wrong');
            }
            else{
                return res.status(200).json({
                    message: "User details Updated Successfully",
                    result: usrObj[1][0]
                })
            }
        }else{
        
            return res.status(400).json({
                message: "User not found"
            })
        }
       
    }catch(error){
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
    updateUser
}