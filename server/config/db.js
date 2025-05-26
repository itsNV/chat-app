import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async() => {
    
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    console.log("MONGODB CONNECTED SUCCESSFULLY");
    }
    catch(e) {
        console.log("ERROR CONNRCTING TO MONGODB",e)
    }
}