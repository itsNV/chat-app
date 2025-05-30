import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import Message from '../model/message.model.js';
import {fileUploadToCloudinary} from '../utils/cloudinaryUplod.js'

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: ['http://localhost:3000']
        origin: ['https://chat-app-1udn.vercel.app']
    }
})


// online users
const userSocketMap = {}; // userId : socketId

// listen to incoming connection
io.on("connection", (socket) => {
    console.log('user connected  to server', socket.id)

    const userId = socket.handshake.query.userId; // get from frontend in connect socket where we pass it as parameteres
    socket.join(userId)

    userSocketMap[userId] = socket.id;

    socket.emit('getOnlineUsers', Object.keys(userSocketMap))
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        
        delete userSocketMap[userId]

        socket.emit('getOnlineUsers', Object.keys(userSocketMap))
    })


    socket.on('sendMessage', async ({ receiver_id, text, image }) => {
        
        try {
                
                
               
                console.log('receiverId',receiver_id)
            console.log('userId', userId)
            console.log('image',image)
                // const {text} = req.body;
                
                // let image;
                
                // if (req.files) {
                //  image = req.files.image;
                // }
        
                // console.log('image',image)
        
            //     if (text === '' || !image) {
            //         return res.status(404).json({
            //             success: false,
            //             message: 'text or image not found'
            //        })
            //    }
        
                if (!userId || !receiver_id) {
                    return res.status(404).json({
                        success: false,
                        message : "Required fields not found"
                    })
                }
            
            console.log('text',text)    
        
                let sendImage;
                if (image ) {
                    const uploadResponse = await fileUploadToCloudinary(image, "chat-app");
                    sendImage = uploadResponse.secure_url
        
                }
        
                
        
                //create message
              
        
                let newMessage
                if (!image) {
                    newMessage = await Message.create({
                    senderId: userId,
                    receiverId: receiver_id,
                    text: text,
                    
                })
                }
                else {
                    newMessage = await Message.create({
                    senderId: userId,
                    receiverId: receiver_id,
                    text: text,
                    image:sendImage
                })
                }
            
            const populatedMessage = await Message.findById(newMessage._id).populate('senderId').populate('receiverId')
        
                
        
            console.log('populatedMessage', populatedMessage)
                // const findAllMessages = await Message.find({
                //     $or: [{ senderId: userId, receiverId: receiver_id },
                //          {senderId:receiver_id, receiverId:userId}
                // ]}).populate('senderId')
        
                // console.log('findAllMessages',findAllMessages)
                
            io.to(receiver_id).emit('receiveMessage', populatedMessage)
            io.to(userId).emit('receiveMessage',populatedMessage)
        
        
                // return res.status(200).json({
                //     success: true,
                //     message: "Message created successfully",
                //     newMessage,
                //     findAllMessages
                    
                // })

            console.log('message sent success fully')
        
        
        } catch (error) {
            console.log('Error sending mesage ',error)

                // return res.status(500).json({
                //     success: false,
                //     message: "Error while creating the message",
                //     error: error.message
                // })
            }
        
    })



})

export {io,app,server}