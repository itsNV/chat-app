
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from "react-redux"
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ChatUser from './components/Home/ChatUser';
import { useEffect } from 'react';

import { connectSocket, setUser } from './slice/userSlice';
import { loadMessages } from './service/Message.service';
import ImageViewer from './components/chatUser/ImageViewer';





function App() {

 
  const {user} = useSelector((state)=> state.user)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  useEffect(() => {
   
    const storedUser = localStorage.getItem('user')

    if (!user && storedUser) {
            dispatch(setUser(JSON.parse(storedUser)))
        }
  }, [])
  

  useEffect(() => {
    if (user) {
      dispatch(connectSocket())
    }
  }, [user])
  
  useEffect(() => {
    const handleFocus = () => {
      
      if (user) {
        dispatch(connectSocket())
        
      }
      
     
    }

     window.addEventListener('focus', handleFocus)
      
    return () => window.removeEventListener('focus', handleFocus)
    
  }, [user])
  
  return (
    <div className='App bg-gradient-to-tr  h-screen w-screen font-serif'>
      

      
      {
        token && <Navbar />
      }


      <Routes>

        
            
        <>
          

        
          <Route path='/' element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>} >
          
            <Route path='/home/user/:receiver_id' element={<ChatUser />} />
            
          </Route>

        <Route path='/update-profile' element={ 
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
        
        
        </>
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/login' element={<Login />} />

        <Route path='/showImage' element={ <ImageViewer/>} />
        
             
        
        
        
    </Routes>
    </div>
  );
}

export default App;
