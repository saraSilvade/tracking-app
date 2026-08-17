
import React from 'react'

interface SubheaderProps{
    activeQuestCount?: number;
    dailiesCompleted? : number;
    dailiesTotal?: number;
    habitsTotal?: number;
}


export default function DashboardSubHeader({ 
    activeQuestCount = 3,
    dailiesCompleted =  5, 
    dailiesTotal = 6, 
    habitsTotal = 23
}: SubheaderProps){


const today = new Date(); 

const formatDate = today.toLocaleDateString('en-US', {
  weekday: 'short', 
  month : 'short', 
  day: 'numeric', 
  year : 'numeric'
})

const date = formatDate.replace( /,/g, ' .')


    return(
        <section className='mt-5'>
<div className="w-full flex items-center justify-between gap-4 text-xs font-mono py-2">

<span className='text-text-muted'> {date}</span>
<span className='bg-glass-border h-0.5 w-120'></span>

<div  className='flex  gap-3'>
    <div> <span className='text-accent-gold [text-shadow:0_0_10px_rgba(252,211,77,0.8)]'>{activeQuestCount}</span>
     <span className='text-text-muted text-xs '> Active Quest</span>
    </div>
    
    <div>   <span className='text-quest-purple [text-shadow:0_0_10px_rgba(128, 0, 128)]'>{dailiesCompleted}/{dailiesTotal} </span>
    <span className='text-text-muted text-xs'> Dailies Done</span>
     </div>
<div>  
    <span className='text-accent-cyan  [text-shadow:0_0_10px_rgba(0, 255, 255)]'>{habitsTotal}</span>
     <span className='text-text-muted text-xs'> Habits Total</span></div>

</div>
</div>

        </section>
    )
}