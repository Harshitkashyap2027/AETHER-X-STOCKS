'use client';

import { useTradingStore } from '@/store/tradingStore';
import { formatCurrency } from '@/lib/utils';

const generateOrderBook = (price: number) => {
  const asks = Array.from({ length: 8 }, (_, i) => ({
    price: price + (i + 1) * 0.05 + Math.random() * 0.1,
    size: Math.floor(Math.random() * 500) + 50,
    total: 0,
  }));
  const bids = Array.from({ length: 8 }, (_, i) => ({
    price: price - (i + 1) * 0.05 - Math.random() * 0.1,
    size: Math.floor(Math.random() * 500) + 50,
    total: 0,
  }));
  return { asks: asks.reverse(), bids };
};

export default function OrderBook() {
  const { selectedStock } = useTradingStore();
  
  if (!selectedStock) return null;

  const { asks, bids } = generateOrderBook(selectedStock.price);
  const maxSize = Math.max(...[...asks, ...bids].map(o => o.size));

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid grid-cols-3 text-xs text-slate-500 px-1">
        <span>Price</span>
        <span className="text-center">Size</span>
        <span className="text-right">Depth</span>
      </div>

      {/* Asks (sells) */}
      <div className="space-y-0.5">
        {asks.map((order, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs px-1 py-0.5 rounded">
            <div
              className="absolute inset-0 bg-red-500/5 rounded"
              style={{ width: `${(order.size / maxSize) * 100}%`, marginLeft: 'auto', right: 0 }}
            />
            <span className="text-red-400 font-medium z-10">{formatCurrency(order.price)}</span>
            <span className="text-center text-slate-300 z-10">{order.size}</span>
            <span className="text-right text-slate-500 z-10">{(order.size * order.price / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="flex items-center justify-center py-1 border-y border-white/10">
        <span className="text-xs font-bold text-white">{formatCurrency(selectedStock.price)}</span>
        <span className="text-xs text-slate-500 ml-2">spread: ${(asks[asks.length - 1].price - bids[0].price).toFixed(3)}</span>
      </div>

      {/* Bids (buys) */}
      <div className="space-y-0.5">
        {bids.map((order, i) => (
          <div key={i} className="relative grid grid-cols-3 text-xs px-1 py-0.5 rounded">
            <div
              className="absolute inset-0 bg-emerald-500/5 rounded"
              style={{ width: `${(order.size / maxSize) * 100}%` }}
            />
            <span className="text-emerald-400 font-medium z-10">{formatCurrency(order.price)}</span>
            <span className="text-center text-slate-300 z-10">{order.size}</span>
            <span className="text-right text-slate-500 z-10">{(order.size * order.price / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}
