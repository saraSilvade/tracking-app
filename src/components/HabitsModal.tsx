import React, { useEffect, useState } from 'react'

import type { Habits } from '../types'


interface HabitModalProps {
    isOpen: boolean; 
    onClose: () => void;
    onSave : (habitsData : Omit< Habits, 'id' | 'count'> | Habits) => void;
    initialData ?: Habits | null;
}

const ICONS = ['🧘', '⚔️', '📖', '🍎', '💻', '💧', '🏃', '🎸', '✏️', '🏴‍☠️', '🎯', '🌿', '🧠', '🚴', '🛌', '🎨'];
const COLORS = ['#38bdf8', '#a855f7', '#22c55e', '#e012dd','#ffe921', '#c90505', '#60a5fa', '#ffa6ef'];
const PRESET_UNITS = ['Minutes', 'Hours', 'Glasses', 'Pages', 'Steps', 'Custom'];

const HabitsModal = ({isOpen, onClose, onSave, initialData} : HabitModalProps) => {
    const[title,setTitle] = useState('');
    const [icon, setIcon] = useState('🧘');
    const[unit, setUnit] = useState('minutes');
    const [target, setTarget] = useState(30);
    const[countPerTap, setCountPerTap] = useState(5);
    const [accentColor, setAccentColor] = useState('#38bdf8');
    const [unitSelect, setUnitSelect] = useState('Minutes');
    const [customUnit, setCustomUnit] = useState('')



    useEffect(()=> {
  if(initialData){
    setTitle(initialData.title);
    setIcon(initialData.icon);
    setUnit(initialData.unit);
    setTarget(initialData.target);
    setCountPerTap(initialData.countPerTap);
    setAccentColor(initialData.accentColor);
   
   
    if(PRESET_UNITS.includes(initialData.unit)){
      setUnitSelect(initialData.unit);
      setCustomUnit('');
    }else{
      setUnitSelect('Custom')
      setCustomUnit(initialData.unit)
    }
  }else{
    setTitle('');
      setIcon('🧘');
      setUnit('minutes');
      setTarget(30);
      setCountPerTap(5);
      setAccentColor('#38bdf8');
  }

    },[initialData, isOpen]);

if(!isOpen) return null;



// submit handling
const handleSubmit = (e : React.SubmitEvent)=>{
    e.preventDefault();

    if(!title.trim()) return;

const finalUnit = unitSelect === 'Custom' ? customUnit : unitSelect;
  if (!finalUnit.trim()) return;

    if(initialData){
        onSave({ ...initialData, title, icon, unit: finalUnit, target: Number(target), countPerTap: Number(countPerTap), accentColor })
    }else{
        onSave({ title, icon, unit: finalUnit, target: Number(target), countPerTap: Number(countPerTap), accentColor });
        
    }
onClose();
};




  return (
<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-[#110c22] border border-glass-border rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-mono font-bold text-text-main mb-4">
          {initialData ? 'Edit Habit' : 'New Habit'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
          {/* Name */}
          <div>
            <label className="block text-text-muted mb-1">NAME</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Run"
              className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main focus:outline-none focus:border-accent-purple"
              required
            />
          </div>

          {/* Icon Picker */}
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

          {/* Unit & Target */}
          <div className="grid grid-cols-2 gap-3">
        
        <div >
          <label className='block text-text-muted mb-1 '>UNIT TYPE</label>
          <select 
          value={unitSelect}
          onChange={(e)=> setUnitSelect(e.target.value)}
          required
          className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main focus:outline-none focus:border-accent-purple"
          >
        {PRESET_UNITS.map((u)=>(
          <option key={u} value={u} className="bg-app-bg text-white">
          {u}
          </option>
        ))}
          </select>

        </div>



            <div>
              <label className="block text-text-muted mb-1">DAILY TARGET</label>
              <input 
                type="number" 
                value={target} 
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main"
                min="1"
                required
              />
            </div>
          </div>
{/* If user select custom */}
{unitSelect === 'Custom' &&(
  <div>
    <label className='block text-text-muted mb-1'>CUSTOM UNIT NAME</label>
    <input
    type='text'
    value={customUnit}
    onChange={(e)=> setCustomUnit(e.target.value)}
    placeholder="e.g. Km, Reps, Chapters"
      className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main focus:outline-none focus:border-accent-purple"
      required
    />
  </div>
)}
          {/* Step Size */} 
          <div>
            <label className="block text-text-muted mb-1">COUNT PER TAP</label>
            <input 
              type="number" 
              value={countPerTap} 
              onChange={(e) => setCountPerTap(Number(e.target.value))}
              className="w-full bg-app-bg border border-glass-border rounded-xl px-3 py-2 text-text-main"
              min="1"
              required
            />
          </div>

          {/* Accent Colors */}
          <div>
            <label className="block text-text-muted mb-1">ACCENT COLOR</label>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAccentColor(color)}
                  className={`w-6 h-6 rounded-full border ${accentColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
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
              {initialData ? 'Save Changes' : 'Add Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitsModal