import React from 'react'



interface  ConfirmDeleteProps{
  isOpen: boolean;
  title: string; 
  onConfirm: () => void;
  onCancel: () => void
}




export default function DeleteConfirmationModal({isOpen, title, onConfirm, onCancel} : ConfirmDeleteProps){

  if(!isOpen) return null; 

  return (
<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono text-xs">
      <div className="w-full max-w-sm bg-[#110c22] border border-glass-border rounded-2xl p-6 shadow-2xl">
        <h3 className="text-sm font-bold text-text-main mb-2">Confirm Delete</h3>
        <p className="text-text-muted mb-6">
          Are you sure you want to delete <strong className="text-white">"{title}"</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-app-bg border border-glass-border rounded-xl text-text-muted hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.4)]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}


