'use client';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Total Users', value: '52,431', icon: Users, color: 'text-cyan-400', change: '+234 today' },
  { label: 'Active Traders', value: '8,923', icon: TrendingUp, color: 'text-emerald-400', change: '+12%' },
  { label: 'Virtual Volume', value: '$2.4B', icon: DollarSign, color: 'text-purple-400', change: '+5.2%' },
  { label: 'Security Events', value: '3', icon: Shield, color: 'text-red-400', change: 'Last 24h' },
];

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', level: 12, credits: 94320, status: 'active' },
  { name: 'Bob Smith', email: 'bob@example.com', level: 5, credits: 112000, status: 'active' },
  { name: 'Carol Davis', email: 'carol@example.com', level: 28, credits: 78500, status: 'suspended' },
  { name: 'David Kim', email: 'david@example.com', level: 9, credits: 101234, status: 'active' },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <Badge variant="destructive">Admin Access</Badge>
        </div>
        <p className="text-slate-400 text-sm">System overview and controls</p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.change}</p>
                </div>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">User Management</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.email} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email} • Level {u.level}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">${u.credits.toLocaleString()}</span>
                    <Badge variant={u.status === 'active' ? 'success' : 'destructive'}>{u.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2"><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-cyan-400"/><CardTitle className="text-base">Market Controls</CardTitle></div></CardHeader>
            <CardContent className="space-y-2">
              {['Market Open', 'Halt Trading', 'Reset All Portfolios', 'Distribute Bonus Credits'].map(action => (
                <button key={action} className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">{action}</button>
              ))}
            </CardContent>
          </Card>
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2"><div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-400"/><CardTitle className="text-base text-red-400">Security Alerts</CardTitle></div></CardHeader>
            <CardContent className="space-y-2">
              {['Suspicious login from new IP', 'Rate limit exceeded (3 users)', 'API key rotation due'].map(alert => (
                <div key={alert} className="text-xs text-red-300 p-2 rounded-lg bg-red-500/10 border border-red-500/20">⚠️ {alert}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
