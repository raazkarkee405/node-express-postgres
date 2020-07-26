const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize('mytestdb','postgres','password123', {
    host: 'localhost',
    // user: 'postgres',
    // password: 'password123',
    // db: 'mytestdb'
    dialect: 'postgres',

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    }
})