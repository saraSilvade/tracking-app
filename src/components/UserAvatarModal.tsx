import React from 'react';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
  currentAvatar?: string;
}

const AVATAR_OPTIONS = [
  { icon: '⚔️', name: 'Warrior' },
  { icon: '🧙‍♂️', name: 'Mage' },
  { icon: '🧝‍♀️', name: 'Elf' },
  { icon: '🥷', name: 'Ninja' },
  { icon: '🛡️', name: 'Paladin' },
  { icon: '🐉', name: 'Dragon' },
  { icon: '🏹', name: 'Archer' },
  { icon: '👑', name: 'Monarch' },
];

export default function AvatarModal({
  isOpen,
  onClose,
  onSelectAvatar,
  currentAvatar,
}: AvatarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-glass-card border border-cyan-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text-main">Choose Your Avatar</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-quest-cyan text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-4 gap-4 my-6">
          {AVATAR_OPTIONS.map((item) => {
            const isSelected = currentAvatar === item.icon;
            return (
              <button
                key={item.icon}
                onClick={() => {
                  onSelectAvatar(item.icon);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-quest-cyan bg-cyan-500/20 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] scale-105'
                    : 'border-glass-border bg-glass-box hover:border-cyan-700 hover:scale-100'
                }`}
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-[10px] text-text-muted">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-glass-box border border-glass-border text-text-muted hover:text-text-main"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}