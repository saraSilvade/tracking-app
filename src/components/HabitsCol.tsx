import React from 'react'
import type { Habits } from '../types'
import { FaDiamond } from "react-icons/fa6"

interface HabitsPropList {
  habits: Habits[]
  habitIncrement: (id: string) => void
  habitDecrement: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (habit: Habits) => void
  onOpenAddModal: () => void
}

function HabitsCol({
  habits,
  habitIncrement,
  habitDecrement,
  onDelete,
  onEdit,
  onOpenAddModal
}: HabitsPropList) {
  return (
    <div className="w-full max-w-lg bg-[#110c22]/65 border border-glass-border rounded-2xl p-5 mt-10 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.1)]">
      
      {/* Header for the habit column */}
      <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <FaDiamond className="w-3 h-3 text-accent-cyan" />
          <h3 className="text-xs font-mono font-bold text-text-muted uppercase">Habits</h3>
        </div>

        {/* + Add New Habit Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="text-xs font-mono font-bold text-accent-cyan bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/40 px-3 py-1 rounded-xl transition-all cursor-pointer shadow-[0_0_10px_rgba(56,189,248,0.2)]"
        >
          + New Habit
        </button>
      </div>

      {/* Habit List that render in card */}
      <div className="flex flex-col gap-3">
        {habits.map((habit) => {
          const isCompleted = habit.count >= habit.target
          const progressPercent = Math.min(100, Math.round((habit.count / habit.target) * 100))

          return (
            <div
              key={habit.id}
              className="group relative border border-glass-border p-4 rounded-2xl transition-all hover:border-accent-purple/50 bg-[#07090e]/40"
            >
              {/* Edit and Delete displays when user hovers */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                <button
                  type="button"
                  onClick={() => onEdit(habit)}
                  className="px-2 py-1 text-xs bg-[#1b1533] border border-glass-border rounded-md text-text-muted hover:text-accent-cyan cursor-pointer transition-colors"
                  title="Edit Habit"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(habit.id)}
                  className="px-2 py-1 text-xs bg-[#1b1533] border border-glass-border rounded-md text-text-muted hover:text-red-400 cursor-pointer transition-colors"
                  title="Delete Habit"
                >
                  ✕
                </button>
              </div>

              {/* single Habit Info */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{habit.icon || '🧘'}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold font-mono text-text-main">{habit.title}</p>
                    {isCompleted && <span className="text-xs">✅</span>}
                  </div>
                  <p className="text-[11px] font-mono text-text-muted">
                    {habit.unit || 'units'} · target {habit.target}
                  </p>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full h-1.5 bg-[#07090e] rounded-full overflow-hidden my-3 border border-glass-border/30">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: habit.accentColor || '#a855f7'
                  }}
                />
              </div>

              {/* Increment / Decrement div */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => habitDecrement(habit.id)}
                  className="w-8 h-8 rounded-lg bg-quest-purple border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white flex items-center justify-center font-mono font-bold text-xs cursor-pointer transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                >
                  -{habit.stepSize || 1}
                </button>

                <p className="text-xs font-mono text-text-muted">
                  <strong className="text-sm text-text-main font-bold">{habit.count}</strong> / {habit.target} {habit.unit}
                </p>

                <button
                  type="button"
                  onClick={() => habitIncrement(habit.id)}
                  className="w-8 h-8 rounded-lg bg-accent-cyan-dimmed border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-black flex items-center justify-center font-mono font-bold text-xs cursor-pointer transition-all shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                >
                  +{habit.stepSize || 1}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HabitsCol