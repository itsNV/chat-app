import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Home/Sidebar'
import { useSelector } from 'react-redux'

const Home = () => {

  const { chatUser } = useSelector((state) => state.message)
  

  return (
    <div className='w-full h-[94.3%] bg-gradient-to-br from-black to-blue-900  flex flex-col justify-center items-center'>

      <div className='bg-gradient-to-br from-blue-800 to-slate-600 h-auto w-[98%] sm:w-[80%] md:w-[75%] lg:w-[70%] rounded-lg flex ' >

        <div className='w-[25%]'>
          <Sidebar />
        </div>

        
        {
          !chatUser ? (<div className='w-full h-[50rem] border flex justify-center items-center text-3xl flex-col'> Chat With World !!!
    <p className='text-lg'>welcome and chat to person in your contacts</p>
    </div>) : (
              
                <div className='w-[75%]'>
          <Outlet />
        </div>
              
          )
        }

      </div>
    </div>
  )
}

export default Home