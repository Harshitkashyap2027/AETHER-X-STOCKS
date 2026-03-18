'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  index?: number;
}

export default function StatsCard({
  title, value, change, changePositive, icon: Icon, iconColor = 'text-cyan-400', subtitle, index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1 truncate">{value}</p>
            {change && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={cn(
                  'text-xs font-medium px-1.5 py-0.5 rounded',
                  changePositive
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-red-400 bg-red-400/10'
                )}>
                  {changePositive ? '▲' : '▼'} {change}
                </span>
                <span className="text-xs text-slate-500">today</span>
              </div>
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <div className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            'bg-white/5 border border-white/10'
          )}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
