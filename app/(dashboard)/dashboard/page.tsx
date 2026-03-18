'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Star, Activity, Zap, ArrowUpRight, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/StatsCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import RecentTrades from '@/components/dashboard/RecentTrades';
import { useTradingStore } from '@/store/tradingStore';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, formatPercent, getChangeColor } from '@/lib/utils';
import { MOCK_STOCKS } from '@/lib/constants';

export default function DashboardPage() {
  const { portfolio, credits } = useTradingStore();
  const { user } = useAuthStore();

  const totalValue = portfolio.reduce((sum, pos) => {
    return sum + pos.shares * pos.currentPrice;
  }, credits);

  const totalCost = portfolio.reduce((sum, pos) => {
    return sum + pos.shares * pos.avgCost;
  }, 0);

  const totalPnL = portfolio.reduce((sum, pos) => {
    return sum + pos.shares * (pos.currentPrice - pos.avgCost);
  }, 0);

  const pnlPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

  const marketMovers = MOCK_STOCKS.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="gradient-text">{user?.displayName || 'Trader'}</span> 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">Here&apos;s your portfolio overview for today</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Portfolio Value"
          value={formatCurrency(totalValue)}
          change="7.2%"
          changePositive={true}
          icon={DollarSign}
          iconColor="text-cyan-400"
          index={0}
        />
        <StatsCard
          title="P&L Today"
          value={formatCurrency(totalPnL)}
          change={`${Math.abs(pnlPercent).toFixed(2)}%`}
          changePositive={totalPnL >= 0}
          icon={totalPnL >= 0 ? TrendingUp : TrendingDown}
          iconColor={totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}
          index={1}
        />
        <StatsCard
          title="XP Points"
          value={(user?.xp || 0).toLocaleString()}
          subtitle={`Level ${user?.level || 1}`}
          icon={Star}
          iconColor="text-yellow-400"
          index={2}
        />
        <StatsCard
          title="Available Credits"
          value={formatCurrency(credits)}
          subtitle="Paper trading balance"
          icon={Zap}
          iconColor="text-purple-400"
          index={3}
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Portfolio Performance</CardTitle>
                <Badge variant="success">+7.2% YTD</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <PortfolioChart />
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <CardTitle className="text-base">AI Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: '📈', title: 'NVDA Momentum Strong', desc: 'Technical indicators suggest continued uptrend. RSI at 62, above 50-day MA.', color: 'border-emerald-500/20 bg-emerald-500/5' },
                { icon: '⚠️', title: 'TSLA Oversold Signal', desc: 'RSI dropped to 28. Potential bounce opportunity but watch support at $240.', color: 'border-yellow-500/20 bg-yellow-500/5' },
                { icon: '🎯', title: 'Portfolio Diversification', desc: 'Tech sector at 67% of holdings. Consider adding defensive stocks.', color: 'border-cyan-500/20 bg-cyan-500/5' },
              ].map((insight, i) => (
                <div key={i} className={`p-3 rounded-xl border ${insight.color}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-base">{insight.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{insight.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{insight.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Trades */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Trades</CardTitle>
                <a href="/trading" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  View all <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <RecentTrades />
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Movers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Market Movers</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketMovers.map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{stock.symbol}</p>
                        <p className="text-xs text-slate-500">{stock.volume} vol</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{formatCurrency(stock.price)}</p>
                      <p className={`text-xs font-medium ${getChangeColor(stock.changePercent)}`}>
                        {formatPercent(stock.changePercent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
