import { config } from "dotenv";
import jwt from "jsonwebtoken"
config();

export const auth = async (req, res, next) => {
    try {

        const token =  req.header('Authorization').replace('Bearer ','')

        //validate
        if (!token) {
            return res.status(404).json({
                success: false,
                message : "Token not found"
            })
        }

        // console.log("token",token)

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!decode) {
            return res.status(500).json({
                success: false,
                message:"Error verifying the token"
            })
        }

        console.log('DECODE', decode);
        req.user = decode

        next();
        
    } catch (error) {
        
        console.log('Error while authenticating the user', error);
        return res.status(500).json({message:"Error authenticating user"})
    }
}