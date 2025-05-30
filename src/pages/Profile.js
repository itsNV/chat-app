import React, { useEffect, useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import { GrUser } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../service/Auth.service';

const Profile = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth)
  const { user } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.click();
  }


  const handleFileChange = (event) => {
    
    const file = event.target.files[0]
    console.log('file',file)
    if (file) {
      setImageFile(file)
      fileSource(file)
    }
  }

  const fileSource = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
  }

  const fileUpload = () => {
    console.log('inside fileupload')
    const formData = new FormData()
    
    console.log('imagefile',imageFile)
    formData.append('image', imageFile)

    dispatch(updateProfile(formData,token))
    

  }


  
  useEffect(() => {
    console.log('user', user)
    console.log('token',token)
    
  },[])
  return (
    <div className='w-full h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center items-center p-4 overflow-x-hidden overflow-y-auto'>
      
      <div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-8 lg:w-[40%] md:w-[60%] sm:w-[80%] w-full max-w-2xl transform transition-all duration-300 hover:scale-105'>
        <div className='flex flex-col items-center mb-6'>
          <p className='text-3xl font-bold text-white mb-2'>Profile</p>
          <p className='text-lg text-gray-300'>Manage your personal information</p>
        </div>
        
        <div
          onClick={()=> handleClick()}
          className='relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 cursor-pointer group ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800 transition-all duration-300 hover:ring-blue-400'>
          <input type="file" accept='image/*' onChange={handleFileChange} ref={inputRef} className='hidden'/>
          <img src={previewImage || user?.profilePic} alt="profile-pic" className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'/>
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <FaCamera className='text-white text-3xl'/>
          </div>
        </div>

        <p className='text-center text-gray-400 mb-8'>Click to change your profile picture</p>



        <div className='px-5 flex flex-col gap-6'>
          <div>
            <p className='flex items-center gap-3 text-gray-300 text-lg mb-1'> <GrUser className='text-blue-400'/> FullName</p>
            <div className='w-full p-3 bg-gray-700 rounded-lg text-white text-base font-medium shadow-inner border border-gray-600'>{user?.firstName} {user?.lastName}</div>
          </div>
          
          <div>
            <p className='flex items-center gap-3 text-gray-300 text-lg mb-1'> <MdEmail className='text-blue-400'/> Email</p>
            <div className='w-full p-3 bg-gray-700 rounded-lg text-white text-base font-medium shadow-inner border border-gray-600'>{user?.email} </div>
          </div>
        </div>

        <button
          onClick={()=> fileUpload()}
          className='bg-blue-600 text-white px-8 py-3 rounded-full mx-auto flex mt-8 shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'>Save Profile</button>
      </div>


      <div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-8 lg:w-[40%] md:w-[60%] sm:w-[80%] w-full max-w-2xl mt-8 transform transition-all duration-300 hover:scale-105'>
        <p className='text-center text-2xl font-bold text-white mb-6'>Account Information</p>

        <div className='flex items-center justify-between px-5 py-3 bg-gray-700 rounded-lg mb-4 shadow-inner border border-gray-600'>
          <p className='text-gray-300 text-lg'>Member Since</p>
          <p className='text-white text-lg font-medium truncate'>{ user?.createdAt}</p>
        </div>


        <div className='flex items-center justify-between px-5 py-3 bg-gray-700 rounded-lg shadow-inner border border-gray-600'>
          <p className='text-gray-300 text-lg'>Account Status</p>
          <p className='text-green-400 text-lg font-medium truncate'>Active</p>
        </div>
      </div>

    </div>
  )
}

export default Profile