const createUserValidation = require('../validation/user/user-create.validation');
const updateUserValidation = require('../validation/user/user-update.validation')

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

/******************************** Validate Update User Params ***********************/
let validateUpdateUserParams = (req, res, next)=>{
    const {errors, isValid} = updateUserValidation(req.body);
    if(!isValid){
        return res.status(400).json({
            errors
        })
    }else{
        next();
    }
}

module.exports = {
    validateCreateUserParams,
    validateUpdateUserParams
    
}