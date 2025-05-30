import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'
import { setSocket,getSocket,setOnlineUsers,getOnlineUsers } from "./socketManager";
import { store } from "..";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null,
    // user : localStorage.getItem("user") || null
    // BASE_URL: 'http://localhost:4000',
    BASE_URL: 'https://chat-app-gir9.onrender.com',
    onlineUsers: []
   
}


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
        },
        setOnlineUsers(state, value) {
            state.onlineUsers = value.payload
            console.log('onlineUser from slice',state.onlineUsers)
        },

        connectSocket(state, value) {
            
            if (!state.user || state.socket?.connected) {
                return;
            }

            const socket = io(state.BASE_URL, {
                query: {
                     userId : state.user._id
                 }
            })  
            
            

            socket.connect();
            setSocket(socket)
            console.log('socket',getSocket())  // getSocket() => returns socket

            

            socket.on('getOnlineUsers', (userIds) => {
                // setOnlineUsers(userIds)
                store.dispatch(userSlice.actions.setOnlineUsers(userIds))
                console.log('userIds', userIds)
                // console.log('onlineUsers from slice',getOnlineUsers())
            })
  
        },

        disConnectSocket(state, value) {
            
            if ( getSocket()?.connected) {
                getSocket()?.disconnect();  
                
              
            }
             

        }
    }
})

export const { setUser,connectSocket,disConnectSocket } = userSlice.actions;
export default userSlice.reducer