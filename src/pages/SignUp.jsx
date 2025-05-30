import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../service/Auth.service'

const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        handleSubmit,
        register,
        formState : { errors}
    } = useForm()


    const submitData = (data) => {
        
        console.log('data', data)
        
        dispatch(signUp(data,navigate))
    }

  return (
          <div className='relative flex items-center justify-center w-screen h-screen overflow-hidden'>
              <div className='absolute inset-0 z-0'>
                  <video className='min-w-full min-h-full object-cover' autoPlay muted loop>
                      <source src='https://assets.mixkit.co/videos/1963/1963-720.mp4' type="video/mp4" />
                  </video>
                  {/* <img src="https://img.freepik.com/free-vector/dialogue-chat-clouds-speech-bubble-icon-from-lines-triangles-particle-style-design-low-poly-technology-devices-people-communication-concept-blue-background_587448-471.jpg" alt="bg-image" className='absolute inset-0 min-w-full min-h-full object-cover opacity-50' /> */}
              </div>

              <p className='text-blue-400 absolute top-32 text-3xl shadow-blue-400 shadow-lg px-6 font-semibold text-center z-10'>Welcome to Chat with World</p>

              <form onSubmit={handleSubmit(submitData)}
                  className='border border-white shadow-lg shadow-white h-auto lg:w-[35%] md:w-[40%] md:p-4 sm:w-[50%] sm:p-4 w-[70%] p-4 lg:p-10 flex flex-col gap-10 rounded-lg z-10 relative items-center mt-10'>


              {/* first name */}
              <label htmlFor="firstName" className='flex flex-col gap-3'>
                  <p className='text-white font-semibold '>FirstName</p>

                  <input
                      type="text"
                      id='firstName'
                      name='firstName'
                        required
                      {...register('firstName')}
                      className='rounded-lg lg:w-[20rem] bg-slate-800 text-white pl-3 border border-slate-700 shadow-md shadow-slate-800'
                    
                  />

                  {
                      errors.firstName && <span>Required field</span>
                  }
              </label>


                  {/* last Name */}
                  <label htmlFor="lastName" className='flex flex-col gap-3'>
                  <p className='text-white font-semibold '>LastName</p>

                  <input
                      type="text"
                      id='lastName'
                      name='lastName'
                      {...register('lastName')}
                       className='rounded-lg lg:w-[20rem] bg-slate-800 text-white pl-3 border border-slate-700 shadow-md shadow-slate-800'
                    
                  />

                  {
                      errors.lastName && <span>Required field</span>
                  }
              </label>


              {/* email */}
             <label htmlFor="email" className='flex flex-col gap-3'>
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
             <label htmlFor="email" className='flex flex-col gap-3'>
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



              <button type="submit" className='bg-yellow-300 w-[7rem] py-1 rounded-lg mx-auto hover:scale-110 hover:rounded-full hover:bg-blue-600 transition-all duration-200 font-semibold'>Sign Up</button>



              <p className='text-white font-semibold'>Already Have an Acoount ?
                  <span
                      className='text-xl text-yellow-400 cursor-pointer'
                      onClick={() => navigate('/login')}>{ " "} login</span></p>

          </form>

    </div>
  )
}

export default SignUp