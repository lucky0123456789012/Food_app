import mongoose from "mongoose";
const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`The database is not connected`, error); 
    }
}

export {connectdb};