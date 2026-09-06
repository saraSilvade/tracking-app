import React from 'react'

import type { FloatPopUpItem } from '../types'


interface  FloatingProps {
    pops: FloatPopUpItem[];
}



const FloatUp = ({pops}: FloatingProps) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      
  {pops.map((pop)=>(

    <span key={pop.id}
    className="animate-float-pop-up absolute font-mono text-sm font-extrabold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
    style={{
        left: `${pop.x}px`,
            top: `${pop.y}px`,
            color: pop.color || '#38bdf8'
    }}>
{pop.text}

    </span>
  ))}
        </div>
  )
}

export default FloatUp