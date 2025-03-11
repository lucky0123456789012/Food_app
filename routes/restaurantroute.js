import express from 'express';
import { createRestaurantController, getAllRestaurantController } from '../controllers/restaurantcontroller.js';
import { authmiddleware } from '../middlewares/authmiddleware.js';
const router = express.Router(); 

//Routes 
//get User
router.post('/create', authmiddleware, createRestaurantController);

//get All Restaurents
router.get('/getallRestaurant', getAllRestaurantController);

//Update
//router.put('/updateUser', authmiddleware, updateUserController);

//Update
//router.delete('/deleteUser/:id', authmiddleware, deleteUserController);
export {router};