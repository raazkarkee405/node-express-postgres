const Sequelize = require('sequelize');
const db = require('../../database/postgres');

const refreshToken = db.define('refresh_tokens', {
    userId: {
        type: Sequelize.INTEGER
    },
    tokens: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = refreshToken;