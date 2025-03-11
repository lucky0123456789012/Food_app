import express from 'express'
import { registerController, loginController } from '../controllers/registercontroller.js';

const router = express.Router();

//Routes 
// REGISTER || POST
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

export {router};