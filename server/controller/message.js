
import Message from '../model/message.model.js'
import User from "../model/user.model.js"
import {fileUploadToCloudinary} from '../utils/cloudinaryUplod.js'




// fetch all the users for the sidebar
export const getAllUserForSideBar = async (req, res) => {
    try {

        const userId = req.user.id;

        // console.log('useId',userId)
        if (!userId) {
            return res.status(404).json({
                success: false,
                message : "Required fields not found"
            })
        }

        //get all user
        const allUsers = await User.find({ _id: { $ne: userId } })

        if (!allUsers) {
            return res.status(404).json({
                success: false,
                message : "Users not found"
            })
        }
        
        // console.log('allUsers',allUsers)
        

        return res.status(200).json({
            success: true,
            message: "All Users are successfully fetched",
            allUsers
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error feching all users",
            error: error.message
        })
        
    }
}



//send message
export const sendMessage = async(req, res) => {
    try {
        
        const userId = req.user.id
        const {receiver_id} = req.query
        console.log('receiverId',receiver_id)
        console.log('userId',userId)
        const {text} = req.body;
        
        let image;
        
        if (req.files) {
         image = req.files.image;
        }

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

        let sendImage;
        if (image) {
            const uploadResponse = await fileUploadToCloudinary(image, "chat-app");
            sendImage = uploadResponse.secure_url

        }

        console.log('text',text)

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

        

    
        const findAllMessages = await Message.find({
            $or: [{ senderId: userId, receiverId: receiver_id },
                 {senderId:receiver_id, receiverId:userId}
        ]}).populate('senderId')

        // console.log('findAllMessages',findAllMessages)
        
        


        return res.status(200).json({
            success: true,
            message: "Message created successfully",
            newMessage,
            findAllMessages
            
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating the message",
            error: error.message
        })
    }
}

// get all the message ----> socket.io is pending for time management
export const getAllMessages = async(req, res) => {
    
    try {

        const receiverId = req.query.receiver_id;
        const userId = req.user.id;

        console.log('receiver Id ',receiverId)
        if (!userId || !receiverId) {
            return res.status(404).json({
                success: false,
                message : "Required fields not found"
            })
        }

        const allMessages = await Message.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                {senderId:receiverId,receiverId:userId}
            ]
        }).populate('senderId').populate('receiverId').sort({'createdAt': 1}).exec()

        

        if (!allMessages) {
            return res.status(404).json({
                success: true,
                message: "No messages found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "All the messages are fetched successfully",
            allMessages
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching messages",
            error: error.message
        })
    }
}