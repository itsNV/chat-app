import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    
    const navigate = useNavigate()
  
    const { token } = useSelector((state) => state.auth)

     useEffect(() => {
        if (token === null) {
        navigate('/login')
    }
},[])
    
    if (token !== null) {
        return children
    }
   
}

export default ProtectedRoute