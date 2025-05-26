import toast from "react-hot-toast"
import { apiconnector } from "./apiConnector"
import { MESSAGE_APIS } from "./apis"
import { setAllUsers, setGetReceiverMessages, setGetSenderMessages,setGetAllMessage, setGetPrevMessage } from "../slice/messageSlice"



const {
    
    GET_ALL_MESSAGES_API,
    GET_ALL_USERS_API,
    SEND_MESSAGE_API
} = MESSAGE_APIS

export function getAllUsers(token) {
    return async(dispatch) =>{
        
        try {

            const result = await apiconnector("GET", GET_ALL_USERS_API, null, {
                Authorization : 'Bearer ' + `${token}`
            })

            console.log('PRINTING GET ALL USERS', result)

            dispatch(setAllUsers(result.data.allUsers));
            localStorage.setItem('allUsers',JSON.stringify(result.data.allUsers))

            
           toast.success("Users fetched successfully")
            
        } catch (error) {
            // toast.error(error.data.response.error)
            console.log("Error while fetching all the users",error)
        }
    }
}


export function sendMessage(token,bodyData,receiver_id,setMessages) {
    return async (dispatch) => {
        try {
            
            const result = await apiconnector("POST", SEND_MESSAGE_API, bodyData, {
                Authorization : "Bearer " + `${token}`
            },{receiver_id})

            console.log('PRINTING SEND MESSAGE RESULT ', result)
            
            if (!result.data.success) {
                return console.log("Can't send message")
            }

            dispatch(setGetPrevMessage(result.data.findAllMessages))
           
            
            
            
        } catch (error) {
            console.log('Error while sending the message ',error)
        }
    }
}


export function loadMessages (token, receiver_id) {
    return async (dispatch) => {
            try {
  
              const result = await apiconnector('GET', GET_ALL_MESSAGES_API, null, {
                  Authorization : 'Bearer ' + `${token}` 
              },  {receiver_id} )
              
              console.log('PRINTING GET ALL MESSAGES RESULT', result)
  
              if (!result.data.success) {
                  return console.log("Can't load old messages")
              }
            
            dispatch(setGetPrevMessage(result.data.allMessages))
            
              
          } catch (error) {
  
              console.log('Error while calling load messages api',error)
              
          }
      }
      }
        

