// Mock data — matches existing Next.js constants

const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.',         price: 189.45, change: 2.34,   changePercent: 1.25,  volume: '52.3M', marketCap: '2.94T' },
  { symbol: 'TSLA', name: 'Tesla Inc.',          price: 248.72, change: -5.18,  changePercent: -2.04, volume: '38.7M', marketCap: '792B' },
  { symbol: 'AMZN', name: 'Amazon.com',          price: 178.32, change: 3.21,   changePercent: 1.83,  volume: '29.1M', marketCap: '1.87T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.',      price: 165.89, change: 1.67,   changePercent: 1.02,  volume: '18.4M', marketCap: '2.09T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.',     price: 415.23, change: 4.89,   changePercent: 1.19,  volume: '21.8M', marketCap: '3.08T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.',        price: 875.43, change: 15.32,  changePercent: 1.78,  volume: '44.2M', marketCap: '2.15T' },
  { symbol: 'META', name: 'Meta Platforms',      price: 512.67, change: -8.43,  changePercent: -1.62, volume: '16.9M', marketCap: '1.30T' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway',price: 387.21, change: 2.15,   changePercent: 0.56,  volume: '4.2M',  marketCap: '868B' },
  { symbol: 'JPM', name: 'JPMorgan Chase',       price: 198.45, change: 1.23,   changePercent: 0.62,  volume: '8.1M',  marketCap: '571B' },
  { symbol: 'V',   name: 'Visa Inc.',            price: 278.93, change: -0.87,  changePercent: -0.31, volume: '5.6M',  marketCap: '571B' },
];

const MOCK_PORTFOLIO = [
  { symbol: 'AAPL', shares: 15, avgCost: 175.20, currentPrice: 189.45 },
  { symbol: 'NVDA', shares: 8,  avgCost: 820.00, currentPrice: 875.43 },
  { symbol: 'MSFT', shares: 12, avgCost: 395.50, currentPrice: 415.23 },
  { symbol: 'AMZN', shares: 20, avgCost: 165.30, currentPrice: 178.32 },
  { symbol: 'TSLA', shares: 10, avgCost: 260.00, currentPrice: 248.72 },
];

const MOCK_TRADES = [
  { id: '1', symbol: 'NVDA', type: 'BUY',  orderType: 'MARKET', shares: 5,  price: 875.43, total: 4377.15, timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'FILLED' },
  { id: '2', symbol: 'AAPL', type: 'SELL', orderType: 'MARKET', shares: 10, price: 189.45, total: 1894.50, timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'FILLED' },
  { id: '3', symbol: 'MSFT', type: 'BUY',  orderType: 'LIMIT',  shares: 3,  price: 412.00, total: 1236.00, timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'FILLED' },
  { id: '4', symbol: 'TSLA', type: 'BUY',  orderType: 'MARKET', shares: 8,  price: 252.30, total: 2018.40, timestamp: new Date(Date.now() - 172800000).toISOString(), status: 'FILLED' },
  { id: '5', symbol: 'AMZN', type: 'SELL', orderType: 'LIMIT',  shares: 5,  price: 180.00, total: 900.00,  timestamp: new Date(Date.now() - 259200000).toISOString(), status: 'CANCELLED' },
];

const COURSES = [
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

const LEADERBOARD_USERS = [
  { rank: 1,  name: 'CryptoKing99',  avatar: '👑', pnl: 48750, pnlPercent: 48.75, xp: 125000, level: 42 },
  { rank: 2,  name: 'StockWizard',   avatar: '🧙', pnl: 35200, pnlPercent: 35.20, xp: 98000,  level: 38 },
  { rank: 3,  name: 'BullRunner',    avatar: '🐂', pnl: 28900, pnlPercent: 28.90, xp: 87500,  level: 35 },
  { rank: 4,  name: 'AlphaTrader',   avatar: '⚡', pnl: 22100, pnlPercent: 22.10, xp: 75000,  level: 31 },
  { rank: 5,  name: 'QuantQueen',    avatar: '👸', pnl: 18750, pnlPercent: 18.75, xp: 68000,  level: 29 },
  { rank: 6,  name: 'MarketMaven',   avatar: '🦅', pnl: 15300, pnlPercent: 15.30, xp: 61000,  level: 27 },
  { rank: 7,  name: 'TechBull2024',  avatar: '🚀', pnl: 12800, pnlPercent: 12.80, xp: 55000,  level: 25 },
  { rank: 8,  name: 'ValueHunter',   avatar: '🎯', pnl: 9500,  pnlPercent: 9.50,  xp: 48000,  level: 22 },
  { rank: 9,  name: 'DayTraderPro',  avatar: '⚔️', pnl: 7200,  pnlPercent: 7.20,  xp: 42000,  level: 20 },
  { rank: 10, name: 'GrowthSeeker',  avatar: '🌱', pnl: 5100,  pnlPercent: 5.10,  xp: 38000,  level: 18 },
];

const SOCIAL_USERS = [
  { id: '1', name: 'Sarah Chen',     username: '@sarahchen',        avatar: '👩‍💼', followers: 2847, following: 342, pnl: 48.75, trades: 234, bio: 'Tech stocks enthusiast. FAANG focus.', isFollowing: true },
  { id: '2', name: 'Marcus Johnson', username: '@mjohnson_trades',  avatar: '👨‍💻', followers: 1923, following: 187, pnl: 32.10, trades: 189, bio: 'Value investor. Long-term mindset.', isFollowing: false },
  { id: '3', name: 'Aisha Williams', username: '@aishainvests',     avatar: '👩‍🎓', followers: 3421, following: 521, pnl: 41.20, trades: 312, bio: 'Options trader. Risk management first.', isFollowing: true },
  { id: '4', name: 'James Liu',      username: '@quantjames',       avatar: '👨‍🔬', followers: 892,  following: 234, pnl: 28.50, trades: 156, bio: 'Quant strategies. Data-driven.', isFollowing: false },
];

const ACTIVITY_FEED = [
  { id: '1', user: 'CryptoKing99', avatar: '👑', action: 'bought', symbol: 'NVDA', shares: 50, price: 875.43, time: '2m ago',  pnl: null },
  { id: '2', user: 'Sarah Chen',   avatar: '👩‍💼', action: 'sold',   symbol: 'AAPL', shares: 100, price: 189.45, time: '5m ago', pnl: 2340 },
  { id: '3', user: 'StockWizard',  avatar: '🧙', action: 'bought', symbol: 'MSFT', shares: 25, price: 415.23, time: '12m ago', pnl: null },
  { id: '4', user: 'QuantQueen',   avatar: '👸', action: 'bought', symbol: 'GOOGL', shares: 30, price: 165.89, time: '18m ago', pnl: null },
  { id: '5', user: 'BullRunner',   avatar: '🐂', action: 'sold',   symbol: 'TSLA', shares: 20, price: 248.72, time: '25m ago', pnl: -516 },
];

const PORTFOLIO_CHART_DATA = [
  { month: 'Mar', value: 100000 },
  { month: 'Apr', value: 102400 },
  { month: 'May', value: 98700 },
  { month: 'Jun', value: 107300 },
  { month: 'Jul', value: 112800 },
  { month: 'Aug', value: 109200 },
  { month: 'Sep', value: 116400 },
  { month: 'Oct', value: 121900 },
  { month: 'Nov', value: 118300 },
  { month: 'Dec', value: 127600 },
  { month: 'Jan', value: 133200 },
  { month: 'Feb', value: 142350 },
];

const AI_RESPONSES = {
  'pe ratio': `The **P/E ratio (Price-to-Earnings ratio)** is one of the most important valuation metrics in investing.

**What it measures:** How much investors pay for each dollar of a company's earnings.

**Formula:** P/E = Stock Price ÷ Earnings Per Share (EPS)

**How to interpret it:**
• **Low P/E (< 15):** Could be undervalued, or the market expects slow growth
• **Average P/E (15–25):** Fairly valued for most mature companies
• **High P/E (> 25):** Investors expect high future growth (common in tech stocks)

**Example:** If AAPL trades at $189 with EPS of $6.57, P/E = 28.8 — meaning investors pay $28.80 for every $1 of Apple's earnings.

**Pro tip:** Always compare P/E ratios within the same industry. A P/E of 30 might be low for a software company but high for a utility company! 📊`,

  'dca': `**Dollar-Cost Averaging (DCA)** is one of the most powerful and beginner-friendly investment strategies.

**How it works:** Instead of investing a lump sum all at once, you invest a fixed amount at regular intervals (weekly, monthly, etc.) regardless of the price.

**Example:**
• Jan: Buy 2 AAPL shares at $150 → spend $300
• Feb: Buy 2 AAPL shares at $180 → spend $360
• Mar: Buy 2 AAPL shares at $120 → spend $240
• Average cost: $150/share (better than $180 peak!)

**Why DCA works:**
✅ Removes emotional decision-making
✅ Reduces impact of market volatility
✅ No need to "time the market"
✅ Automatically buys more shares when prices are low
✅ Perfect for beginners and long-term investors

**Best for:** Index funds, blue-chip stocks, crypto markets`,

  'chart': `**Reading stock charts** is a fundamental skill for every trader. Here's your quick guide:

**1. Candlestick Charts 🕯️**
• Green/White candle = price went UP
• Red/Black candle = price went DOWN
• The "body" shows open-to-close range
• The "wicks" show the high and low

**2. Key Technical Indicators 📈**
• **Moving Averages (MA):** 50-day & 200-day lines show trend direction
• **RSI (0-100):** Above 70 = overbought, Below 30 = oversold
• **MACD:** When the signal line crosses, it signals potential trend changes
• **Volume:** High volume on breakouts = stronger signals

**3. Support & Resistance Levels**
• **Support:** Price floor where buyers step in
• **Resistance:** Price ceiling where sellers take profits
• When price breaks through resistance, it often becomes new support

**4. Chart Patterns to Know**
• Head & Shoulders (reversal signal)
• Cup & Handle (bullish continuation)
• Double Top/Bottom (reversal signals)`,

  'beginner': `**Top 5 Strategies for Beginner Investors 🚀**

**1. Start with Index Funds**
Buy S&P 500 ETFs (SPY, VOO, IVV) for instant diversification across 500 top US companies. Warren Buffett recommends this for most investors!

**2. Dollar-Cost Averaging (DCA)**
Invest a fixed amount every month regardless of price. This removes emotion and reduces risk.

**3. Focus on Quality Companies**
Look for:
• Strong revenue growth (10%+ per year)
• Profitable with positive cash flow
• Low or manageable debt
• Durable competitive advantage ("moat")

**4. Diversify Your Portfolio**
Spread across sectors: Tech, Healthcare, Finance, Consumer goods. Don't put all eggs in one basket!

**5. Think Long-Term**
The stock market historically returns ~10% annually. Time in the market beats timing the market. Don't panic sell during dips!

**Avoid these beginner mistakes:**
❌ Trading on hype or social media tips
❌ Investing money you can't afford to lose
❌ Checking your portfolio every hour
❌ Trying to time the market`,

  'options': `**Options Trading Explained 🎯**

Options are contracts that give you the RIGHT (but not obligation) to buy or sell a stock at a specific price before a certain date.

**Two types of options:**

**CALL Options (Bullish 📈)**
• Right to BUY 100 shares at the strike price
• Profitable when stock price goes UP above strike + premium
• Example: Buy AAPL $200 Call for $5 premium
  - If AAPL hits $215, your profit = ($215-$200-$5) × 100 = $1,000!

**PUT Options (Bearish 📉)**
• Right to SELL 100 shares at the strike price
• Profitable when stock price goes DOWN below strike - premium
• Used as insurance/"hedge" against losses

**Key Terms:**
• **Strike Price:** The agreed price to buy/sell
• **Expiration Date:** When the contract expires
• **Premium:** The cost of the option contract
• **In-the-Money (ITM):** Option has intrinsic value
• **Out-of-the-Money (OTM):** Option has no intrinsic value yet

⚠️ **Warning:** Options can expire worthless! Start with covered calls or protective puts before complex strategies.`,
};
