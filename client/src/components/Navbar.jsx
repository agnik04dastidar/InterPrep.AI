import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsCoin, BsSun, BsMoon } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData, toggleDarkMode } from '../redux/userSlice';
import logoImg from "../assets/Logo.png";

function Navbar() {
    const {userData, darkMode} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 w-full font-[Raleway] shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.3}}
        className='w-full px-8 py-4 flex justify-between items-center'>
            {/* Logo */}
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img src={logoImg} alt="InterPrep.AI" className='h-10 w-auto object-contain' />
                <h1 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-blue-600'}`}>InterPrep.AI</h1>
            </div>

            {/* Navigation & Auth Section - All on right */}
            <div className='flex items-center gap-6'>
                {/* Navigation Links */}
                <div className='flex items-center gap-4'>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`font-semibold px-3 py-1.5 hover:text-blue-800 transition ${darkMode ? 'text-gray-200' : 'text-blue-600'}`}>
                        Home
                    </button>
                    <button onClick={() => document.getElementById('smart-ai-features')?.scrollIntoView({ behavior: 'smooth' })} className={`font-semibold px-3 py-1.5 hover:text-blue-800 transition ${darkMode ? 'text-gray-200' : 'text-blue-600'}`}>
                        About Us
                    </button>
                </div>

                {/* Dark Mode Toggle */}
                <button 
                    onClick={() => dispatch(toggleDarkMode())}
                    className={`p-2 rounded-full transition ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                </button>

                {/* Login/SignUp Buttons for unauthenticated users */}
                {!userData ? (
                    <div className='flex items-center gap-3'>
                        <button 
                            onClick={() => navigate("/auth")}
                            className={`font-semibold hover:text-blue-800 transition ${darkMode ? 'text-gray-200' : 'text-blue-600'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate("/auth")}
                            className='bg-blue-600 text-white font-semibold border-2 border-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 transition'
                        >
                            Sign Up
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='relative'>
                            <button onClick={()=>{
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }} className={`flex items-center gap-2 px-4 py-2 rounded-full text-md font-semibold border transition ${darkMode ? 'bg-gray-700 text-blue-400 border-gray-600 hover:bg-gray-600' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'}`}>
                                <BsCoin size={20}/>
                                {userData?.credits || 0}
                            </button>

                            {showCreditPopup && (
                                <div className={`absolute right-0 mt-3 w-64 shadow-blue-lg border rounded-xl p-5 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}>
                                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Need more credits to continue interviews?</p>
                                    <button onClick={()=>navigate("/pricing")} className='w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition'>Buy more credits</button>
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <button
                            onClick={()=>{
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }} className='w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold border-2 border-blue-300'>
                                {userData?.name?.slice(0,1).toUpperCase()}
                            </button>

                            {showUserPopup && (
                                <div className={`absolute right-0 mt-3 w-56 shadow-blue-lg border rounded-xl p-4 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}>
                                    <p className={`text-md font-bold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{userData?.name}</p>
                                    <button onClick={()=>navigate("/history")} className={`w-full text-left text-sm py-2.5 px-3 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-50 text-gray-700'}`}>Interview History</button>
                                    <button onClick={handleLogout} 
                                    className={`w-full text-left text-sm py-2.5 px-3 flex items-center gap-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-500'}`}>
                                        <HiOutlineLogout size={16}/>
                                        Logout</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    </div>
  )
}

export default Navbar

