import React, { useState } from 'react'
import { MdOutlineSettings } from "react-icons/md";
import { GrUser } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../service/Auth.service';
import { FiMessageSquare } from "react-icons/fi";
import image from '../assets/image.png'

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  return (
    <div className='h-14 w-full bg-blue-900 text-white flex justify-center items-center '>

      <ul className='flex items-center justify-evenly w-full'>

        <li
          onClick={()=> navigate('/')}
          className='flex items-center gap-2 cursor-pointer'>
          <img src={image} alt="no item" className='w-10 '/>
          Chat With World
        </li>

        <li
          className='flex lg:hidden sm:hidden md:hidden cursor-pointer'
          onClick={() => setShow((pre)=> !pre)}>
          dot
        </li>

        {
          show && <li className='flex lg:hidden sm:hidden md:hidden flex-col  gap-1 cursor-pointer'>
          

          <p
            onClick={()=> navigate('/update-profile')}
            className='flex gap-2 items-center cursor-pointer'>
            <GrUser/>
            profile
          </p>

          <p
            onClick={()=> dispatch(logout(navigate))}
            className='flex gap-2 items-center cursor-pointer'> 
            <MdLogout/>
            logout
          </p>
        </li>
        }

        <li className='hidden lg:flex md:flex sm:flex  gap-4 cursor-pointer'>
          

          <p
            onClick={()=> navigate('/update-profile')}
            className='flex gap-2 items-center cursor-pointer'>
            <GrUser/>
            profile
          </p>

          <p
            onClick={()=> dispatch(logout(navigate))}
            className='flex gap-2 items-center cursor-pointer'> 
            <MdLogout/>
            logout
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Navbar