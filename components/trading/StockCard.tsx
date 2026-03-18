'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '@/types';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import { useTradingStore } from '@/store/tradingStore';

interface StockCardProps {
  stock: Stock;
  index?: number;
}

export default function StockCard({ stock, index = 0 }: StockCardProps) {
  const { selectedStock, setSelectedStock } = useTradingStore();
  const isSelected = selectedStock?.symbol === stock.symbol;
  const isPositive = stock.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setSelectedStock(stock)}
      className={cn(
        'flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all',
        'border',
        isSelected
          ? 'bg-cyan-500/10 border-cyan-500/30'
          : 'bg-white/3 border-white/5 hover:bg-white/5 hover:border-white/10'
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold',
          isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white'
        )}>
          {stock.symbol.slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{stock.symbol}</p>
          <p className="text-xs text-slate-500 truncate max-w-[120px]">{stock.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{formatCurrency(stock.price)}</p>
        <div className={cn(
          'flex items-center justify-end gap-0.5 text-xs font-medium',
          isPositive ? 'text-emerald-400' : 'text-red-400'
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {formatPercent(stock.changePercent)}
        </div>
      </div>
    </motion.div>
  );
}
