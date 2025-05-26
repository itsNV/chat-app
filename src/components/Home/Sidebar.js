import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../service/Message.service'
import { MdOutlinePeople } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setChatUser } from '../../slice/messageSlice';




const Sidebar = () => {

    const {onlineUsers,user} = useSelector((state)=> state.user)
    const { token } = useSelector((state) => state.auth)
    const { allUsers,chatUser } = useSelector((state) => state.message)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(getAllUsers(token))
       
        console.log('onlineUsers',onlineUsers)
    }, [])
    
   

  return (
      <div className='h-auto w-full pt-5'>
          
          <p className=' hidden lg:flex items-center gap-2 ml-2  md:flex sm:flex text-xl mb-6'>
              <MdOutlinePeople/>
              Contacts</p>
          
          <div className='flex flex-col  bg-sky-600 '>
              
              {
                  allUsers?.map((user) => (
                      
                      <div key={user._id}
                          onClick={() => {
                              navigate(`home/user/${user._id}`)
                              dispatch(setChatUser(user))
                          }}
                          className={`flex flex-col gap-3 cursor-pointer pt-4 ${ (chatUser?._id === user._id) ? 'bg-sky-800' : 'bg-sky-600'}`}
                      
                      >
                          
                          <div className='flex gap-3 items-center ml-2 relative'>
                              <img src={user?.profilePic} alt="profilePic" className='rounded-full w-[3rem]' />


                              {/* green dot  */}
                              {
                                  onlineUsers?.includes(user._id) && <div className='bg-green-400 border border-black rounded-full w-3 h-3 absolute left-9 bottom-2'>
                                  
                              </div>
                              }

                          <div className='flex '>
                              
                              <p className='hidden lg:block sm:block'>{user?.firstName} {user?.lastName}</p>
                              
                              {/* online or  offline */}
                          </div>
                          </div>

                          <div className='h-[1px] w-full bg-black'></div>
                          
                      </div>
                  ))
              }
              
          </div>
          
    </div>
  )
}

export default Sidebar