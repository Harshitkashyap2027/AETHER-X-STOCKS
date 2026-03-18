'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  onClose: (id: string) => void;
}

export function Toast({ id, type, title, message, onClose }: ToastProps) {
  const colors = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    info: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  };

  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={cn(
      'flex items-start gap-3 rounded-xl border p-4 backdrop-blur-md shadow-xl',
      colors[type]
    )}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-80 mt-0.5">{message}</p>
      </div>
      <button onClick={() => onClose(id)} className="shrink-0 opacity-60 hover:opacity-100 text-current">
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({ notifications, onClose }: {
  notifications: Array<{ id: string; type: 'success' | 'error' | 'info' | 'warning'; title: string; message: string }>;
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {notifications.map(n => (
        <Toast key={n.id} {...n} onClose={onClose} />
      ))}
    </div>
  );
}
