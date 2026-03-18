'use client';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LEADERBOARD_USERS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-slate-400 text-sm mt-1">Top traders ranked by portfolio performance</p>
      </motion.div>
      <div className="grid grid-cols-3 gap-4">
        {LEADERBOARD_USERS.slice(0,3).map((u, i) => (
          <motion.div key={u.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={`text-center p-5 ${i === 0 ? 'border-yellow-500/30 bg-yellow-500/5' : i === 1 ? 'border-slate-400/30' : 'border-orange-500/30'}`}>
              <div className="text-4xl mb-2">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <div className="text-2xl mb-1">{u.avatar}</div>
              <p className="text-sm font-bold text-white truncate">{u.name}</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">+{u.pnlPercent}%</p>
              <p className="text-xs text-slate-400">{formatCurrency(u.pnl)} P&L</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Rankings</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4"><TabsTrigger value="daily">Daily</TabsTrigger><TabsTrigger value="weekly">Weekly</TabsTrigger><TabsTrigger value="alltime">All-Time</TabsTrigger></TabsList>
            <TabsContent value="weekly">
              <div className="space-y-2">
                {LEADERBOARD_USERS.map((u, i) => (
                  <motion.div key={u.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                    <span className={`w-6 text-center text-sm font-bold ${i < 3 ? 'text-yellow-400' : 'text-slate-500'}`}>#{u.rank}</span>
                    <div className="text-xl">{u.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{u.name}</p>
                      <p className="text-xs text-slate-500">Level {u.level} • {u.xp.toLocaleString()} XP</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-400">+{u.pnlPercent}%</p>
                      <p className="text-xs text-slate-400">{formatCurrency(u.pnl)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="daily"><p className="text-slate-400 text-sm text-center py-8">Daily rankings reset at midnight UTC</p></TabsContent>
            <TabsContent value="alltime"><p className="text-slate-400 text-sm text-center py-8">All-time rankings coming soon</p></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
