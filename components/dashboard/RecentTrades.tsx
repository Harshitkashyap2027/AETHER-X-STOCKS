'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTradingStore } from '@/store/tradingStore';
import { formatCurrency } from '@/lib/utils';

export default function RecentTrades() {
  const { trades } = useTradingStore();

  return (
    <div className="space-y-2">
      {trades.slice(0, 5).map((trade, index) => (
        <motion.div
          key={trade.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
          className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              trade.type === 'BUY' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'
            }`}>
              {trade.type === 'BUY'
                ? <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                : <ArrowDownRight className="h-4 w-4 text-red-400" />
              }
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{trade.symbol}</span>
                <Badge variant={trade.type === 'BUY' ? 'success' : 'destructive'} className="text-xs px-1.5 py-0">
                  {trade.type}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">{trade.shares} shares @ {formatCurrency(trade.price)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{formatCurrency(trade.total)}</p>
            <p className="text-xs text-slate-500">{new Date(trade.timestamp).toLocaleDateString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
