'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Bell, User, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/utils';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AETHER X
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 w-64">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Credits display */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">
                {formatCurrency(user.credits)}
              </span>
            </div>
          )}

          {/* XP badge */}
          {user && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <span className="text-xs text-purple-400">LVL {user.level}</span>
              <span className="text-sm font-medium text-purple-300">{user.xp.toLocaleString()} XP</span>
            </div>
          )}

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500" />
          </button>

          {/* Profile */}
          <Link href="/profile">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 text-white hover:border-cyan-500/50 transition-colors">
              <User className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
