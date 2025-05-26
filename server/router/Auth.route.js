import express from "express"
import {signUp,login, updateProfile} from "../controller/auth.js"
import { auth } from "../Middleware/auth.middleware.js";

const router = express.Router();




router.post('/signup', signUp)
router.post('/login', login)
router.put("/update-profile",auth,updateProfile)


export default router