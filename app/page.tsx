'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Bot, Trophy, BookOpen, Users, Zap, Shield, BarChart3, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50K+', label: 'Active Traders' },
  { value: '$2.4B', label: 'Paper Traded' },
  { value: '200+', label: 'Learning Modules' },
  { value: '99.9%', label: 'Uptime' },
];

const features = [
  {
    icon: Bot,
    title: 'AI Trading Assistant',
    description: 'Get real-time AI-powered insights, stock analysis, and personalized trading recommendations.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Paper Trading Simulator',
    description: 'Trade with $100,000 in virtual credits. Experience real market conditions without risk.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning Paths',
    description: 'From beginner to advanced — earn XP and level up as you master trading concepts.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Trophy,
    title: 'Competitive Leaderboards',
    description: 'Compete with thousands of traders. Climb daily, weekly, and all-time rankings.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Users,
    title: 'Social Trading Network',
    description: 'Follow top traders, copy their strategies, and build your trading community.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Risk-Free Environment',
    description: 'Learn the hard lessons with virtual money before committing real capital.',
    color: 'from-indigo-500 to-blue-600',
  },
];

const steps = [
  { step: '01', title: 'Create Account', description: 'Sign up for free and receive $100,000 in paper trading credits instantly.' },
  { step: '02', title: 'Learn & Practice', description: 'Complete structured courses and apply knowledge in real market simulations.' },
  { step: '03', title: 'Trade & Compete', description: 'Execute trades, build your portfolio, and climb the leaderboards.' },
  { step: '04', title: 'Level Up', description: 'Earn XP, unlock achievements, and become a certified paper trading champion.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">AETHER X STOCKS</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
          <a href="#stats" className="text-sm text-slate-400 hover:text-white transition-colors">Stats</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started Free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400"
        >
          <Zap className="h-3.5 w-3.5" />
          AI-Powered Stock Market Simulator
          <Star className="h-3 w-3 fill-cyan-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Master the Stock Market
          <br />
          <span className="gradient-text">Without the Risk</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-400 max-w-2xl mb-10"
        >
          Trade real stocks with virtual money. Learn from AI, compete with traders worldwide, 
          and build the skills to invest with confidence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link href="/register">
            <Button size="xl" className="gap-2 shadow-2xl shadow-cyan-500/30 animate-pulse-glow">
              Start Trading Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="xl" className="gap-2">
              <BarChart3 className="h-5 w-5" />
              View Demo
            </Button>
          </Link>
        </motion.div>

        {/* Mock ticker */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm py-3 mb-16">
          <div className="flex animate-ticker gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 shrink-0">
                {[
                  { symbol: 'AAPL', price: '$189.45', change: '+1.25%', pos: true },
                  { symbol: 'TSLA', price: '$248.72', change: '-2.04%', pos: false },
                  { symbol: 'NVDA', price: '$875.43', change: '+1.78%', pos: true },
                  { symbol: 'MSFT', price: '$415.23', change: '+1.19%', pos: true },
                  { symbol: 'AMZN', price: '$178.32', change: '+1.83%', pos: true },
                  { symbol: 'META', price: '$512.67', change: '-1.62%', pos: false },
                  { symbol: 'GOOGL', price: '$165.89', change: '+1.02%', pos: true },
                ].map((stock) => (
                  <div key={stock.symbol} className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-white">{stock.symbol}</span>
                    <span className="text-slate-300">{stock.price}</span>
                    <span className={stock.pos ? 'text-emerald-400' : 'text-red-400'}>{stock.change}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to
            <span className="gradient-text"> Become a Pro Trader</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A complete ecosystem for learning, practicing, and mastering stock market trading.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all group"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400">Get started in minutes and begin your trading journey today.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 z-10">
                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </div>
              )}
              <div className="text-5xl font-black gradient-text mb-3">{step.step}</div>
              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 backdrop-blur-xl p-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your
            <br />
            <span className="gradient-text">Trading Journey?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join 50,000+ traders learning, competing, and growing on AETHER X STOCKS. 
            Free forever. No credit card required.
          </p>
          <Link href="/register">
            <Button size="xl" className="gap-2 shadow-2xl shadow-cyan-500/30">
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-xs text-slate-600 mt-4">$100,000 in virtual credits • AI assistant included • No real money risk</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <TrendingUp className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold gradient-text">AETHER X STOCKS</span>
        </div>
        <p className="text-xs text-slate-600">© 2024 AETHER X STOCKS. For educational purposes only. Not financial advice.</p>
      </footer>
    </div>
  );
}
