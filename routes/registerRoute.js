import express from 'express'
import { registerController } from '../controllers/registercontroller.js';

const router = express.Router();

//Routes POST
router.post("/register", registerController);

export {router};