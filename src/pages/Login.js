import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import video from '../assets/bg-video.mp4'
import { useDispatch } from 'react-redux'
import { login } from '../service/Auth.service'


const Login = () => {

    const {
        handleSubmit,
        register,
        formState: {errors}
        
    } = useForm()

    const navigate = useNavigate();
    const dispatch = useDispatch()



    const submitHandler = (data) => {
        dispatch(login(data,navigate))
    }

  return (
    <div className='flex items-center  w-[100%] justify-center pt-5 bg-black h-screen'>
              
    
    
           <p className='text-blue-400 absolute top-32 text-3xl shadow-blue-400 shadow-lg px-6 font-semibold'>Welcome Back !!</p>
          

              <video   className='lg:w-[105rem] md:w-[100rem] lg:flex md:flex hidden' autoPlay muted loop >
                  <source src='https://assets.mixkit.co/videos/1963/1963-720.mp4' type="video/mp4" className=''/>
              </video>
    
              <img src="https://img.freepik.com/free-vector/dialogue-chat-clouds-speech-bubble-icon-from-lines-triangles-particle-style-design-low-poly-technology-devices-people-communication-concept-blue-background_587448-471.jpg" alt="bg-image" className='lg:h-[96%] lg:w-[89%] md:w-[100%] h-[98%] absolute opacity-50 ' />
              
          <form
              onSubmit={handleSubmit(submitHandler)}
              className='border border-white shadow-lg shadow-white h-auto  lg:w-[35%] md:w-[40%] md:p-4 sm:w-[50%] sm:p-4 w-[70%] p-4 lg:p-10 flex flex-col gap-10 rounded-lg absolute '>
                  
    
                  
    
    
                  {/* email */}
                 <label htmlFor="email" className='flex flex-col gap-3 lg:justify-center lg:items-center'>
                      <p className='text-white font-semibold '>Email</p>
    
                      <input
                          type="email"
                          id='email'
                          name='email'
                            required
                          {...register('email')}
                          className='rounded-lg lg:w-[20rem] bg-slate-800 text-white pl-3 border border-slate-700 shadow-md shadow-slate-800'
                        
                      />
    
                      {
                          errors.email && <span>Required field</span>
                      }
                  </label>
    
    
    
                      {/* password */}
                 <label htmlFor="email" className='flex flex-col gap-3 lg:justify-center lg:items-center'>
                      <p className='text-white font-semibold '>Password</p>
    
                      <input
                          type="password"
                          id='password'
                          name='password'
                            required
                          {...register('password')}
                          className='rounded-lg lg:w-[20rem] bg-slate-800 text-white pl-3 border border-slate-700 shadow-md shadow-slate-800'
                        
                      />
    
                      {
                          errors.email && <span>Required field</span>
                      }
                  </label>
    
    
    
                  <button type="submit" className='bg-yellow-300 w-[7rem] py-1 rounded-lg mx-auto hover:scale-110 hover:rounded-full hover:bg-blue-600 transition-all duration-200 font-semibold'>Login</button>
    
    
    
                  <p className='text-white font-semibold '>Don't have an account ?
                      <span
                          className='text-xl text-yellow-400 cursor-pointer'
                          onClick={() => navigate('/signup')}>{ " "} Sign Up</span></p>
    
              </form>
    
        </div>
  )
}

export default Login