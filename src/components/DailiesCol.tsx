import React from 'react';
import type { Dailies } from '../types';
import { FaFire } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";

interface DailiesColProps {
  dailies: Dailies[];
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (daily: Dailies) => void;
  onOpenAddModal: () => void;
}

export default function DailiesCol({
  dailies,
  onChecked,
  onDelete,
  onEdit,
  onOpenAddModal
}: DailiesColProps) {
  return (
    <div className="w-full max-w-lg bg-[#110c22]/65 border border-glass-border rounded-2xl p-5 mt-10 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.1)] font-mono">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <FaFire className="w-3.5 h-3.5 text-accent-purple" />
          <h3 className="text-xs font-bold text-text-muted uppercase">Dailies</h3>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="text-xs font-bold text-accent-purple bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/40 px-3 py-1 rounded-xl transition-all cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.2)] "
        >
          + New Daily
        </button>
      </div>

      {/* Dailies List */}
      <div className="flex flex-col gap-3 ">
        {dailies.map((item) => (
          <div
            key={item.id}
            className={`group relative flex items-center justify-between p-4 h-30 rounded-2xl border transition-all ${
              item.completed
                ? 'border-glass-border/40 bg-[#07090e]/30 opacity-60'
                : 'border-glass-border hover:border-accent-purple/50 bg-[#07090e]/60'
            }`}
          >
            {/* Hover Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity ">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="px-2 py-1 text-xs bg-[#1b1533] border border-glass-border rounded-md text-text-muted hover:text-accent-cyan cursor-pointer"
              >
                <MdEdit className='text-lxl' />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="px-2 py-1 text-xs bg-[#1b1533] border border-glass-border rounded-md text-text-muted hover:text-red-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Left Info */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onChecked(item.id)}
                className="w-5 h-5 rounded border-glass-border bg-[#07090e] accent-accent-purple cursor-pointer"
              />
              <span className="text-xl">{item.icon || '⚔️'}</span>
              <div>
                <p className={`text-sm font-bold ${item.completed ? 'line-through text-text-muted' : 'text-text-main'}`}>
                  {item.title}
                </p>
                {item.note && (
                  <p className="text-[11px] text-text-muted">{item.note}</p>
                )}
              </div>
            </div>

            {/* Streak Badge (If available) */}
            {item.streakDays !== undefined && (
              <div className="flex items-center gap-1 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                🔥 {item.streakDays}d
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}