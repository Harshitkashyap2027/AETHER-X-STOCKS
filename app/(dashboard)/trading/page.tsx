'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StockCard from '@/components/trading/StockCard';
import TradingPanel from '@/components/trading/TradingPanel';
import OrderBook from '@/components/trading/OrderBook';
import { useTradingStore } from '@/store/tradingStore';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate mock price history
function generatePriceHistory(basePrice: number) {
  return Array.from({ length: 30 }, (_, i) => {
    const variance = (Math.random() - 0.5) * basePrice * 0.03;
    return {
      day: `D${i + 1}`,
      price: +(basePrice + variance + (i * basePrice * 0.001)).toFixed(2),
    };
  });
}

export default function TradingPage() {
  const { stocks, selectedStock } = useTradingStore();
  const [search, setSearch] = useState('');

  const filteredStocks = stocks.filter(s =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const priceHistory = selectedStock ? generatePriceHistory(selectedStock.price) : [];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-white">Trading Simulator</h1>
        <p className="text-slate-400 text-sm mt-1">Buy and sell stocks with your virtual portfolio</p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Stock List */}
        <div className="lg:col-span-3 space-y-3">
          <Card>
            <CardContent className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                  placeholder="Search stocks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2">
              <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredStocks.map((stock, i) => (
                  <StockCard key={stock.symbol} stock={stock} index={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="lg:col-span-6 space-y-4">
          {selectedStock && (
            <motion.div
              key={selectedStock.symbol}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">{selectedStock.symbol}</h2>
                        <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg ${
                          selectedStock.change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{selectedStock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{formatCurrency(selectedStock.price)}</p>
                      <p className={`text-sm ${selectedStock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {selectedStock.change >= 0 ? '+' : ''}{formatCurrency(selectedStock.change)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="1M">
                    <TabsList className="mb-4">
                      {['1D', '1W', '1M', '3M', '1Y'].map(period => (
                        <TabsTrigger key={period} value={period}>{period}</TabsTrigger>
                      ))}
                    </TabsList>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceHistory} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                          <defs>
                            <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={selectedStock.change >= 0 ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={selectedStock.change >= 0 ? '#10b981' : '#ef4444'} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                          <Tooltip
                            contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            labelStyle={{ color: '#94a3b8' }}
                            itemStyle={{ color: selectedStock.change >= 0 ? '#10b981' : '#ef4444' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke={selectedStock.change >= 0 ? '#10b981' : '#ef4444'}
                            strokeWidth={2}
                            fill="url(#stockGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Tabs>

                  {/* Stock Details */}
                  <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
                    {[
                      { label: 'Volume', value: selectedStock.volume },
                      { label: 'Mkt Cap', value: selectedStock.marketCap || 'N/A' },
                      { label: '52W High', value: formatCurrency(selectedStock.price * 1.2) },
                      { label: '52W Low', value: formatCurrency(selectedStock.price * 0.7) },
                    ].map(item => (
                      <div key={item.label} className="text-center">
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Trading Panel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <TradingPanel />
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderBook />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
