import React from 'react'
import Logo from '../assets/images/Logo.png'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <div className="mt-auto pt-12 bg-black">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 items-stretch">

        <div className="flex flex-col justify-center text-center border rounded-xl h-full order-2 md:order-1 p-10">
          <h5 className="text-blue-500 mb-4">CONNECT WITH US</h5>
          <div className="flex items-center justify-center mb-2">
            <Phone size={16} className="mr-2" />
            <span>+91 9567843340</span>
          </div>
          <div className="flex items-center justify-center">
            <Mail size={16} className="mr-2" />
            <span>info@deepnetsoft.com</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center text-center border rounded-xl relative p-10 h-full order-1 md:order-2">
          <div className="mb-4">
            <img className='absolute -top-8 left-1/2 transform -translate-x-1/2 h-[60px] w-[60px]' src={Logo} alt="" />
            <h3 className="text-xl mt-2">
              <span className="text-blue-500">DEEP</span>{" "}
              <span className="text-white">NET</span>{" "}
              <span className="text-gray-500">SOFT</span>
            </h3>
          </div>
          <div className="flex justify-center space-x-4">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
            <Youtube size={20} />
          </div>
        </div>
        
        <div className="flex flex-col justify-center text-center border rounded-xl h-full order-3 md:order-3 p-10">
          <h5 className="text-blue-500 mb-4">FIND US</h5>
          <div className="flex items-center justify-center">
            <MapPin size={16} className="mr-2" />
            <span>First floor, Geo Infopark,<br/> Infopark EXPY, Kakkanad</span>
          </div>
        </div>
      </div>         
    </div>
    <div className="py-4 flex flex-col md:flex-row justify-between pl-0 pr-0 md:pl-25 md:pr-25 items-center" style={{backgroundColor:'oklch(0.18 0 0)'}}>
        <p className="text-gray-500 text-sm">© 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-gray-500 text-sm hover:text-white">Terms & Conditions</a>
          <a href="#" className="text-gray-500 text-sm hover:text-white">Privacy Policy</a>
        </div>
      </div>
  </div>
  )
}

export default Footer
