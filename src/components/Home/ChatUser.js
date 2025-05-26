import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadMessages, sendMessage } from '../../service/Message.service'
import { getSocket } from '../../slice/socketManager'
import { appendMessage, setImage } from '../../slice/messageSlice'
import ImageViewer from '../chatUser/ImageViewer'





const ChatUser = () => {


  
  const { receiver_id } = useParams()
  const { chatUser,loadPrevMessages } = useSelector((state) => state.message)
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
    <div className='border h-[50rem] overflow-y-auto relative'>

      {/* name header */}
       <div 
           className='flex flex-col gap-3 cursor-pointer fixed w-[70%] lg:w-[51%] md:w-[54%] sm:w-[57%] bg-sky-900 pt-3'
                         >
                                
                                <div className='flex gap-3 items-center ml-2'>
                                    <img src={chatUser?.profilePic} alt="profilePic" className='rounded-full w-[3rem]' />
      
                                <div className='flex'>
                                    
                                    <p>{chatUser?.firstName} {chatUser?.lastName}</p>
                                    
                                    {/* online or  offline */}
                                </div>
                                </div>
      
                                <div className='h-[1px] w-full bg-black'></div>
                                
      </div>

      
      {/* show message */}
      <div className={`w-full mt-20 pb-10`}>

      

         {
          loadPrevMessages?.map((message,index) => (
            <div className='w-full flex flex-col  px-3' key={index}>

              {
                user._id === message?.senderId?._id &&
                  <div className='flex mt-2 justify-end ' ref={messageEndRef} >
                    {
                       (message?.text && !message?.image) && <p className='border border-black  max-w-max bg-gradient-to-tr to-red-600 from-blue-600 rounded-full px-3'>{message?.text}</p>
                    }
                    {
                      (!message?.text && message?.image) && <img src={message?.image} alt="no item" className='w-20' onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }} />
                      
                    
                    }
                    {
                      (message?.text && message?.image) && <div className='flex flex-col items-center'>

                        <img src={message?.image} alt="no item" className='w-20' onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }}/>

                        <p className='border border-black  max-w-max bg-gradient-to-tr to-red-600 from-blue-600 rounded-full px-3 mt-1'>{message?.text}</p>

                      </div>


                        
                    }


                    
                     
                  </div> 
                  
                  
              }

            
              { !(user._id === message?.senderId?._id) &&
                <div className='flex mt-2 justify-start' ref={messageEndRef}>

                  {
                    (message?.text && !message?.image) && <p className='border border-black  max-w-max bg-gradient-to-tr to-green-600 from-pink-600 rounded-full px-3'>{message?.text}</p>
                  }
                  
                       {
                      (!message?.text && message?.image) && <img src={message?.image} alt="no item" className='w-20'onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }} />
                      
                    
                    }
                    {
                      (message?.text && message?.image) && <div className='flex flex-col items-center'>

                        <img src={message?.image} alt="no item" className='w-20' onClick={() => {
                          navigate('/showImage')
                          dispatch(setImage(message?.image))
                        }}/>

                        <p className='border border-black  max-w-max bg-gradient-to-tr to-red-600 from-blue-600 rounded-full px-3 mt-1'>{message?.text}</p>

                      </div>


                        
                    }
                  

                 
                  </div>
              }
              
             
            </div>
          ))
          } 
        
       
      </div>
      

      <form onSubmit={handleSubmit(sendMessages)} className='mt-4'>

        <input type="text"
          name='text'
          id='text'
          {...register('text')}
          className='fixed bottom-[4.3rem] w-[70%] lg:w-[51.5%] sm:w-[57%] md:w-[54%] bg-black text-white pl-3 py-2 rounded-lg pr-20'
          placeholder='Type here ...'
        
        />
        

        <input type="file" ref={inputRef}
          onChange={selectImage}

          className='hidden' />

        <button type="submit" className='text-black bg-yellow-400 fixed bottom-[4.3rem] right-[2rem] w-[15%] lg:right-[20rem] md:right-[10rem] sm:right-[7rem] lg:w-[5%] mb-1 rounded-lg py-1 px-2 sm:w-[10%] max-w-max'>Send</button>
        <button type="button"
          onClick={()=> handleClick()}
          className='text-white bg-red-400 fixed bottom-[4.3rem]  text-sm right-[6rem] lg:right-[28rem] md:right-[17rem] sm:right-[13rem] max-w-max bg-opacity-40 rounded-lg px-2 
          mb-1 '>Image</button>
      </form>

    

     </div>
  )
}

export default ChatUser