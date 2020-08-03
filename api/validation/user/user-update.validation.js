const isEmpty = require('../isEmpty');
const Validator = require('validator')

module.exports = function validateUpateProfileParam(data) {
    let errors = {};
    console.log(data);
    if (data.hasOwnProperty('username')) {
        data.username = !isEmpty(data.username) ? data.username : "";
        if (Validator.isEmpty(data.username)) {
            errors.username = "Name cannot be empty"
        }
    }
    if (data.hasOwnProperty('phone')) {
        data.phone = !isEmpty(data.phone) ? data.phone : "";
        if (Validator.isEmpty(data.phone)) {
            errors.phone = "Phone Number cannot be empty"
        }
    }
    if (data.hasOwnProperty('address')) {
        data.address = !isEmpty(data.address) ? data.address : "";
        if (Validator.isEmpty(data.address)) {
            errors.address = "Address cannot be empty"
        }
    }
    if (data.hasOwnProperty('password')) {
        errors.password = "Password can't be updated"
    }

    if (data.hasOwnProperty('email')) {
        errors.email = "Email can't be updated"
    }

    // if(data.hasOwnProperty('email')){
    //     data.email = !isEmpty(data.email) ? data.email :"";
    //     if(Validator.isEmpty(data.email)){
    //         errors.email = "Email cannot be empty"
    //     }
    // }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}