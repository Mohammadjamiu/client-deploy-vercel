import React from 'react'
import AmigoLogoLight from '../assets/amigo_logo.png'

const Navbar = () => {
  return (
    <header className="h-14 w-full bg-white dark:bg-black sticky top-0 z-30 border-b-[0.5px] border-amigo-primary-100   ">
    <div className="relative  flex justify-between items-center h-full">
      {/* Logo Section */}
      <div className="flex items-center justify-start">
        <img src={AmigoLogoLight} alt="Logo" className="h-9 w-9 inline-block" />
      </div>

    
    </div>
  </header>
  )
}

export default Navbar
