// Global application state (replaces Zustand)

const State = (() => {
  let _state = {
    // Auth
    user: null,
    isAuthLoading: true,

    // Trading
    stocks: MOCK_STOCKS.map(s => ({ ...s })),
    portfolio: MOCK_PORTFOLIO.map(p => ({ ...p })),
    trades: MOCK_TRADES.map(t => ({ ...t })),
    selectedStock: MOCK_STOCKS[0],
    credits: 100000,

    // UI
    isSidebarCollapsed: false,
    currentPage: null,
  };

  const _listeners = [];

  function get() { return { ..._state }; }

  function set(partial) {
    _state = { ..._state, ...partial };
    _listeners.forEach(fn => fn(_state));
  }

  function subscribe(fn) {
    _listeners.push(fn);
    return () => { const idx = _listeners.indexOf(fn); if (idx > -1) _listeners.splice(idx, 1); };
  }

  // ---- Computed getters ----

  function getPortfolioValue() {
    return _state.portfolio.reduce((total, pos) => total + pos.shares * pos.currentPrice, 0);
  }

  function getPortfolioPnl() {
    return _state.portfolio.reduce((total, pos) => {
      return total + pos.shares * (pos.currentPrice - pos.avgCost);
    }, 0);
  }

  function getTotalXp() {
    const user = _state.user;
    return user ? user.xp : 12450;
  }

  function getUserLevel() {
    return Math.floor(getTotalXp() / 1000) + 1;
  }

  // ---- Actions ----

  function executeTrade({ symbol, type, orderType, shares, price }) {
    const total = shares * price;
    const stocks = _state.stocks;
    const portfolio = _state.portfolio.map(p => ({ ...p }));
    let { credits } = _state;

    if (type === 'BUY') {
      if (total > credits) return { success: false, message: 'Insufficient credits' };
      credits -= total;

      const existing = portfolio.find(p => p.symbol === symbol);
      if (existing) {
        const newShares = existing.shares + shares;
        existing.avgCost = (existing.avgCost * existing.shares + price * shares) / newShares;
        existing.shares = newShares;
        existing.currentPrice = price;
      } else {
        portfolio.push({ symbol, shares, avgCost: price, currentPrice: price });
      }
    } else {
      const existing = portfolio.find(p => p.symbol === symbol);
      if (!existing || existing.shares < shares) return { success: false, message: 'Insufficient shares' };
      credits += total;
      existing.shares -= shares;
      if (existing.shares === 0) {
        const idx = portfolio.findIndex(p => p.symbol === symbol);
        portfolio.splice(idx, 1);
      }
    }

    const trade = {
      id: Date.now().toString(),
      symbol, type, orderType, shares, price, total,
      timestamp: new Date().toISOString(),
      status: 'FILLED',
    };

    set({ credits, portfolio, trades: [trade, ..._state.trades] });
    return { success: true, message: `${type === 'BUY' ? 'Bought' : 'Sold'} ${shares} share${shares > 1 ? 's' : ''} of ${symbol}` };
  }

  function setSelectedStock(stock) { set({ selectedStock: stock }); }
  function toggleSidebar() { set({ isSidebarCollapsed: !_state.isSidebarCollapsed }); }

  // Simulate live price updates every 5 seconds
  function startPriceUpdates() {
    setInterval(() => {
      const stocks = _state.stocks.map(s => {
        const delta = s.price * (Math.random() - 0.5) * 0.004;
        const newPrice = parseFloat((s.price + delta).toFixed(2));
        const changePercent = parseFloat(((newPrice - s.price) / s.price * 100 + s.changePercent).toFixed(2));
        return { ...s, price: newPrice, change: parseFloat(delta.toFixed(2)), changePercent };
      });
      // Also update portfolio current prices
      const portfolio = _state.portfolio.map(pos => {
        const updated = stocks.find(s => s.symbol === pos.symbol);
        return updated ? { ...pos, currentPrice: updated.price } : pos;
      });
      set({ stocks, portfolio });
    }, 5000);
  }

  return { get, set, subscribe, getPortfolioValue, getPortfolioPnl, getTotalXp, getUserLevel, executeTrade, setSelectedStock, toggleSidebar, startPriceUpdates };
})();
