import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";

import Footer from '../components/Footer';


// Typewriter component for tagline animation
function TypewriterText() {
  const text = "Your AI Coach for Cracking Interviews.";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`inline-block w-0.5 h-4 bg-blue-600 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
}


function Home() {
  const { userData, darkMode } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className={`min-h-screen flex flex-col font-[Raleway] ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <Navbar />

      <div className='flex-1 px-6 pt-28'>
        <div className='max-w-6xl mx-auto'>

          <div className='text-center mb-20'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto drop-shadow-lg ${darkMode ? 'text-white' : ''}`}>
              Practice For Interviews With <span className='text-blue-600 drop-shadow-md'>InterPrep.AI</span>
            </motion.h1>

            {/* Tagline with typing animation - below heading */}
            <div className='flex justify-center mt-6'>
              <div className='text-blue-600 font-semibold text-xl md:text-2xl px-4 py-2 rounded-full font-[Raleway] animate-pulse'>
                <TypewriterText />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`mt-6 max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
             "Practice role-specific mock interviews powered by AI with smart follow-up questions, dynamic difficulty adjustment, and instant performance analysis."
            </motion.p>

            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md'>
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className={`px-10 py-3 rounded-full transition ${darkMode ? 'border border-gray-600 text-white hover:bg-gray-800' : 'border border-gray-300 hover:bg-gray-100'}`}>
                Interview History
              </motion.button>
            </div>
          </div>

          {/* Scrollable Cards Section - Picture Format with Floating Effects */}
          <div className='mb-20'>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center mb-8'
            >
              <h2 className='text-3xl font-extrabold text-blue-600 drop-shadow-md'>How It Works</h2>
              <p className={`mt-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Start your interview preparation in 3 simple steps</p>
            </motion.div>

            {/* Cards Container - Centered */}
            <div className='flex flex-wrap justify-center gap-6 pb-6 px-4 max-w-4xl mx-auto'>
              {[
                {
                  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
                  step: "STEP 1",
                  title: "Choose Your Role",
                  desc: "Select from HR, Technical, or custom interview roles.",
                  icon: "🎯"
                },
                {
                  image: "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?w=400&h=300&fit=crop",
                  step: "STEP 2",
                  title: "AI Voice Interview",
                  desc: "Practice with AI that asks intelligent follow-up questions.",
                  icon: "🎤"
                },
                {
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                  step: "STEP 3",
                  title: "Get Performance Analysis",
                  desc: "Receive detailed feedback and improvement suggestions.",
                  icon: "📊"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`snap-center flex-shrink-0 w-72 rounded-2xl border-2 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 overflow-hidden relative ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}
                >
                  {/* Image */}
                  <div className='relative h-40 overflow-hidden'>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent'></div>
                    <div className='absolute bottom-3 left-3 text-3xl'>{item.icon}</div>
                  </div>
                  
                  {/* Content */}
                  <div className='p-5'>
                    <div className='text-xs font-bold text-blue-600 mb-2 tracking-wider'>{item.step}</div>
                    <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          <div className='mb-32' id="smart-ai-features">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl font-extrabold text-center mb-16 drop-shadow-lg ${darkMode ? 'text-white' : ''}`}>
              Smart{" "}
              <span className="text-blue-600 drop-shadow-md">AI Features</span>
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {[
                  {
                    image: "https://plus.unsplash.com/premium_vector-1771076051687-1ed2e5ffc96c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    icon: <BsBarChart size={20} />,
                    title: "AI Response Evaluation",
                    desc: "Analyzes communication, technical accuracy, and confidence."
                  },
                  {
                    image: "https://plus.unsplash.com/premium_vector-1682310651540-1b314bb8e965?w=1000&auto=format&fit=crop&q=60",
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume-Based Interviews",
                    desc: "Generates project-specific questions from your uploaded resume."
                  },
                  {
                    image: "https://images.unsplash.com/vector-1739895565856-49d29cc77551?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG93bmxvYWRhYmxlJTIwcGVyZm9ybWFuY2UlMjByZXBvcnR8ZW58MHx8MHx8fDA%3D",
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable Performance Report (PDF Format)",
                    desc: "Detailed insights on strengths, weaknesses, and areas for improvement."
                  },
                  {
                    image: "https://plus.unsplash.com/premium_vector-1727956884194-a3a43efcf726?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGVyZm9ybWFuY2UlMjBIaXN0b3J5JTIwJTI2JTIwQW5hbHl0aWNzfGVufDB8fDB8fHww",
                    icon: <BsBarChart size={20} />,
                    title: "Performance History & Analytics",
                    desc: "Track progress with performance graphs and topic insights."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-64' />
                      </div>

                      <div className='w-full md:w-1/2'>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                          {item.icon}
                        </div>
                        <h3 className={`font-semibold mb-3 text-xl ${darkMode ? 'text-white' : ''}`}>{item.title}</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl font-extrabold text-center mb-16 drop-shadow-lg ${darkMode ? 'text-white' : ''}`}>
              Various Interview{" "}
              <span className="text-blue-600 drop-shadow-md">Formats</span>
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {[
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Evaluates behavioral responses and communication skills."
                  },
                  {
                    img: techImg,
                    title: "Technical Interview Mode",
                    desc: "Role-specific technical questions and problem-solving evaluation."
                  },
                  {
                    img: confidenceImg,
                    title: "Confidence Analysis",
                    desc: "Evaluates tone and vocal delivery for confidence cues."
                  },
                  {
                    img: creditImg,
                    title: "Session Credits",
                    desc: "Use credits to access premium interview sessions."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className={`border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className='flex items-center justify-between gap-6'>
                      <div className="w-1/2">
                        <h3 className={`font-semibold text-xl mb-3 ${darkMode ? 'text-white' : ''}`}>
                          {mode.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {mode.desc}
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        <Footer/>

    </div>
  )
}

export default Home

