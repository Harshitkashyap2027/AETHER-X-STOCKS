'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { ToastContainer } from '@/components/ui/toast';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notifications, removeNotification } = useUIStore();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Mock user initialization
    setUser({
      uid: 'demo-user-001',
      email: 'demo@aetherx.com',
      displayName: 'Demo Trader',
      credits: 100000,
      proTokens: 50,
      xp: 12450,
      level: 18,
      role: 'user',
    });
    setLoading(false);
  }, [setUser, setLoading]);

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <ToastContainer notifications={notifications} onClose={removeNotification} />
    </div>
  );
}
