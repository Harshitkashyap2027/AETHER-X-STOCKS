'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const xpToNext = 15000;
  const xpProgress = user ? (user.xp / xpToNext) * 100 : 0;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="text-6xl mb-3">👤</div>
          <h2 className="text-xl font-bold text-white">{user?.displayName}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <Badge className="mt-3">Level {user?.level} Trader</Badge>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>XP Progress</span><span>{user?.xp?.toLocaleString()} / {xpToNext.toLocaleString()}</span>
            </div>
            <Progress value={xpProgress} />
          </div>
        </Card>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: 'Credits', value: formatCurrency(user?.credits || 0), color: 'text-cyan-400', emoji: '💰' },
            { label: 'XP Points', value: (user?.xp || 0).toLocaleString(), color: 'text-yellow-400', emoji: '⭐' },
            { label: 'Pro Tokens', value: user?.proTokens || 0, color: 'text-purple-400', emoji: '🎯' },
            { label: 'Level', value: user?.level || 1, color: 'text-emerald-400', emoji: '🏆' },
          ].map(item => (
            <Card key={item.label} className="p-5 text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-slate-400 mt-1">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Achievements</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['🥇 First Trade', '📚 Course Complete', '🏆 Top 100', '🤝 Social Trader'].map(a => (
              <div key={a} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-slate-300">{a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
