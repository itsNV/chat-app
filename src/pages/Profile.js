import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCamera } from "react-icons/fa";
import { GrUser } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
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
    <div className='w-full h-[94.3%] bg-gradient-to-br from-black to-blue-900  flex flex-col justify-center items-center'>
      
      <div className='bg-gradient-to-br from-blue-800 to-slate-600 h-auto lg:w-[40%] md:w-[60%] sm:w-[80%] w-[80%] rounded-lg pb-10 pt-7'>
        <div className='flex flex-col items-center'>
          <p className='text-xl font-semibold'>Profile</p>
          <p className='text-lg mt-4'>Your profile information</p>
        </div>
        
        <div
          onClick={()=> handleClick()}
          className='border rounded-full w-[10rem] shadow-md shadow-white flex mt-5 mx-auto relative'>
          <input type="file" accept='image/*' onChange={handleFileChange} ref={inputRef} className=' hidden'/>
          <img src={previewImage || user?.profilePic} alt="profile-pic" className='rounded-full lg:w-[10rem]' />
          <FaCamera className='text-[2rem] absolute text-black bottom-3 right-3 bg-yellow-300 p-1 rounded-lg'/>
        </div>

        <p className='text-center mt-4'>Click to change your profile picture</p>



        <div className='px-5 flex flex-col gap-8'>
          <div>
            <p className='flex items-center gap-2'> <GrUser/> FullName</p>
          <div className='w-full h-10 border rounded-lg mt-2 flex items-center px-3'>{user?.firstName} {user?.lastName}</div>
          </div>
          
        <div>
            <p className='flex items-center gap-2'> <MdEmail/> Email</p>
          <div className='w-full h-10 border rounded-lg mt-2 flex items-center px-3'>{user?.email} </div>
          </div>
        </div>

        <button
          onClick={()=> fileUpload()}
          className='text-black bg-yellow-500 px-6 py-1 rounded-lg mx-auto flex mt-5 hover:scale-110 transition-all duration-200 hover:rounded-full'>Save</button>
      </div>


      <div className='bg-gradient-to-br from-blue-800 to-slate-600 h-auto lg:w-[40%] md:w-[60%] sm:w-[80%] w-[80%] px-1 rounded-lg pb-10 pt-7 mt-10'>
        <p className='text-center lg:mb-5 font-bold text-xl'>Account Information</p>

        <div className='flex items-center justify-between lg:px-5'>
          <p>Member Since</p>
          <p>{ user?.createdAt}</p>
        </div>


        <div className='flex items-center justify-between lg:px-5 mt-7'>
          <p>Account Status</p>
          <p className='text-green-400'>Active</p>
        </div>
      </div>

    </div>
  )
}

export default Profile