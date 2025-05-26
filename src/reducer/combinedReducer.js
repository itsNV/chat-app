import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice.js'
import userReducer from "../slice/userSlice.js";
import messageReducer from '../slice/messageSlice.js'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    message: messageReducer
})

export default rootReducer