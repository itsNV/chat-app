import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadMessages, sendMessage } from '../../service/Message.service'
import { getSocket } from '../../slice/socketManager'
import { appendMessage, setImage } from '../../slice/messageSlice'
import { IoSend } from "react-icons/io5"
import { IoMdImages } from "react-icons/io"
import { BsEmojiSmile } from "react-icons/bs"






const ChatUser = () => {


  
  const { receiver_id } = useParams()
  const { chatUser, loadPrevMessages } = useSelector((state) => state.message)
  const navigate = useNavigate();
  const {token} = useSelector((state)=> state.auth)
  const {user} = useSelector((state)=> state.user)
  const inputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(false);
  const messageEndRef = useRef(null);




  const handleClick = () => {
    inputRef.current.click()
  }

  const selectImage = (event) => {
    const file = event.target.files[0]
    console.log('INSIDE SELECT IMAGE')
      
    console.log('file',file)
    setImageFile(file)
    imageSource(file)
  }

  const imageSource = (file) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
  }



  const sendMessages = (data) => {

    const socket = getSocket()
    console.log('data',data)
    // let formData = new FormData();
    console.log('previewImage',previewImage)
    // if (imageFile) {
    //   formData.append('image',imageFile)
    // }

    // formData.append('text', data.text)
    
    // dispatch(sendMessage(token, formData, receiver_id))
    if (socket) {
      socket.emit('sendMessage',{
        receiver_id: receiver_id,
        text: data.text,
        image : previewImage                    
      })
    }
    
    setPreviewImage(null)
  }

  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm()


  useEffect(() => {

    const socket = getSocket()

    if (!socket) return;
  
    const handleLoadMessage = (newMessage) => {
      
      dispatch(appendMessage(newMessage))
    }


    socket.on('receiveMessage', handleLoadMessage)
    
    return () => socket.off('receiveMessage',handleLoadMessage)


},[token,receiver_id,dispatch])
  

  
  
  useEffect(() => {
    console.log('chatUser', user)
    console.log('receiverId', receiver_id)
    // console.log('getMessages', getAllMessages)
    // call get all messages
    dispatch(loadMessages(token,receiver_id))
                  

  }, [receiver_id])

  useEffect(() => {
    if (messageEndRef.current && loadPrevMessages) {
      messageEndRef.current.scrollIntoView();
    }
  },[loadPrevMessages])
  
 
  

  return (
    <div className="flex flex-col h-full bg-gray-800 bg-opacity-30 relative">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 to-indigo-800 shadow-md p-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={chatUser?.profilePic} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" 
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{chatUser?.firstName} {chatUser?.lastName}</h3>
            <p className="text-xs text-blue-200 opacity-80">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollBehavior: 'smooth' }}>
        {previewImage && (
          <div className="flex justify-center my-2">
            <div className="relative inline-block">
              <img src={previewImage} alt="Preview" className="max-w-xs rounded-lg shadow-lg" />
              <button 
                onClick={() => setPreviewImage(null)} 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {loadPrevMessages?.map((message, index) => (
          <div key={index} className="w-full">
            {user._id === message?.senderId?._id ? (
              <div className="flex justify-end" ref={index === loadPrevMessages.length - 1 ? messageEndRef : null}>
                <div className="max-w-[75%]">
                  {message?.image && (
                    <div className="mb-1 rounded-lg overflow-hidden">
                      <img 
                        src={message?.image} 
                        alt="Message image" 
                        className="max-w-full cursor-pointer hover:opacity-90 transition-opacity" 
                        onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }} 
                      />
                    </div>
                  )}
                  {message?.text && (
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm shadow-md">
                      {message?.text}
                    </div>
                  )}
                  <div className="text-right text-xs text-gray-400 mt-1 mr-1">
                    {new Date(message?.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start" ref={index === loadPrevMessages.length - 1 ? messageEndRef : null}>
                <div className="max-w-[75%]">
                  {message?.image && (
                    <div className="mb-1 rounded-lg overflow-hidden">
                      <img 
                        src={message?.image} 
                        alt="Message image" 
                        className="max-w-full cursor-pointer hover:opacity-90 transition-opacity" 
                        onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }} 
                      />
                    </div>
                  )}
                  {message?.text && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl rounded-tl-sm shadow-md">
                      {message?.text}
                    </div>
                  )}
                  <div className="text-left text-xs text-gray-400 mt-1 ml-1">
                    {new Date(message?.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="sticky bottom-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-3 border-t border-gray-700">
        <form onSubmit={handleSubmit(sendMessages)} className="flex items-center space-x-2">
          <button 
            type="button" 
            onClick={handleClick}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <IoMdImages className="w-6 h-6" />
          </button>
          
          <button 
            type="button" 
            className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <BsEmojiSmile className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1">
            <input 
              type="text"
              {...register('text')}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <input 
              type="file" 
              ref={inputRef}
              onChange={selectImage}
              className="hidden" 
            />
          </div>
          
          <button 
            type="submit" 
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatUser