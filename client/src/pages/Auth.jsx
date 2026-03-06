import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Auth({isModel = false}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { darkMode } = useSelector((state) => state.user)
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Google authentication failed")
            dispatch(setUserData(null))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isLogin) {
                // Login
                const result = await axios.post(ServerUrl + "/api/auth/login", formData, {withCredentials:true})
                dispatch(setUserData(result.data))
                navigate("/")
            } else {
                // Sign Up
                const result = await axios.post(ServerUrl + "/api/auth/register", formData, {withCredentials:true})
                dispatch(setUserData(result.data))
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Authentication failed")
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <div className={`
      w-full 
      ${isModel ? "min-h-screen py-4" : `min-h-screen flex items-center justify-center px-6 py-20 font-[Raleway] ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-blue-lg border border-blue-200'}
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-blue-600 text-white p-2 rounded-lg'>
                    <BsRobot size={18}/>
                </div>
                <h2 className='font-bold text-xl text-blue-600'>InterPrep.AI</h2>
            </div>

            <h1 className={`text-2xl md:text-3xl font-semibold text-center leading-snug mb-2 ${darkMode ? 'text-white' : ''}`}>
                Welcome to <span className='text-blue-600'>InterPrep.AI</span>
            </h1>
            
            <p className={`text-center text-sm md:text-base leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your AI Coach for Cracking Interviews
            </p>

            {/* Login/SignUp Tabs */}
            <div className={`flex mb-6 rounded-full p-1 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${isLogin ? 'bg-blue-600 text-white shadow' : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'}`}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${!isLogin ? 'bg-blue-600 text-white shadow' : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'}`}`}
                >
                    Sign Up
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4 mb-6'>
                {!isLogin && (
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-blue-200'}`}
                        required={!isLogin}
                    />
                )}
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-blue-200'}`}
                    required
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-blue-200'}`}
                    required
                />
                <motion.button 
                    type="submit"
                    whileHover={{opacity:0.9 , scale:1.02}}
                    whileTap={{opacity:1 , scale:0.98}}
                    className='w-full py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition'
                >
                    {isLogin ? 'Login' : 'Create Account'}
                </motion.button>
            </form>

            <div className='relative mb-6'>
                <div className='absolute inset-0 flex items-center'>
                    <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className={`px-4 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>Or continue with</span>
                </div>
            </div>

            <motion.button 
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1 , scale:0.98}}
            className={`w-full flex items-center justify-center gap-3 py-3 border-2 rounded-full font-semibold transition ${darkMode ? 'bg-gray-700 border-gray-600 text-blue-400 hover:bg-gray-600' : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
                <FcGoogle size={20}/>
                Continue with Google
   
            </motion.button>

            <p className={`text-xs text-center mt-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
        </motion.div>

      
    </div>
  )
}

export default Auth

