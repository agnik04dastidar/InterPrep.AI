import React from 'react'
import { useSelector } from 'react-redux'
import { BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'

function Footer() {
  const { darkMode } = useSelector((state) => state.user)
  
  return (
    <div className={`w-full font-[Raleway] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`w-full shadow-md border-t py-6 px-8 text-center ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
       
        <div className='flex justify-center items-center gap-6 mt-4'>
          <a 
            href='https://www.instagram.com/agnikdastidar/' 
            target='_blank' 
            rel='noopener noreferrer'
            className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-pink-500' : 'text-gray-500 hover:text-pink-600'}`}
          >
            <BsInstagram size={24} />
          </a>
          <a 
            href='https://www.linkedin.com/in/agnik-dastidar-13021525a/' 
            target='_blank' 
            rel='noopener noreferrer'
            className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-700'}`}
          >
            <BsLinkedin size={24} />
          </a>
          <a 
            href='https://github.com/agnik04dastidar' 
            target='_blank' 
            rel='noopener noreferrer'
            className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <BsGithub size={24} />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Footer

