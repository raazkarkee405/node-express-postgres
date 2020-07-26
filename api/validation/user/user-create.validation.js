const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function createUserValidation(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";
   // data.phone = !isEmpty(data.phone) ? data.phone: "";
  //  data.address = !isEmpty(data.address) ? data.address: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";

    if (Validator.isEmpty(data.username)){
        errors.username = "username is required";
    }
    // if (Validator.isEmpty(data.phone)){
    //     errors.phone = "phone is required";
    // }
    // if (Validator.isEmpty(data.address)){
    //     errors.address = "address is required";
    // }
    if (Validator.isEmpty(data.email)){
        errors.email = "email is required";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}