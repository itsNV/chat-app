import { apiconnector } from "./apiConnector";
import { AUTH_APIS } from "./apis";
import { connectSocket, disConnectSocket, setUser } from '../slice/userSlice'
import {setToken} from '../slice/authSlice'
import toast from "react-hot-toast";




const BASE_URL = 'http://localhost:4000'




const {
    LOGIN_API,
    SIGNUP_API,
    UPDATE_PROFILE_API
} = AUTH_APIS




export function login(bodyData,navigate) {
    return async (dispatch)=>{
        try {

        const result = await apiconnector('POST', LOGIN_API, bodyData)
        
        console.log('RESULT', result);

        if (!result) {
            return result.status(500).json({
                success: false,
                message : "can't loging in "
            })
        }

            dispatch(setToken(result.data.token))
            localStorage.setItem('token', JSON.stringify(result.data.token))
             dispatch(setUser(result.data.user))
            localStorage.setItem('user', JSON.stringify(result.data.user))
            toast.success("Logged in Successfully")

            dispatch(connectSocket())
            navigate('/')


        
    } catch (error) {

        console.log("Error while loging in ",error)
        
    }
    }
    
}


export function signUp(bodyData,navigate) {
    return async (dispatch) => {
        try {
        
        const result = await  apiconnector('POST', SIGNUP_API, bodyData)
        
        console.log('result', result)
        
        if (!result.data.success) {
            return console.log("Can't signing in")
        }
            
            dispatch(setUser(result.data.userData))
            localStorage.setItem('user', JSON.stringify(result.data.userData))
            

            toast.success("Account created Successfully")
            
            dispatch(navigate('/login'))


    } catch (error) {
        console.log('Error while signing in ',error)
    }
    }
}



export function updateProfile(bodyData,token) {
    return async (dispatch) => {
        
        try {

            console.log('token',token)
            const result = await apiconnector("PUT", UPDATE_PROFILE_API, bodyData, {
                Authorization : 'Bearer ' + `${token}`
            })
            
            console.log('PRITING RESULT', result)
            
            if (!result.data.success) {
                return console.log("Can't update the Profile")
            }

            dispatch(setUser(result.data.updatedUser))
            localStorage.setItem('user', JSON.stringify(result.data.updatedUser))
            
            toast.success("Profile updated successfully");
            
        } catch (error) {
            console.log('Error while calling the update profile API',error)
            
        }
    }
}


export function logout(navigate) {
    return async (dispatch) => {
        
         dispatch(disConnectSocket())
        dispatch(setUser(null));
        localStorage.setItem('user','')
        dispatch(setToken(null));
        localStorage.setItem('token', '')
        
       

        toast.success("Logged out successfully");
        navigate('/login')
        
    }
}



