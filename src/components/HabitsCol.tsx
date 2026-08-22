import React from 'react'

import type { Habits } from '../types'
import { FaDiamond } from "react-icons/fa6";
interface HabitsPropList {
    habits : Habits[]; 
    habitIncrement:(id:string) => void;
    habitDecrement: (id: string) => void;

}


function HabitsCol({habits, habitIncrement, habitDecrement}: HabitsPropList) {
  return (
    <div className=' w-100 bg-[#110c22]/65 border border-glass-border rounded-2xl p-5 mt-10 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.1)]'>
        {/*column header  */}
<div className='flex items-center gap-2 border-b border-glass-border pb-3 mb-4'> 

    <FaDiamond className="w-3 h-3 text-accent-cyan" />
    <h3 className='text-xs font-mono font-bold text-text-muted uppercase'>Habits</h3>

    
</div>


<div className='flex flex-col gap-3'>
    
{habits.map((habit) =>
<div className='border border-glass-border  p-4 rounded-2xl transition-all hover:border-[#a855f7]/50' key={habit.id}>
    <div className='flex justify-between'>
    <div className='flex gap-3.5'>
        <span>{habit.icon}</span>
        <p className='text-sm'>{habit.title}</p>

         </div>

         <div className='flex flex-row-reverse gap-2 shrink-0' >
            <button className="w-8 h-8 rounded-lg bg-accent-cyan-dimmed border border-accent-cyan2 text-accent-cyan hover:text-text-main flex items-center justify-center font-bold cursor-pointer" onClick={() => habitIncrement(habit.id)} >+</button>



            <button className="w-8 h-8 rounded-lg bg-quest-purple  border border-shinny-purple2 text-shinny-purple3 hover:bg-quest-purple hover:text-pink-50 flex items-center justify-center font-bold cursor-pointer " onClick={() => habitDecrement(habit.id)}>-</button>
         </div>
    </div>

<div> <p className='text-xs text-text-muted font-mono'> {habit.count * 15} mins today</p></div>
</div> )}

</div>

    </div>
  )
}

export default HabitsCol