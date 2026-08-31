import React, { useEffect, useState } from 'react'

import type { Dailies } from '../types';

interface DailyModalProps{
    isOpen: boolean; 
    onClose : ()=> void;
    onSave: (dailiesData : Omit< Dailies, 'id' | 'completed'> | Dailies)=> void;
    initialData?: Dailies | null; 
    
}

// Icon Set Selection
const ICONS = ['🧘', '⚔️', '📖', '🍎', '💻', '💧', '🏃', '🎸', '✏️', '🏴‍☠️', '🎯', '🌿', '🧠', '🚴', '🛌', '🎨'];

export default function DailyModal({isOpen, onClose, onSave, initialData}: DailyModalProps) {

    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('⚔️');
    const [note, setNote] = useState('');

useEffect(()=>{
if(initialData){
    setTitle(initialData.title);
    setIcon(initialData.icon);
    setNote(initialData.note || '') ;
}else{
    setTitle('');
      setIcon('⚔️');
      setNote('');
}




},[initialData, isOpen])

// isOpen not true return null

if(!isOpen) return null

// Handle the submit event

const handleSubmit = (e: React.SubmitEvent)=>{
    e.preventDefault(); 
    if(!title.trim()) return;

    if(initialData){
        onSave({...initialData, title, icon, note});
    }else{
        onSave({title,icon, note, });
    }
    onClose();
}



  return (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono text-xs">
      <div className="w-full max-w-md bg-[#110c22] border border-glass-border rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-text-main mb-4">
          {initialData ? 'Edit Daily Quest' : 'New Daily Quest'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-text-muted mb-1">QUEST NAME</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Workout"
              className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main focus:outline-none focus:border-accent-purple"
              required
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-text-muted mb-1">ICON</label>
            <div className="grid grid-cols-8 gap-1.5 p-2 bg-app-bg border border-glass-border rounded-xl">
              {ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`p-1.5 rounded-lg text-base ${icon === emoji ? 'bg-accent-purple/40 border border-accent-purple' : 'hover:bg-white/5'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Notes In Case */}
          <div>
            <label className="block text-text-muted mb-1">NOTE (OPTIONAL)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. At least 20 minutes"
              className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main focus:outline-none focus:border-accent-purple"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-app-bg border border-glass-border rounded-xl text-text-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent-purple text-white rounded-xl font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              {initialData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
