import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/images/Logo.png'

const Navbar=() =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full bg-black md:h-[100px] h-[50px]">
      <div className='absolute md:top-13 w-full py-4 px-6 md:px-40 flex justify-center md:justify-between z-60'>
        <div className="flex items-center">
          <div className="mr-2">
            <img className='h-[60px] w-[60px]' src={Logo} alt="Logo" />
          </div>
          <div className='hidden md:block'>
            <h1 className="text-2xl">
              <span className="text-blue-500">DEEP</span>{" "}
              <span className="text-white">NET</span>
            </h1>
            <p className="text-gray-400 text-xl">SOFT</p>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-6 text-[16px]">
          <a href="#" className="hover:text-blue-500">HOME</a>
          <a href="#" className="text-blue-500">MENU</a>
          <a href="#" className="hover:text-blue-500">MAKE A RESERVATION</a>
          <a href="#" className="hover:text-blue-500">CONTACT US</a>
        </nav>
      </div>
      <div className='md:hidden absolute top-0 right-0 p-3 z-60'>
      <button 
          className="md:hidden al text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-[50px] left-0 right-0 bg-black z-50 ">
          <div className="flex flex-col py-4">
            <a href="#" className="px-6 py-2 hover:text-blue-500">HOME</a>
            <a href="#" className="px-6 py-2 text-blue-500">MENU</a>
            <a href="#" className="px-6 py-2 hover:text-blue-500">MAKE A RESERVATION</a>
            <a href="#" className="px-6 py-2 hover:text-blue-500">CONTACT US</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar