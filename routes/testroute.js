import express from 'express'
import { testController } from '../controllers/testcontroller.js';

const router = express.Router();

//Routes GET, POST, PUT, DELETE
router.get("/test-users", testController);

export {router};