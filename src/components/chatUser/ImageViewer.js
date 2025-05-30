import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ImageViewer = () => {


  const navigate = useNavigate()

  const {image} = useSelector((state)=> state.message)

  return (
      <div className='fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center p-4 z-50'>
          
          <img src={image} alt="no item" className='max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105'/>

      <button type='button'
        className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
        onClick={() => navigate(-1)}>Close</button>
          
    </div>
  )
}

export default ImageViewer