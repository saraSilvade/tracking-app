import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const LogoutButton = () => {
  return (
    <div className="flex items-center">
      <button             
        onClick={() => signOut(auth)}
        className="flex items-center   gap-2 text-xs font-mono font-bold text-text-main bg-[#16122b]  border-glass-border px-3.5 py-5 rounded-r-3xl hover:text-accent-purple  hover:border-accent-purple/60   transition-all duration-200 cursor-pointer  shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] " 
      >
        <span>LOGOUT</span>

      </button>
    </div>
  )
}

export default LogoutButton