const Validator = require('validator');
const isEmpty = require('../isEmpty');
const helper = require('../../utilities/helper');

module.exports = function createUserValidation(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "username is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "email is required";
    } else if (!helper.validateEmail(data.email)) {
        errors.email = 'invalid email';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}