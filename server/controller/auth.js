import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import {fileUploadToCloudinary} from '../utils/cloudinaryUplod.js'
dotenv.config()



// signup
export const signUp = async (req, res) => {
    try {


        const { email, firstName, lastName, password } = req.body;
        
        

        //validation
        if (!email || !firstName ||!lastName || !password ) {
            return res.status(404).json({
                success: false,
                message: "Missing parameteres",
            })
        }


        // console.log("before finding user")
        //check if email already exits
        const findEmail = await User.findOne({ email: email });

        if (findEmail) {
            return res.status(500).json({
                success: false,
                message : "user Already exits"
            })
        }

        // console.log('after finding user')
        

        //hash the password
        const newPassword = await bcrypt.hash(password, 10);
        // console.log('newPassword',newPassword)



        //create user
        const userData = await User.create({
            email , firstName, lastName, password:newPassword, 
            profilePic: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            userData
        })
        
    } catch (error) {

        console.log('ERROR CREATUNG USER', error)
        return res.status(500).json({
            success: false,
            message: "Error while creating user",
            error: error.message
        })
        
    }
}



//login
export const login = async (req, res) => {
    
    try {

        const { email, password } = req.body
        
        // validate inputs
        if (!email || !password) { 
            return res.status(404).json({
                success: false,
                message:"Missing requested parameters"
            })
        }


        // check if email is exits or not
        const user = await User.findOne({ email: email })


        console.log('user',user)
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user Not found"
          })
        }


        // check if password match or not 
        if (await bcrypt.compare(password, user.password)) {
            

            let payload = {
                email: user.email,
                id : user._id,
            }


            const token =  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : '2h'})

            user.token = token;
            
            user.password = undefined;


            let options = {
                httpOnly: true,
                expiresIn : Date.now() + 3*24*60*60
            }

            return res.cookie('token', token, options).status(200).json({
                success: true,
                message: "User Logged in successfully",
                user: user,
                token
            })
            

        }
        else {
            
            return res.status(400).json({
                success: false,
                message : "Password is incorrect"
            })
        }


        

        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error while logging in ",
            error : error.message
        })
        
    }
}




// update profile
export const updateProfile = async (req, res) => {
    
    try {

        const profilePic  = req.files.image;
        const userId = req.user.id

        console.log('profilepic',profilePic)
        if (!profilePic) {
            return res.status(404).json({
                success: false,
                message: "Profile pic not provided"
            })
        }


        // upload image to cloudinary
        const uploadResponse = await fileUploadToCloudinary(profilePic, 'chat-app');

        console.log('uploadresponse', uploadResponse);


        //update user
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic:uploadResponse.secure_url
        },
            {
            new:true
        })
        

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error while updating profile",
            error: error.message
        })
        
    }
}