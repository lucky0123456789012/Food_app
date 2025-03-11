import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from "cors";
import colors from 'colors';
import {router as testroute} from "./routes/testroute.js";
import { connectdb } from './config/db.js';
import {router as registerRoute} from "./routes/registerRoute.js";
import {router as userRoute} from "./routes/userRoutes.js";
import {router as restaurantRoute} from "./routes/restaurantroute.js"
const app = express();


dotenv.config();

//Database conenction
connectdb();


//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Route
app.use('/api/v1/test', testroute);
app.use('/api/v1/auth', registerRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/restaurant', restaurantRoute);

//Main Route
app.get('/', (req, res) => {
    res.status(200).send(`<h2>Hello World</h2>`);
})




const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`the server running on the ${port}`.red.bgYellow);
});