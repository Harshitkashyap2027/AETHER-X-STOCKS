'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, TrendingDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTradingStore } from '@/store/tradingStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrency } from '@/lib/utils';

export default function TradingPanel() {
  const { selectedStock, credits, executeTrade } = useTradingStore();
  const { addNotification } = useUIStore();
  const [shares, setShares] = useState('1');
  const [limitPrice, setLimitPrice] = useState('');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP_LOSS'>('MARKET');

  if (!selectedStock) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-500">
        <p>Select a stock to trade</p>
      </div>
    );
  }

  const sharesNum = parseInt(shares) || 0;
  const price = orderType === 'MARKET' ? selectedStock.price : parseFloat(limitPrice) || 0;
  const total = sharesNum * price;
  const canAfford = total <= credits;
  const portfolio = useTradingStore.getState().portfolio;
  const position = portfolio.find(p => p.symbol === selectedStock.symbol);

  const handleTrade = (type: 'BUY' | 'SELL') => {
    if (sharesNum <= 0) {
      addNotification({ type: 'error', title: 'Invalid Order', message: 'Please enter a valid number of shares.' });
      return;
    }
    if (type === 'BUY' && !canAfford) {
      addNotification({ type: 'error', title: 'Insufficient Funds', message: 'You do not have enough credits.' });
      return;
    }
    if (type === 'SELL' && (!position || sharesNum > position.shares)) {
      addNotification({ type: 'error', title: 'Insufficient Shares', message: 'You do not have enough shares to sell.' });
      return;
    }

    executeTrade({
      symbol: selectedStock.symbol,
      type,
      orderType,
      shares: sharesNum,
      price: orderType === 'MARKET' ? selectedStock.price : parseFloat(limitPrice),
      total,
    });

    addNotification({
      type: 'success',
      title: `Order ${type === 'BUY' ? 'Placed' : 'Sold'}!`,
      message: `${type} ${sharesNum} shares of ${selectedStock.symbol} at ${formatCurrency(price)}`,
    });
    setShares('1');
  };

  return (
    <div className="space-y-4">
      {/* Stock info */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
        <div>
          <p className="font-bold text-white">{selectedStock.symbol}</p>
          <p className="text-xs text-slate-400">{selectedStock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">{formatCurrency(selectedStock.price)}</p>
          <p className={`text-xs font-medium ${selectedStock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Order type */}
      <div>
        <label className="text-xs text-slate-400 mb-2 block">Order Type</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                orderType === type
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Shares input */}
      <div>
        <label className="text-xs text-slate-400 mb-2 block">Shares</label>
        <Input
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          min="1"
          placeholder="Number of shares"
        />
      </div>

      {/* Limit price (if needed) */}
      {orderType !== 'MARKET' && (
        <div>
          <label className="text-xs text-slate-400 mb-2 block">
            {orderType === 'LIMIT' ? 'Limit Price' : 'Stop Price'}
          </label>
          <Input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            placeholder={formatCurrency(selectedStock.price)}
          />
        </div>
      )}

      {/* Order summary */}
      <div className="p-3 rounded-xl bg-white/3 border border-white/10 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Estimated Total</span>
          <span className="text-white font-medium">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Available Credits</span>
          <span className={canAfford ? 'text-emerald-400' : 'text-red-400'}>{formatCurrency(credits)}</span>
        </div>
        {position && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Current Position</span>
            <span className="text-cyan-400">{position.shares} shares</span>
          </div>
        )}
      </div>

      {/* Buy/Sell buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => handleTrade('BUY')}
          disabled={!canAfford || sharesNum <= 0}
          className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 from-transparent to-transparent"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Buy
        </Button>
        <Button
          onClick={() => handleTrade('SELL')}
          disabled={!position || sharesNum <= 0}
          className="bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/25 from-transparent to-transparent"
        >
          <TrendingDown className="h-4 w-4 mr-1" />
          Sell
        </Button>
      </div>

      <p className="text-xs text-slate-600 text-center flex items-center justify-center gap-1">
        <Info className="h-3 w-3" />
        Simulated trading. Not real money.
      </p>
    </div>
  );
}
