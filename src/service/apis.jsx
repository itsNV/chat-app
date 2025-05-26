
const BASE_URL = 'http://localhost:4000/api/chat-app'

// auth apis 
export const AUTH_APIS = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + '/auth/login',
    UPDATE_PROFILE_API : BASE_URL + '/auth/update-profile'
}


// message alis

export const MESSAGE_APIS = {
    GET_ALL_USERS_API: BASE_URL + '/message/getAllUsers',
    GET_ALL_MESSAGES_API: BASE_URL + '/message/getAllMessages',
    SEND_MESSAGE_API : BASE_URL + '/message/sendMessage'
}