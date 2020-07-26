const createUserValidation = require('../validation/user/user-create.validation');
// const changePasswordValidation = require('../validation/user/changepassword.validation');
// const userOtpValidation = require('../validation/user/user-otp.validation');

/******************************** Validate Create User Params ***********************/
let validateCreateUserParams = (req,res,next)=>{
    const { errors , isValid} = createUserValidation(req.body);
    if(!isValid){
        return res.status(400).json({
            errors
        })
    }else{
       next();
    }
}
/******************************** Validate Change Password params ***************************/
// let validateChangePasswordParams = (req,res,next)=>{
//     const { errors , isValid} = changePasswordValidation(req.body);
//     if(!isValid){
//         return res.status(400).json({
//             errors
//         })
//     }else{
//        next();
//     }
// }

// /************************Validate Otp Params ***************************/
// let validateOtpParams = (req,res,next)=>{
//     const { errors , isValid} = userOtpValidation(req.body);
//     if(!isValid){
//         return res.status(400).json({
//             errors
//         })
//     }else{
//        next();
//     }
// }
module.exports = {
    validateCreateUserParams
    // validateChangePasswordParams,
    // validateOtpParams
}