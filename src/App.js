
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatUser from './components/Home/ChatUser';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

import ImageViewer from './components/chatUser/ImageViewer';
import { connectSocket, setUser } from './slice/userSlice';





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
    <div className='App bg-gradient-to-br from-gray-900 to-blue-900 h-full w-full  font-serif'>
      

      
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
