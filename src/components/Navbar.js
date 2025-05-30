import React, { useState } from 'react';
import { GrUser } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png';
import { logout } from '../service/Auth.service';

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  return (
    <div className='sticky top-0 z-50 h-16 w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30'>
      <ul className='flex items-center justify-between px-6 h-full max-w-7xl mx-auto'>
        <li
          onClick={() => navigate('/')}
          className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'>
          <img src={image} alt="logo" className='w-8 h-8 rounded-full shadow-md'/>
          <span className='font-semibold text-lg'>Chat With World</span>
        </li>

        <li className='block lg:hidden'>
          <button onClick={() => setShow(!show)} className='p-2 hover:bg-blue-800 rounded-full transition-colors'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </li>

        {show && (
          <div className='absolute top-16 right-4 bg-white text-gray-800 shadow-xl rounded-lg py-2 lg:hidden'>
            <button onClick={() => navigate('/update-profile')} 
              className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left'>
              <GrUser className='text-blue-900'/>
              <span>Profile</span>
            </button>
            <button onClick={() => dispatch(logout(navigate))} 
              className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left'>
              <MdLogout className='text-blue-900'/>
              <span>Logout</span>
            </button>
          </div>
        )}

        <div className='hidden lg:flex items-center gap-6'>
          <button onClick={() => navigate('/update-profile')} 
            className='flex items-center gap-2 hover:bg-blue-800 px-4 py-2 rounded-full transition-colors'>
            <GrUser className='text-xl'/>
            <span>Profile</span>
          </button>
          <button onClick={() => dispatch(logout(navigate))} 
            className='flex items-center gap-2 hover:bg-blue-800 px-4 py-2 rounded-full transition-colors'>
            <MdLogout className='text-xl'/>
            <span>Logout</span>
          </button>
        </div>
      </ul>
    </div>
  )
}

export default Navbar