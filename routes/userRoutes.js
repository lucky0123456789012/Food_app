import express from 'express';
import { deleteUserController, getUserController, updateUserController } from '../controllers/userController.js';
import { authmiddleware } from '../middlewares/authmiddleware.js';
const router = express.Router();

//Routes 
//get User
router.get('/getUser', authmiddleware, getUserController)


//Update
router.put('/updateUser', authmiddleware, updateUserController);

//Update
router.delete('/deleteUser/:id', authmiddleware, deleteUserController);
export {router};