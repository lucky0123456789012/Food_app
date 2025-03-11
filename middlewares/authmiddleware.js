import JWT from 'jsonwebtoken';
import { User } from '../models/userModel.js';

let authmiddleware =  (req, res, next)=> {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Un-Authorized User"
                })
            }
            req.user = decode;
            console.log(req.user);
            console.log(req.user.userType);
                next();
            
        })
    } catch (error) {
        console.log(error);   
        res.status(500).send({
            success: false,
            message: "Please provide Auth Token",
            error
        })
    }
}

export {authmiddleware};
