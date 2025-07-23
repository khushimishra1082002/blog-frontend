import React from 'react'
import { FaInstagram, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa'
import { IoLogoFacebook } from 'react-icons/io'
const SocialIcon = () => {
  return (
    <div>
        <div className="flex items-center gap-3 md:gap-5
         text-[23px] text-gray-600">
      <a href="#" className="text-blue-700 hover:scale-110 transition-all duration-300">
        <IoLogoFacebook />
      </a>
      <a href="#" className="text-pink-500 hover:scale-110 transition-all duration-300">
        <FaInstagram />
      </a>
      <a href="#" className="text-sky-500 hover:scale-110 transition-all duration-300">
        <FaTwitterSquare />
      </a>
      <a href="#" className="text-red-600 hover:scale-110 transition-all duration-300">
        <FaYoutubeSquare />
      </a>
    </div>
    </div>
  )
}

export default SocialIcon
