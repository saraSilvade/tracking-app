import React from 'react'
import type { UserProfile } from '../types'


interface UserProfileprops {
    user: UserProfile
}

const UserBanner = ({user}: UserProfileprops) => {

    const expCalc = Math.min((user.exp / user.expMax)* 100, 100)



  return (
    <section className=' flex justify-center gap-5 pt-8 w-full bg-glass-card border-b border-glass-border px-6 py-3 sticky top-0 z-50 backdrop-blur-md  '>
{/* user profile card  */}
<div className=' w-75 flex border bg-glass-card border-cyan-900 rounded-2xl  gap-6 justify-center items-center h-35  mt-10'>
     <div className='p-2 text-6xl border border-quest-cyan rounded-full drop-shadow-[0_0_10px_rgba(34,211,238,1)]'>{user.avatar}</div>




{/* user details */}
    <div className='flex-col gap-1'>
<p className='text-xl mb-2'>{user.name}</p>
<p className='text-sm text-text-muted mb-2'> {user.email}</p>
<span className='  text-accent-cyan text-sm border border-cyan-900 pl-2 pr-2 p-1 rounded-sm drop-shadow-[0_0_10px_rgba(34,211,238,1)] '> {user.lvlIcon}  Lvl {user.level} Warrior </span>

    </div>

</div>



{/* User experience card/ progress bar  */}

     <div className='w-75  border bg-glass-card border-cyan-900 rounded-2xl  justify-center p-4 h-40 mt-5 '>
    <div className='flex justify-between '>
        <span className='text-text-muted '> Experience</span>
        <span className='text-quest-cyan drop-shadow-[0_0_10px_rgba(34,211,238,1)]'>{user.exp} / {user.expMax}</span> 
    </div>


<div className='' >
    <div> 
        <div className='my-3 w-full bg-glass-box h-3 rounded-full overflow-hidden border border-glass-border'>
        <div className=' bg-quest-cyan h-full rounded-full transition-all   drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]' style={{width: `${expCalc}%`}}/>
        </div>
<div className='flex justify-between'> 
    <span className='text-text-muted text-xs'>{expCalc.toFixed(0)}% to next level </span>
    <span className='text-cyan-600 text-xs'>{user.expMax - user.exp} XP needed</span>
</div>
        </div>  
</div>
     </div>




{/* 3. Treasury (Currency) Card */}
<div className='w-75 bg-glass-card border border-cyan-900   rounded-2xl p-7  justify-around backdrop-blur-md h-50  '>
<span className='text-text-muted  '> Treasury</span>

    <div className='flex gap-4 my-1.5'>

<div className='text-4xl border border-amber-300 rounded-2xl p-2 my-1'>💰 </div>
<div className='text-amber-300 text-2xl [text-shadow:0_0_10px_rgba(252,211,77,0.8)]' >{user.gold}
    <div className='text-text-muted text-xs'>Gold coins</div>
</div>
    </div>



    <div className='flex  gap-3'>
       
       <div className=' w-25 bg-glass-box border border-cyan-700 rounded-md '> 
        <div className='flex items-center gap-2 pl-2'>
<span >💎</span> 
  <div className='text-text-muted text-xs '>{user.gems} 
          
        </div>
        </div>
        
      
          <span className='text-text-muted text-xs pl-2'>Gems</span>
       </div>



    <div className=' w-25 bg-glass-box border border-cyan-700 rounded-md '> 
        <div className='flex  items-center gap-2 pl-2'>
   <span>🏆</span> 
        <div className='text-text-muted text-xs '>{user.tro} </div>
                 
        </div>
      <span className='text-text-muted text-xs pl-2'>Trophies</span>
       </div>


      
    </div>

</div>


    </section>
  )
}

export default UserBanner