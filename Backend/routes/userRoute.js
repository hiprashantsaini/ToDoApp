const express=require('express');
const userController=require('../controllers/userController');

const userRoute=express.Router();

userRoute.post('/signup',userController.signupUser);

userRoute.post('/login',userController.loginUser);

userRoute.post('/addtodo',userController.addToDo);

userRoute.post('/donetask',userController.doneToDo);

userRoute.post('/deletetodo',userController.deleteToDo);

userRoute.post('/updatetodo',userController.updateToDo);





module.exports=userRoute;