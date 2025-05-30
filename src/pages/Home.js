import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Home/Sidebar'
import { useSelector } from 'react-redux'
import { FiMessageSquare } from "react-icons/fi"

const Home = () => {
  const { chatUser } = useSelector((state) => state.message)

  return (
    <div className='w-full h-[94.3vh] bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4 overflow-y-hidden'>
      <div className='bg-white bg-opacity-10 backdrop-blur-lg w-full max-w-7xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex'>
        <div className='w-[320px] border-r border-white/10'>
          <Sidebar />
        </div>

        {!chatUser ? (
          <div className='flex-1 flex flex-col items-center justify-center text-white'>
            <div className='w-24 h-24 mb-6 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center'>
              <FiMessageSquare className='w-12 h-12' />
            </div>
            <h1 className='text-4xl font-bold mb-3'>Chat With World</h1>
            <p className='text-lg text-blue-200'>Select a contact to start messaging</p>
          </div>
        ) : (
          <div className='flex-1'>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home