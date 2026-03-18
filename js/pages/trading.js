// Trading page

let _tradingChart = null;
let _tradeSide    = 'BUY';
let _orderType    = 'MARKET';

function renderTradingPage() {
  const { stocks, selectedStock } = State.get();

  const stockListHtml = stocks.map(s => `
    <div class="stock-item${selectedStock && s.symbol === selectedStock.symbol ? ' selected' : ''}"
         onclick="selectStock('${escapeHtml(s.symbol)}', this)">
      <div>
        <div class="stock-symbol">${escapeHtml(s.symbol)}</div>
        <div class="stock-name">${escapeHtml(s.name)}</div>
      </div>
      <div style="text-align:right;">
        <div class="stock-price">${formatCurrency(s.price)}</div>
        <div class="stock-change ${getChangeColor(s.changePercent)}">${formatPercent(s.changePercent)}</div>
      </div>
    </div>
  `).join('');

  const sel = selectedStock || stocks[0];

  const content = `
    <div class="page-header">
      <h1 class="page-title">Trading</h1>
      <p class="page-subtitle">Paper trade with real market data. No real money involved.</p>
    </div>
    <div class="trading-layout">

      <!-- Stock List -->
      <div class="glass-card p-4">
        <div style="font-weight:700;margin-bottom:12px;font-size:0.9rem;color:var(--fg2);">STOCKS</div>
        <div class="stock-list" id="stock-list">${stockListHtml}</div>
      </div>

      <!-- Chart Area -->
      <div class="glass-card p-5">
        <div class="chart-header">
          <div>
            <div class="chart-stock-name" id="chart-stock-name">${escapeHtml(sel.symbol)} · ${escapeHtml(sel.name)}</div>
            <div style="display:flex;align-items:center;gap:10px;margin-top:6px;">
              <div class="chart-stock-price" id="chart-stock-price">${formatCurrency(sel.price)}</div>
              <span class="${getChangeColor(sel.changePercent)}" style="font-size:0.9rem;font-weight:600;" id="chart-stock-change">
                ${formatPercent(sel.changePercent)} today
              </span>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span style="font-size:0.8rem;color:var(--fg3);">Vol: ${escapeHtml(sel.volume || '')}</span>
            <span style="font-size:0.8rem;color:var(--fg3);">Mkt Cap: ${escapeHtml(sel.marketCap || '')}</span>
          </div>
        </div>
        <div class="chart-container" style="height:300px;">
          <canvas id="trading-chart"></canvas>
        </div>
      </div>

      <!-- Order Panel -->
      <div class="glass-card p-5 trading-order-panel">
        <div style="font-weight:700;font-size:1rem;margin-bottom:16px;">Place Order</div>

        <!-- Buy/Sell tabs -->
        <div class="trade-side-tabs" id="trade-side-tabs">
          <button class="trade-side-btn buy active" onclick="setTradeSide('BUY')">BUY</button>
          <button class="trade-side-btn sell" onclick="setTradeSide('SELL')">SELL</button>
        </div>

        <!-- Order type -->
        <div class="order-type-tabs">
          <button class="order-type-btn active" onclick="setOrderType('MARKET', this)">Market</button>
          <button class="order-type-btn" onclick="setOrderType('LIMIT', this)">Limit</button>
          <button class="order-type-btn" onclick="setOrderType('STOP', this)">Stop</button>
        </div>

        <!-- Inputs -->
        <div class="input-group mb-3">
          <label>Shares</label>
          <input class="input" type="number" id="order-shares" min="1" step="1" value="1" oninput="updateOrderTotal()" placeholder="Number of shares" />
        </div>
        <div class="input-group mb-3" id="limit-price-group" style="display:none;">
          <label>Limit Price ($)</label>
          <input class="input" type="number" id="order-limit-price" min="0.01" step="0.01" placeholder="Enter limit price" />
        </div>

        <!-- Summary -->
        <div class="order-summary">
          <div class="order-summary-row">
            <span class="order-summary-label">Market Price</span>
            <span id="order-market-price">${formatCurrency(sel.price)}</span>
          </div>
          <div class="order-summary-row">
            <span class="order-summary-label">Shares</span>
            <span id="order-shares-display">1</span>
          </div>
          <div class="order-summary-row">
            <span class="order-summary-label">Est. Total</span>
            <strong id="order-total">${formatCurrency(sel.price)}</strong>
          </div>
        </div>

        <!-- Affordability -->
        <div id="afford-msg" style="margin-top:10px;font-size:0.8rem;color:var(--fg3);"></div>

        <button class="btn w-full btn-success" style="margin-top:16px;padding:13px;font-size:1rem;letter-spacing:0.5px;" id="place-order-btn" onclick="placeOrder()">
          Place BUY Order
        </button>

        <!-- Positions info -->
        <div style="margin-top:16px;padding:14px;background:rgba(255,255,255,0.03);border-radius:8px;" id="position-info"></div>
      </div>
    </div>
  `;

  const html = renderAppShell('trading', 'Trading', content);

  requestAnimationFrame(() => {
    renderTradingChart(sel);
    updateOrderTotal();
    updatePositionInfo();
    startLivePriceUpdates();
  });

  return html;
}

function selectStock(symbol, clickedEl) {
  const { stocks } = State.get();
  const stock = stocks.find(s => s.symbol === symbol);
  if (!stock) return;
  State.setSelectedStock(stock);

  // Update stock list highlighting
  document.querySelectorAll('.stock-item').forEach(el => el.classList.remove('selected'));
  if (clickedEl) clickedEl.classList.add('selected');

  // Update chart header
  const nameEl    = document.getElementById('chart-stock-name');
  const priceEl   = document.getElementById('chart-stock-price');
  const changeEl  = document.getElementById('chart-stock-change');
  if (nameEl)   nameEl.textContent   = `${stock.symbol} · ${stock.name}`;
  if (priceEl)  priceEl.textContent  = formatCurrency(stock.price);
  if (changeEl) {
    changeEl.textContent = `${formatPercent(stock.changePercent)} today`;
    changeEl.className   = getChangeColor(stock.changePercent);
  }

  // Update order market price and total
  const mpEl = document.getElementById('order-market-price');
  if (mpEl) mpEl.textContent = formatCurrency(stock.price);
  updateOrderTotal();
  updatePositionInfo();
  renderTradingChart(stock);
}

function setTradeSide(side) {
  _tradeSide = side;
  document.querySelectorAll('.trade-side-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.trade-side-btn.${side.toLowerCase()}`).classList.add('active');
  const orderBtn = document.getElementById('place-order-btn');
  if (orderBtn) {
    orderBtn.textContent = `Place ${side} Order`;
    orderBtn.className   = `btn w-full ${side === 'BUY' ? 'btn-success' : 'btn-danger'}`;
    orderBtn.style.cssText = 'margin-top:16px;padding:13px;font-size:1rem;letter-spacing:0.5px;';
  }
  updateOrderTotal();
}

function setOrderType(type, btn) {
  _orderType = type;
  document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const limitGroup = document.getElementById('limit-price-group');
  if (limitGroup) limitGroup.style.display = (type !== 'MARKET') ? 'flex' : 'none';
}

function updateOrderTotal() {
  const { selectedStock, stocks } = State.get();
  const stock  = selectedStock || stocks[0];
  const shares = parseInt(document.getElementById('order-shares')?.value || 1, 10);
  const price  = stock.price;
  const total  = shares * price;

  const totalEl    = document.getElementById('order-total');
  const sharesDisp = document.getElementById('order-shares-display');
  const affordEl   = document.getElementById('afford-msg');

  if (totalEl)    totalEl.textContent    = formatCurrency(total);
  if (sharesDisp) sharesDisp.textContent = isNaN(shares) ? '–' : shares;
  if (affordEl) {
    const { credits, portfolio } = State.get();
    if (_tradeSide === 'BUY') {
      affordEl.style.color = total > credits ? 'var(--danger)' : 'var(--success)';
      affordEl.textContent = total > credits
        ? `⚠ Insufficient credits (need ${formatCurrency(total - credits)} more)`
        : `✓ Available credits: ${formatCurrency(credits)}`;
    } else {
      const pos = portfolio.find(p => p.symbol === stock.symbol);
      const hasEnough = pos && pos.shares >= shares;
      affordEl.style.color = hasEnough ? 'var(--success)' : 'var(--danger)';
      affordEl.textContent = pos
        ? (hasEnough ? `✓ You own ${pos.shares} shares` : `⚠ Only ${pos.shares} shares available`)
        : '⚠ No position in this stock';
    }
  }
}

function updatePositionInfo() {
  const { selectedStock, portfolio, stocks } = State.get();
  const stock   = selectedStock || stocks[0];
  const pos     = portfolio.find(p => p.symbol === stock.symbol);
  const infoEl  = document.getElementById('position-info');
  if (!infoEl) return;

  if (pos) {
    const pnl        = (pos.currentPrice - pos.avgCost) * pos.shares;
    const pnlPercent = ((pos.currentPrice - pos.avgCost) / pos.avgCost) * 100;
    const color      = pnl >= 0 ? 'var(--success)' : 'var(--danger)';
    infoEl.innerHTML = `
      <div style="font-size:0.8rem;color:var(--fg3);margin-bottom:8px;">YOUR POSITION</div>
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;margin-bottom:6px;">
        <span style="color:var(--fg2)">Shares held</span><strong>${pos.shares}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;margin-bottom:6px;">
        <span style="color:var(--fg2)">Avg. Cost</span><strong>${formatCurrency(pos.avgCost)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.875rem;">
        <span style="color:var(--fg2)">P&L</span>
        <strong style="color:${color}">${formatCurrency(pnl)} (${formatPercent(pnlPercent)})</strong>
      </div>
    `;
  } else {
    infoEl.innerHTML = `<div style="font-size:0.8rem;color:var(--fg3);text-align:center;">No position in ${escapeHtml(stock.symbol)}</div>`;
  }
}

function placeOrder() {
  const { selectedStock, stocks } = State.get();
  const stock  = selectedStock || stocks[0];
  const shares = parseInt(document.getElementById('order-shares')?.value || 0, 10);

  if (!shares || shares < 1) {
    Toast.error('Invalid order', 'Please enter a valid number of shares');
    return;
  }

  const limitPriceInput = document.getElementById('order-limit-price');
  const price = (_orderType !== 'MARKET' && limitPriceInput?.value)
    ? parseFloat(limitPriceInput.value)
    : stock.price;

  const result = State.executeTrade({
    symbol: stock.symbol,
    type: _tradeSide,
    orderType: _orderType,
    shares,
    price,
  });

  if (result.success) {
    Toast.success('Order Filled! ✅', result.message);
    updateOrderTotal();
    updatePositionInfo();
  } else {
    Toast.error('Order Failed', result.message);
  }
}

function renderTradingChart(stock) {
  const canvas = document.getElementById('trading-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  if (_tradingChart) { _tradingChart.destroy(); }

  const history = generatePriceHistory(stock.price);
  const labels  = Array.from({ length: history.length }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (history.length - 1 - i));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const isPositive  = stock.changePercent >= 0;
  const color       = isPositive ? '#10b981' : '#ef4444';
  const gradient    = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, isPositive ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  _tradingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: history,
        borderColor: color,
        borderWidth: 2,
        backgroundColor: gradient,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,20,0.9)',
          borderColor: `${color}44`,
          borderWidth: 1,
          callbacks: {
            title: ctx => labels[ctx[0].dataIndex],
            label: ctx => ` ${formatCurrency(ctx.parsed.y)}`,
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 }, maxTicksLimit: 8 },
          border: { display: false },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: 'rgba(255,255,255,0.4)',
            font: { size: 10 },
            callback: v => '$' + v.toFixed(0),
          },
          border: { display: false },
          position: 'right',
        }
      }
    }
  });
}

function startLivePriceUpdates() {
  State.startPriceUpdates();

  // Subscribe to stock price updates
  State.subscribe(state => {
    const { stocks, selectedStock } = state;
    // Update stock list prices
    stocks.forEach(s => {
      const items = document.querySelectorAll('.stock-item');
      items.forEach(item => {
        const sym = item.querySelector('.stock-symbol')?.textContent;
        if (sym === s.symbol) {
          const priceEl  = item.querySelector('.stock-price');
          const changeEl = item.querySelector('.stock-change');
          if (priceEl)  priceEl.textContent  = formatCurrency(s.price);
          if (changeEl) { changeEl.textContent = formatPercent(s.changePercent); changeEl.className = `stock-change ${getChangeColor(s.changePercent)}`; }
        }
      });
    });

    // Update chart header if selected stock updated
    if (selectedStock) {
      const updated = stocks.find(s => s.symbol === selectedStock.symbol);
      if (updated) {
        const priceEl  = document.getElementById('chart-stock-price');
        const changeEl = document.getElementById('chart-stock-change');
        if (priceEl)  priceEl.textContent  = formatCurrency(updated.price);
        if (changeEl) { changeEl.textContent = `${formatPercent(updated.changePercent)} today`; changeEl.className = getChangeColor(updated.changePercent); }
        updateOrderTotal();
      }
    }
  });
}
