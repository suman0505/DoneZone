import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-around bg-purple-500 text-white py-3'>
    <div className="logo">
        <span className='font-bold text-xl mx-8 '>iTask</span>
    </div>
  <ul className="flex gap-8 mx-9">
    <li className='cursor-pointer  hover:text-blue-400 transition-all duration-50'>
        Home
    </li>
    <li className='cursor-pointer hover:text-blue-400 transition-all duration-50'>
        Tasks for the Day
    </li>
  </ul>
   </nav>
  )
}

export default Navbar