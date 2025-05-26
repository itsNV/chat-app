import express from "express";
import { getAllMessages, getAllUserForSideBar, sendMessage } from "../controller/message.js";
import { auth } from "../Middleware/auth.middleware.js";

const router = express.Router();


router.get('/getAllUsers', auth, getAllUserForSideBar)

router.get('/getAllMessages', auth, getAllMessages)

router.post('/sendMessage', auth, sendMessage)



export default router