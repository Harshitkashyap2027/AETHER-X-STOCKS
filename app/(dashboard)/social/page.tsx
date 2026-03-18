'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SOCIAL_USERS, ACTIVITY_FEED } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function SocialPage() {
  const [users, setUsers] = useState(SOCIAL_USERS);
  const toggle = (id: string) => setUsers(u => u.map(x => x.id === id ? { ...x, isFollowing: !x.isFollowing } : x));
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Social Trading</h1>
        <p className="text-slate-400 text-sm mt-1">Follow top traders and copy their strategies</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Top Traders</h2>
          {users.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-4 hover:border-white/20 transition-all">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{u.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.username}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={u.isFollowing ? 'outline' : 'default'} onClick={() => toggle(u.id)} className="h-8 text-xs">
                          {u.isFollowing ? <><UserCheck className="h-3 w-3 mr-1"/>Following</> : <><UserPlus className="h-3 w-3 mr-1"/>Follow</>}
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 text-xs">Copy</Button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{u.bio}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-slate-400">{u.followers.toLocaleString()} followers</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="h-3 w-3"/>+{u.pnl}% return</span>
                      <span className="text-slate-400">{u.trades} trades</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Activity Feed</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {ACTIVITY_FEED.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">{item.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white">
                        <span className="font-semibold">{item.user}</span>{' '}
                        <span className={item.action === 'bought' ? 'text-emerald-400' : 'text-red-400'}>{item.action}</span>{' '}
                        <span className="font-semibold">{item.shares} {item.symbol}</span>{' '}
                        @ {formatCurrency(item.price)}
                      </p>
                      {item.pnl && <p className={`text-xs mt-0.5 ${item.pnl > 0 ? 'text-emerald-400' : 'text-red-400'}`}>P&L: {formatCurrency(item.pnl)}</p>}
                      <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
