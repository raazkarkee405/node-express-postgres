const jwt = require("jsonwebtoken");

let validateEmail = (email) => {
    var emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return emailReg.test(String(email).toLowerCase());
}

let createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_ACCESS, {
        expiresIn: "30s"
    });
}

let createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_REFRESH);
}


module.exports = {
    validateEmail,
    createAccessToken,
    createRefreshToken
}