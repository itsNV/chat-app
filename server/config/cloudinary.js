import cloudinary from "cloudinary";
import dotenv from "dotenv"
dotenv.config();


    
export const  CloudinaryConnect = async () => {
    
    try {
             
           await cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
            
           })
        
        
        console.log('Connected to cloudinary')
            
         } catch (error) {
            console.log('Error connecting to cloudinary',error)
         }
}
