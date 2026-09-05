import React from 'react'
import logo from '../asset/logo.svg'
import { FaCircle } from "react-icons/fa";

import type { UserProfile } from '../types/index';


interface UserProps {
  user: UserProfile;
}


const Header = ({user} : UserProps) => {
  return (
  <header className=' w-full bg-glass-card border-b border-glass-border px-6 py-3 sticky top-0 z-50 backdrop-blur-md'>
    {/* wrapper */}
      <div className='flex justify-between items-center'>

        {/* logo container */}
   <div className='flex  items-baseline gap-1.5'>
    <img className='drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' src={logo} alt={logo}/>
         <span className='text-quest-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] '>Arc</span>
   </div>



   {/* Navigation menu container */}
   <div> 
    <nav className='flex gap-8 items-center text-sm  font-semibold'>
        <a href='#' className='text-text-muted hover:text-quest-cyan transition-colors'>Dashboard</a>
        <a href='#' className='text-text-muted hover:text-quest-cyan transition-colors '>Rewards</a>
        <a href='#' className='text-text-muted hover:text-quest-cyan transition-colors'>Learn</a>
        <a href='#' className='text-text-muted hover:text-quest-cyan transition-colors'>Setting</a>
    </nav>
   </div>

   {/* system online/offline */}

   <div className=' flex items-center gap-2.5'>
   
<span >

  {user.isOnline? <FaCircle className='text-accent-green'/> : <FaCircle className='bg-red-800'/>}
  </span>
          

   </div>
      </div>
  </header>
  )
}

export default Header