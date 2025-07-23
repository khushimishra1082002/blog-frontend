import React from 'react'
import SubscriptionForm from './SubscriptionForm'

const Footer = () => {
  return (
    <>
      <div className=' bg-white w-full py-8 shadow space-y-5'>
      <div className=' w-11/12 m-auto space-y-12'>
      <div className=' flex md:flex-row flex-col  gap-5 md:gap-4 md:justify-between md:items-center '>
        <div className=' space-y-4'>
          <h3 className=' text-base md:text-xl font-Poppins font-medium'>Sign Up To Our Newsletter</h3>
          <p className='font-Inter text-sm text-gray-600'>
            Stay Up To Date with the Latest News,announcements and Articles
          </p>
        </div>
       <div>
        <SubscriptionForm/>
       </div>
       </div>
       
       <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
        
        <div className=' space-y-2'>
        <h4 className=' text-base font-medium font-Poppins'>About</h4>
        <ul className=' space-y-2'>
          <li className='text-xs font-Inter'>Our Mission</li>
          <li className='text-xs font-Inter'>Meet Team</li>
          <li className='text-xs font-Inter'>Write for us</li>
          <li className='text-xs font-Inter'>Contact Us</li>
          <li className='text-xs font-Inter'>Pricing</li>
          <li className='text-xs font-Inter'>Release</li>
        </ul>
        </div>
        <div className=' space-y-2'>
        <h4 className=' text-base font-medium font-Poppins'> Categories</h4>
        <ul className=' space-y-2'>
          <li className='text-xs font-Inter'>Fashion</li>
          <li className='text-xs font-Inter'>LifeStyle</li>
          <li className='text-xs font-Inter'>Education</li>
          <li className='text-xs font-Inter'>Sports</li>
          <li className='text-xs font-Inter'>Fitness</li>
        </ul>
        </div>
        <div className=' space-y-2'>
        <h4 className=' text-base font-medium font-Poppins'>Resource</h4>
        <ul className=' space-y-2'>
          <li className='text-xs font-Inter'>Contact</li>
          <li className='text-xs font-Inter'>FAQs</li>
          <li className='text-xs font-Inter'>Solutions</li>
          <li className='text-xs font-Inter'>Write for Us</li>
          <li className='text-xs font-Inter'>Sitemap</li>
        </ul>
        </div>
        <div className=' space-y-2'>
        <h4 className=' text-base font-medium font-Poppins'>Social Media</h4>
        <ul className=' space-y-2'>
          <li className='text-xs font-Inter'>Facebook</li>
          <li className='text-xs font-Inter'>Instagram</li>
          <li className='text-xs font-Inter'>Github</li>
          <li className='text-xs font-Inter'>YouTube</li>
          
        </ul>
        </div>
        <div className=' space-y-2'>
        <h4 className=' text-base font-medium font-Poppins'>Legal</h4>
        <ul className=' space-y-2'>
          <li className='text-xs font-Inter'>Terms</li>
          <li className='text-xs font-Inter'>Privacy</li>
          <li className='text-xs font-Inter'>Cookies</li>
          <li className='text-xs font-Inter'>License</li>
          <li className='text-xs font-Inter'>Setting</li>
          <li className='text-xs font-Inter'>Contact</li>
        </ul>
        </div>
       </div>
      </div>
      </div>
    </>
  )
}

export default Footer
