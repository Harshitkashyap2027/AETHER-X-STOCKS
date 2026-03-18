'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PieChart, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTradingStore } from '@/store/tradingStore';
import { formatCurrency, formatPercent, getChangeColor } from '@/lib/utils';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const pnlHistory = [
  { day: 'Mon', pnl: 1200 },
  { day: 'Tue', pnl: -340 },
  { day: 'Wed', pnl: 890 },
  { day: 'Thu', pnl: 2100 },
  { day: 'Fri', pnl: 1560 },
  { day: 'Sat', pnl: 430 },
  { day: 'Today', pnl: 780 },
];

export default function PortfolioPage() {
  const { portfolio, trades, credits } = useTradingStore();

  const positions = portfolio.map(pos => {
    const pnl = pos.shares * (pos.currentPrice - pos.avgCost);
    const pnlPercent = ((pos.currentPrice - pos.avgCost) / pos.avgCost) * 100;
    const value = pos.shares * pos.currentPrice;
    return { ...pos, pnl, pnlPercent, value };
  });

  const totalValue = positions.reduce((s, p) => s + p.value, 0) + credits;
  const totalPnL = positions.reduce((s, p) => s + p.pnl, 0);

  const pieData = positions.map(p => ({
    name: p.symbol,
    value: p.value,
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-slate-400 text-sm mt-1">Track your holdings and performance</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Value', value: formatCurrency(totalValue), color: 'text-cyan-400' },
          { label: 'Total P&L', value: formatCurrency(totalPnL), color: totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400' },
          { label: 'Holdings', value: `${positions.length} stocks`, color: 'text-purple-400' },
          { label: 'Cash', value: formatCurrency(credits), color: 'text-yellow-400' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-4">
              <p className="text-xs text-slate-400">{item.label}</p>
              <p className={`text-xl font-bold mt-1 ${item.color}`}>{item.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-white/10">
                      <th className="text-left pb-3">Symbol</th>
                      <th className="text-right pb-3">Shares</th>
                      <th className="text-right pb-3">Avg Cost</th>
                      <th className="text-right pb-3">Current</th>
                      <th className="text-right pb-3">Value</th>
                      <th className="text-right pb-3">P&L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {positions.map((pos, i) => (
                      <motion.tr
                        key={pos.symbol}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm hover:bg-white/3 transition-colors"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                              {pos.symbol.slice(0, 2)}
                            </div>
                            <span className="font-semibold text-white">{pos.symbol}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right text-slate-300">{pos.shares}</td>
                        <td className="py-3 text-right text-slate-300">{formatCurrency(pos.avgCost)}</td>
                        <td className="py-3 text-right text-slate-300">{formatCurrency(pos.currentPrice)}</td>
                        <td className="py-3 text-right font-semibold text-white">{formatCurrency(pos.value)}</td>
                        <td className="py-3 text-right">
                          <div>
                            <p className={`font-semibold ${getChangeColor(pos.pnl)}`}>{formatCurrency(pos.pnl)}</p>
                            <p className={`text-xs ${getChangeColor(pos.pnlPercent)}`}>{formatPercent(pos.pnlPercent)}</p>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">
                      {((item.value / (totalValue - credits)) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* P&L Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly P&L</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pnlHistory} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={2} fill="url(#pnlGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trade History */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <CardTitle className="text-base">Trade History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-white/10">
                  <th className="text-left pb-3">Date</th>
                  <th className="text-left pb-3">Symbol</th>
                  <th className="text-left pb-3">Type</th>
                  <th className="text-right pb-3">Shares</th>
                  <th className="text-right pb-3">Price</th>
                  <th className="text-right pb-3">Total</th>
                  <th className="text-right pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {useTradingStore.getState().trades.map((trade, i) => (
                  <tr key={trade.id} className="text-sm hover:bg-white/3 transition-colors">
                    <td className="py-3 text-slate-400">{new Date(trade.timestamp).toLocaleDateString()}</td>
                    <td className="py-3 font-semibold text-white">{trade.symbol}</td>
                    <td className="py-3">
                      <Badge variant={trade.type === 'BUY' ? 'success' : 'destructive'}>{trade.type}</Badge>
                    </td>
                    <td className="py-3 text-right text-slate-300">{trade.shares}</td>
                    <td className="py-3 text-right text-slate-300">{formatCurrency(trade.price)}</td>
                    <td className="py-3 text-right font-semibold text-white">{formatCurrency(trade.total)}</td>
                    <td className="py-3 text-right">
                      <Badge variant="success" className="text-xs">{trade.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
