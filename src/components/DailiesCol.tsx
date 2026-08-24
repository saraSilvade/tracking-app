import React from 'react'
import type { Dailies } from '../types'
import { FaDiamond } from "react-icons/fa6";
interface DailiesProps {
    dailies: Dailies[];
    onChecked : (id: string) => void;

}

const DailiesCol = ({dailies, onChecked} : DailiesProps) => {
  return (
    <div className=' w-100 bg-[#110c22]/65 border border-glass-border rounded-2xl p-5 mt-10 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.1)]'  >
        {/*column header  */}
<div className='flex items-center gap-2 border-b border-glass-border pb-3 mb-4'> 

    <FaDiamond className="w-3 h-3 text-accent-cyan" />
    <h3 className='text-xs font-mono font-bold text-text-muted uppercase'>Dailies</h3>

    
</div>
 <div className='flex flex-col gap-3'>
        {dailies.map((daily)=> 
  
         <div  className='border border-glass-border  p-4 rounded-2xl transition-all hover:border-[#a855f7]/50' key={daily.id}>
            <div className='flex justify-between'>
<div className='flex gap-3.5'>
{/* CHECKBOX BUTTON */}
              <button
                type="button"
                onClick={() => onChecked(daily.id)}
                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                  daily.completed
                    ? 'bg-accent-purple/20 border-accent-purple text-accent-purple  shadow-[0_0_10px_rgba(168,85,247,0.4)]  '
                    : 'bg-[#110c22] border-glass-border  text-transparent hover:border-accent-purple/60'
                }`}
              >
                {/* Shows checkmark symbol clearly when completed */}
                <span className={`text-xs font-bold ${daily.completed ? 'opacity-100' : 'opacity-0'}`}>
                  ✓
                </span>
              </button>

                 
                <span>{daily.icon}</span>
</div>
                <h3 className={` text-sm ${daily.completed ? 'text-decoration-line: line-through text-text-muted': 'text-decoration-line:none' }`}>{daily.title}</h3>
                <span> 🔥 {daily.streak}</span>


            </div>

        </div>
)}
    </div>
       </div>
  )
}

export default DailiesCol