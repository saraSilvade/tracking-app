import React from 'react'
import type { UserProfile } from '../types'

interface UserProfileProps {
  user: UserProfile
  openAvatarModal: () => void;
}

const UserBanner = ({ user, openAvatarModal }: UserProfileProps) => {
  const expCalc = Math.min((user.exp / user.expMax) * 100, 100)

  return (
    <section className="flex flex-wrap justify-center items-stretch gap-6 w-full max-w-7xl mx-auto bg-[#110c22]/65 border border-glass-border rounded-2xl p-6 my-6 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.1)]">
      
      {/* 1. User Profile Card (Standard Size) */}
      <div className="flex-[1] min-w-[270px] flex items-center gap-4 border border-glass-border bg-[#07090e]/40 rounded-2xl p-5 hover:border-accent-purple/50 transition-colors">
        <button
          onClick={openAvatarModal}
          className="relative group shrink-0 p-3.5 text-5xl border border-accent-purple/50 rounded-full  shadow-[0_0_10px_rgba(168,85,247,0.2)] bg-glass-box cursor-pointer overflow-hidden transition-transform active:scale-95"
          title="Change Avatar"
        >
          <span>{user.avatar || '⚔️'}</span>
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-quest-cyan font-bold rounded-full">
            Edit
          </div>
        </button>

        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="text-lg font-bold font-mono text-text-main truncate">{user.name}</p>
          <p className="text-xs font-mono text-text-muted truncate mb-2">{user.email}</p>
          <span className="w-35 text-accent-purple text-xs  font-mono font-bold border  border-accent-purple/40  bg-quest-cyan/10 px-3 py-1 rounded-md drop-shadow-[0_0_10px_rgba(168,85,247,0.2)] ">
       {user.lvlIcon || '🗡️'} Lvl {user.level} {user.title || 'Novice'}
          </span>
        </div>
      </div>

      {/* 2. Experience Card (Bigger than 1st) */}
      <div className="flex-[1.25] min-w-75 flex flex-col justify-between border border-glass-border bg-[#07090e]/40 rounded-2xl p-5  hover:border-accent-purple/50 transition-colors">
        <div className="flex justify-between items-center font-mono">
          <span className="text-text-muted text-xs font-bold uppercase">Experience</span>
          <span className="text-quest-cyan text-xs font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            {user.exp} / {user.expMax}
          </span> 
        </div>

        <div className="my-2"> 
          <div className="w-full bg-[#07090e] h-2.5 rounded-full overflow-hidden border border-glass-border/30 mb-2">
            <div 
              className="bg-quest-cyan h-full rounded-full transition-all duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" 
              style={{ width: `${expCalc}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[11px]"> 
            <span className="text-text-muted">{expCalc.toFixed(0)}% to next level</span>
            <span className="text-quest-cyan/80">{user.expMax - user.exp} XP needed</span>
          </div>
        </div>  

        <div className="text-[11px] font-mono text-text-muted/60">
          Complete daily quests to gain bonus XP
        </div>
      </div>

      {/* 3. Treasury Card (Bigger than 2nd - Largest) */}
      <div className="flex-[1.5] min-w-[340px] flex flex-col justify-between border border-glass-border bg-[#07090e]/40 rounded-2xl p-5  hover:border-accent-purple/50 transition-colors">
        <span className="text-text-muted text-xs font-mono font-bold uppercase">Treasury</span>

        <div className="flex items-center gap-4 my-2">
          <div className="text-4xl border border-amber-300/40 bg-amber-300/10 rounded-xl p-2.5 flex items-center justify-center">
            💰
          </div>
          <div className="font-mono">
            <div className="text-amber-300 text-2xl font-bold [text-shadow:0_0_10px_rgba(252,211,77,0.8)]">
              {user.gold}
            </div>
            <div className="text-text-muted text-xs">Gold coins</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono">
          <div className="bg-glass-box border border-glass-border rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">💎</span> 
              <span className="text-text-muted text-xs">Gems</span>
            </div>
            <span className="text-sm font-bold text-quest-cyan">{user.gems}</span>
          </div>

          <div className="bg-glass-box border border-glass-border rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🏆</span> 
              <span className="text-text-muted text-xs">Trophies</span>
            </div>
            <span className="text-sm font-bold text-amber-300">{user.tro}</span>
          </div>
        </div>
      </div>

    </section>
  )
}

export default UserBanner