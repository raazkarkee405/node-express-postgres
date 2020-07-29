const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/checkAuth.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const helperController = require('../controllers/helper.controller');

module.exports = (app,version)=>{
   let moduleName = '/user';

/***************************** Get All User***************************/
    app.get(version + moduleName,
        checkAuth,
        userController.getAllUser
        )
/****************************** User Signup **************************/
    app.post(version + moduleName + '/signup',
        userMiddleware.validateCreateUserParams, 
        helperController.isEmailUnique,
        helperController.createHashPassword, 
        userController.signUpUser
        )
/****************************User Login******************************/     
    app.post(version + moduleName + '/login',
        userController.userLogin
        )
/****************************** Add member**************************/ 
    app.post(version + moduleName + '/add-member',
        checkAuth, 
        userMiddleware.validateCreateUserParams,
        helperController.isEmailUnique,
        helperController.createHashPassword,
        userController.addMember

    )
/******************************Get Myprofile**************************/ 
    app.get(version + moduleName + '/my-profile',
        checkAuth, 
        userController.getMyProfile
        )

/******************************Delete A Member**************************/ 
    app.delete(version + moduleName + '/:id', 
        checkAuth,
        userController.deleteMember
    )

/******************************Update Member****************************/
    app.patch(version + moduleName + '/:id', 
        checkAuth,
        userMiddleware.validateUpdateUserParams,
        userController.updateUser
    )

    
}
