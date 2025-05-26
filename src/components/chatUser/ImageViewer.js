import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ImageViewer = () => {


  const navigate = useNavigate()

  const {image} = useSelector((state)=> state.message)

  return (
      <div className=' w-full h-[94.3%] bg-gradient-to-tr from-blue-600 to-pink-600  flex flex-col gap-4 justify-center items-center   '>
          
          <img src={image} alt="no item" className='lg:w-[32%] md:w-[50%] sm:w-[70%] w-[90%]'/>

      <button type='button'
        className='text-black bg-yellow-500 rounded-lg px-2 py-1'
        onClick={() => navigate(-1)}>Cancel</button>
          
    </div>
  )
}

export default ImageViewer