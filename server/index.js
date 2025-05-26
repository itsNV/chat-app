import express from 'express';
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { connectDB } from "./config/db.js"
import fileUpload from 'express-fileupload';
import authRoutes from './router/Auth.route.js'
import messageRoutes from './router/message.routes.js'
import cors from 'cors'
import { CloudinaryConnect } from './config/cloudinary.js'
import {io,app,server} from './utils/socket.js'

dotenv.config()

const PORT = process.env.PORT;




app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'/tmp/'
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000'
}))

// mount the routes
app.use('/api/chat-app/auth',authRoutes)
app.use('/api/chat-app/message',messageRoutes)


// start server
server.listen(PORT, () => {
    console.log('Server started st port',PORT)
})

connectDB()    
CloudinaryConnect()

