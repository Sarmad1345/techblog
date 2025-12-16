import { memo, useEffect, useState } from 'react';
import { create } from 'zustand';

// Toast Store
export const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    set({ toasts: [...get().toasts, toast] });
    
    // Auto remove after duration
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
    
    return id;
  },
  
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) });
  },
  
  clearAll: () => {
    set({ toasts: [] });
  }
}));

// Toast Item Component
const ToastItem = memo(({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const icons = {
    success: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  const styles = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    error: 'bg-gradient-to-r from-red-500 to-rose-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md
        transform transition-all duration-300 ease-out
        ${styles[toast.type]}
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
    >
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <p className="flex-1 font-medium text-sm">{toast.message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
});

ToastItem.displayName = 'ToastItem';

// Toast Container Component
const ToastContainer = memo(() => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;

