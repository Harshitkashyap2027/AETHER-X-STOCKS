export interface User {
  uid: string;
  email: string;
  displayName: string;
  credits: number;
  proTokens: number;
  xp: number;
  level: number;
  role: 'user' | 'admin';
  avatar?: string;
  bio?: string;
  joinedAt?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap?: string;
}

export interface Position {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  shares: number;
  price: number;
  total: number;
  timestamp: string;
  status: 'FILLED' | 'PENDING' | 'CANCELLED';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  duration: string;
  lessons: number;
  progress: number;
  category: string;
  image: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  pnl: number;
  pnlPercent: number;
  xp: number;
  level: number;
}

export interface SocialUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  pnl: number;
  trades: number;
  bio: string;
  isFollowing: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: 'bought' | 'sold';
  symbol: string;
  shares: number;
  price: number;
  time: string;
  pnl: number | null;
}

export interface OrderFormData {
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  shares: number;
  limitPrice?: number;
  stopPrice?: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  volume?: number;
}
