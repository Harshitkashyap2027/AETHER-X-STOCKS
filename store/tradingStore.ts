import { create } from 'zustand';
import { Stock, Position, Trade } from '@/types';
import { MOCK_STOCKS, MOCK_PORTFOLIO } from '@/lib/constants';

interface TradingState {
  stocks: Stock[];
  portfolio: Position[];
  trades: Trade[];
  selectedStock: Stock | null;
  credits: number;
  setSelectedStock: (stock: Stock | null) => void;
  executeTrade: (trade: Omit<Trade, 'id' | 'timestamp' | 'status'>) => void;
  updateStockPrice: (symbol: string, price: number) => void;
}

export const useTradingStore = create<TradingState>((set, get) => ({
  stocks: MOCK_STOCKS,
  portfolio: MOCK_PORTFOLIO,
  trades: [
    {
      id: '1',
      symbol: 'AAPL',
      type: 'BUY',
      orderType: 'MARKET',
      shares: 15,
      price: 175.20,
      total: 2628.00,
      timestamp: '2024-01-15T10:30:00Z',
      status: 'FILLED',
    },
    {
      id: '2',
      symbol: 'NVDA',
      type: 'BUY',
      orderType: 'MARKET',
      shares: 8,
      price: 820.00,
      total: 6560.00,
      timestamp: '2024-01-18T14:22:00Z',
      status: 'FILLED',
    },
    {
      id: '3',
      symbol: 'TSLA',
      type: 'SELL',
      orderType: 'LIMIT',
      shares: 5,
      price: 265.00,
      total: 1325.00,
      timestamp: '2024-01-20T09:15:00Z',
      status: 'FILLED',
    },
    {
      id: '4',
      symbol: 'MSFT',
      type: 'BUY',
      orderType: 'MARKET',
      shares: 12,
      price: 395.50,
      total: 4746.00,
      timestamp: '2024-01-22T11:45:00Z',
      status: 'FILLED',
    },
  ],
  selectedStock: MOCK_STOCKS[0],
  credits: 100000,
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  executeTrade: (trade) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'FILLED',
    };
    set((state) => {
      const cost = trade.shares * trade.price;
      let newCredits = state.credits;
      
      if (trade.type === 'BUY') {
        newCredits -= cost;
      } else {
        newCredits += cost;
      }

      const existingPosition = state.portfolio.find(p => p.symbol === trade.symbol);
      let newPortfolio = [...state.portfolio];

      if (trade.type === 'BUY') {
        if (existingPosition) {
          const totalShares = existingPosition.shares + trade.shares;
          const totalCost = existingPosition.avgCost * existingPosition.shares + cost;
          newPortfolio = newPortfolio.map(p =>
            p.symbol === trade.symbol
              ? { ...p, shares: totalShares, avgCost: totalCost / totalShares }
              : p
          );
        } else {
          const stock = state.stocks.find(s => s.symbol === trade.symbol);
          newPortfolio.push({
            symbol: trade.symbol,
            shares: trade.shares,
            avgCost: trade.price,
            currentPrice: stock?.price || trade.price,
          });
        }
      } else {
        if (existingPosition) {
          const remainingShares = existingPosition.shares - trade.shares;
          if (remainingShares <= 0) {
            newPortfolio = newPortfolio.filter(p => p.symbol !== trade.symbol);
          } else {
            newPortfolio = newPortfolio.map(p =>
              p.symbol === trade.symbol ? { ...p, shares: remainingShares } : p
            );
          }
        }
      }

      return {
        trades: [newTrade, ...state.trades],
        portfolio: newPortfolio,
        credits: newCredits,
      };
    });
  },
  updateStockPrice: (symbol, price) => {
    set((state) => ({
      stocks: state.stocks.map(s => s.symbol === symbol ? { ...s, price } : s),
      portfolio: state.portfolio.map(p => p.symbol === symbol ? { ...p, currentPrice: price } : p),
    }));
  },
}));
