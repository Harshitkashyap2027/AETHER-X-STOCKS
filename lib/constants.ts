import type { Course } from '@/types';

export const APP_NAME = 'AETHER X STOCKS';
export const APP_DESCRIPTION = 'AI-powered stock market learning and simulation ecosystem';

export const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, changePercent: 1.25, volume: '52.3M', marketCap: '2.94T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.72, change: -5.18, changePercent: -2.04, volume: '38.7M', marketCap: '792B' },
  { symbol: 'AMZN', name: 'Amazon.com', price: 178.32, change: 3.21, changePercent: 1.83, volume: '29.1M', marketCap: '1.87T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.89, change: 1.67, changePercent: 1.02, volume: '18.4M', marketCap: '2.09T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.23, change: 4.89, changePercent: 1.19, volume: '21.8M', marketCap: '3.08T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.43, change: 15.32, changePercent: 1.78, volume: '44.2M', marketCap: '2.15T' },
  { symbol: 'META', name: 'Meta Platforms', price: 512.67, change: -8.43, changePercent: -1.62, volume: '16.9M', marketCap: '1.30T' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 387.21, change: 2.15, changePercent: 0.56, volume: '4.2M', marketCap: '868B' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.45, change: 1.23, changePercent: 0.62, volume: '8.1M', marketCap: '571B' },
  { symbol: 'V', name: 'Visa Inc.', price: 278.93, change: -0.87, changePercent: -0.31, volume: '5.6M', marketCap: '571B' },
];

export const MOCK_PORTFOLIO = [
  { symbol: 'AAPL', shares: 15, avgCost: 175.20, currentPrice: 189.45 },
  { symbol: 'NVDA', shares: 8, avgCost: 820.00, currentPrice: 875.43 },
  { symbol: 'MSFT', shares: 12, avgCost: 395.50, currentPrice: 415.23 },
  { symbol: 'AMZN', shares: 20, avgCost: 165.30, currentPrice: 178.32 },
  { symbol: 'TSLA', shares: 10, avgCost: 260.00, currentPrice: 248.72 },
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Stock Market Fundamentals',
    description: 'Learn the basics of how the stock market works, key terminology, and how to read financial statements.',
    level: 'Beginner',
    xpReward: 500,
    duration: '2h 30m',
    lessons: 12,
    progress: 75,
    category: 'Fundamentals',
    image: '📚',
  },
  {
    id: '2',
    title: 'Technical Analysis Mastery',
    description: 'Master chart patterns, indicators, and technical analysis tools used by professional traders.',
    level: 'Intermediate',
    xpReward: 1000,
    duration: '4h 15m',
    lessons: 20,
    progress: 30,
    category: 'Technical Analysis',
    image: '📊',
  },
  {
    id: '3',
    title: 'Options Trading Strategies',
    description: 'Understand options contracts, strategies like covered calls, puts, spreads and more.',
    level: 'Advanced',
    xpReward: 1500,
    duration: '5h 45m',
    lessons: 25,
    progress: 0,
    category: 'Options',
    image: '🎯',
  },
  {
    id: '4',
    title: 'Risk Management & Portfolio Theory',
    description: 'Learn Modern Portfolio Theory, diversification, and professional risk management techniques.',
    level: 'Intermediate',
    xpReward: 800,
    duration: '3h 20m',
    lessons: 16,
    progress: 60,
    category: 'Risk Management',
    image: '🛡️',
  },
  {
    id: '5',
    title: 'Value Investing Principles',
    description: 'Discover the timeless strategies of Warren Buffett and Benjamin Graham for long-term wealth.',
    level: 'Beginner',
    xpReward: 600,
    duration: '3h 00m',
    lessons: 14,
    progress: 100,
    category: 'Fundamentals',
    image: '💎',
  },
  {
    id: '6',
    title: 'Algorithmic Trading & Quant Finance',
    description: 'Build automated trading systems using Python, backtesting, and quantitative strategies.',
    level: 'Advanced',
    xpReward: 2000,
    duration: '8h 00m',
    lessons: 32,
    progress: 10,
    category: 'Algorithmic',
    image: '🤖',
  },
];

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/trading', label: 'Trading', icon: 'TrendingUp' },
  { href: '/portfolio', label: 'Portfolio', icon: 'PieChart' },
  { href: '/learn', label: 'Learn', icon: 'BookOpen' },
  { href: '/social', label: 'Social', icon: 'Users' },
  { href: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
  { href: '/ai-assistant', label: 'AI Assistant', icon: 'Bot' },
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'CryptoKing99', avatar: '👑', pnl: 48750, pnlPercent: 48.75, xp: 125000, level: 42 },
  { rank: 2, name: 'StockWizard', avatar: '🧙', pnl: 35200, pnlPercent: 35.20, xp: 98000, level: 38 },
  { rank: 3, name: 'BullRunner', avatar: '🐂', pnl: 28900, pnlPercent: 28.90, xp: 87500, level: 35 },
  { rank: 4, name: 'AlphaTrader', avatar: '⚡', pnl: 22100, pnlPercent: 22.10, xp: 75000, level: 31 },
  { rank: 5, name: 'QuantQueen', avatar: '👸', pnl: 18750, pnlPercent: 18.75, xp: 68000, level: 29 },
  { rank: 6, name: 'MarketMaven', avatar: '🦅', pnl: 15300, pnlPercent: 15.30, xp: 61000, level: 27 },
  { rank: 7, name: 'TechBull2024', avatar: '🚀', pnl: 12800, pnlPercent: 12.80, xp: 55000, level: 25 },
  { rank: 8, name: 'ValueHunter', avatar: '🎯', pnl: 9500, pnlPercent: 9.50, xp: 48000, level: 22 },
  { rank: 9, name: 'DayTraderPro', avatar: '⚔️', pnl: 7200, pnlPercent: 7.20, xp: 42000, level: 20 },
  { rank: 10, name: 'GrowthSeeker', avatar: '🌱', pnl: 5100, pnlPercent: 5.10, xp: 38000, level: 18 },
];

export const SOCIAL_USERS = [
  { id: '1', name: 'Sarah Chen', username: '@sarahchen', avatar: '👩‍💼', followers: 2847, following: 342, pnl: 48.75, trades: 234, bio: 'Tech stocks enthusiast. FAANG focus.', isFollowing: true },
  { id: '2', name: 'Marcus Johnson', username: '@mjohnson_trades', avatar: '👨‍💻', followers: 1923, following: 187, pnl: 32.10, trades: 189, bio: 'Value investor. Long-term mindset.', isFollowing: false },
  { id: '3', name: 'Aisha Williams', username: '@aishainvests', avatar: '👩‍🎓', followers: 3421, following: 521, pnl: 41.20, trades: 312, bio: 'Options trader. Risk management first.', isFollowing: true },
  { id: '4', name: 'James Liu', username: '@quantjames', avatar: '👨‍🔬', followers: 892, following: 234, pnl: 28.50, trades: 156, bio: 'Quant strategies. Data-driven.', isFollowing: false },
];

export const ACTIVITY_FEED = [
  { id: '1', user: 'CryptoKing99', avatar: '👑', action: 'bought', symbol: 'NVDA', shares: 50, price: 875.43, time: '2m ago', pnl: null },
  { id: '2', user: 'Sarah Chen', avatar: '👩‍💼', action: 'sold', symbol: 'AAPL', shares: 100, price: 189.45, time: '5m ago', pnl: 2340 },
  { id: '3', user: 'StockWizard', avatar: '🧙', action: 'bought', symbol: 'MSFT', shares: 25, price: 415.23, time: '12m ago', pnl: null },
  { id: '4', user: 'QuantQueen', avatar: '👸', action: 'bought', symbol: 'GOOGL', shares: 30, price: 165.89, time: '18m ago', pnl: null },
  { id: '5', user: 'BullRunner', avatar: '🐂', action: 'sold', symbol: 'TSLA', shares: 20, price: 248.72, time: '25m ago', pnl: -516 },
];
