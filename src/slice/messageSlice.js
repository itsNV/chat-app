import { createSlice } from "@reduxjs/toolkit";
import steps from "daisyui/components/steps";


const initialState = {
    allUsers: localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : null,
    chatUser: null,
    image : null,
    loadPrevMessages : localStorage.getItem('loadPrevMessages') ? JSON.parse(localStorage.getItem('loadPrevMessages')) : [],
   
}

const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {

        setAllUsers(state, value) {
            state.allUsers = value.payload
        },

        setChatUser(state, value) {
            state.chatUser = value.payload
            // localStorage.setItem('chatUser',JSON.stringify(state.chatUser))
        },
       
       
        setGetPrevMessage(state, value) {
            state.loadPrevMessages = value.payload
             localStorage.setItem('loadPrevMessages',JSON.stringify(value.payload))
            console.log('loadPrevMessages',state.loadPrevMessages)
        },

        appendMessage(state, value) {
          state.loadPrevMessages.push(value.payload)
            localStorage.setItem('loadPrevMessages', JSON.stringify(state.loadPrevMessages))
            console.log('loadPrevMessages',state.loadPrevMessages)
        },
        setImage(state, value) {
            state.image = value.payload
        }
        
    }
})

export const { setAllUsers,setChatUser,setGetPrevMessage,appendMessage,setImage} = messageSlice.actions;
export default messageSlice.reducer