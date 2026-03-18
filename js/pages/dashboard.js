// Dashboard page

function renderDashboardPage() {
  const portfolioValue = State.getPortfolioValue();
  const pnl            = State.getPortfolioPnl();
  const pnlPercent     = (portfolioValue - pnl) !== 0 ? (pnl / (portfolioValue - pnl)) * 100 : 0;
  const { credits, trades, stocks } = State.get();
  const xp    = State.getTotalXp();
  const level = State.getUserLevel();

  // Stats cards
  const statsHtml = `
    <div class="grid-4 mb-6">
      ${statsCard({ label: 'Portfolio Value', value: formatCurrency(portfolioValue), change: pnlPercent, changeLabel: 'all time', icon: Icons.activity, iconBg: 'rgba(0,212,255,0.12)' })}
      ${statsCard({ label: 'Total P&L', value: formatCurrency(pnl), change: pnlPercent, icon: pnl >= 0 ? Icons.arrowUp : Icons.arrowDown, iconBg: pnl >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)' })}
      ${statsCard({ label: 'XP Points', value: formatNumber(xp), subtitle: `Level ${level}`, icon: Icons.zap, iconBg: 'rgba(245,158,11,0.12)' })}
      ${statsCard({ label: 'Available Credits', value: formatCurrency(credits), subtitle: 'Ready to invest', icon: Icons.wallet, iconBg: 'rgba(124,58,237,0.12)' })}
    </div>
  `;

  // Recent trades table
  const recentTrades = trades.slice(0, 5);
  const tradesRows = recentTrades.map(t => {
    const statusColor = t.status === 'FILLED' ? 'var(--success)' : t.status === 'PENDING' ? 'var(--warning)' : 'var(--fg3)';
    return `<tr>
      <td><strong>${escapeHtml(t.symbol)}</strong></td>
      <td><span class="badge ${t.type === 'BUY' ? 'badge-success' : 'badge-danger'}">${t.type}</span></td>
      <td>${t.shares}</td>
      <td>${formatCurrency(t.price)}</td>
      <td><strong>${formatCurrency(t.total)}</strong></td>
      <td style="color:${statusColor}">${t.status}</td>
    </tr>`;
  }).join('');

  // Market movers (top gainers/losers)
  const sorted = [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 6);
  const moversHtml = sorted.map(s => `
    <div class="market-mover" onclick="Router.navigate('trading')">
      <div>
        <div class="market-mover-symbol">${escapeHtml(s.symbol)}</div>
        <div class="market-mover-name">${escapeHtml(s.name)}</div>
      </div>
      <div>
        <div class="market-mover-price">${formatCurrency(s.price)}</div>
        <div class="market-mover-change ${getChangeColor(s.changePercent)}">${formatPercent(s.changePercent)}</div>
      </div>
    </div>
  `).join('');

  const content = `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back! Here's your trading overview.</p>
    </div>
    ${statsHtml}
    <div class="grid-2" style="gap:20px;">
      <!-- Portfolio Chart -->
      <div class="glass-card p-5">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <div>
            <div style="font-weight:700;font-size:1rem;">Portfolio Performance</div>
            <div style="color:var(--fg3);font-size:0.8rem;">12-month overview</div>
          </div>
          <span class="badge badge-success">+42.35%</span>
        </div>
        <div class="chart-container">
          <canvas id="portfolio-chart"></canvas>
        </div>
      </div>

      <!-- Market Movers -->
      <div class="glass-card p-5">
        <div style="font-weight:700;font-size:1rem;margin-bottom:16px;">Market Movers</div>
        <div style="display:flex;flex-direction:column;gap:6px;">${moversHtml}</div>
      </div>
    </div>

    <!-- Recent Trades -->
    <div class="glass-card" style="margin-top:20px;overflow:hidden;">
      <div style="padding:20px 20px 0;display:flex;justify-content:space-between;align-items:center;">
        <div style="font-weight:700;font-size:1rem;">Recent Trades</div>
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('portfolio')">View all →</button>
      </div>
      <div style="overflow-x:auto;padding:16px 0 0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Type</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${tradesRows || '<tr><td colspan="6" style="text-align:center;color:var(--fg3);padding:24px;">No trades yet. Start trading!</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  `;

  const html = renderAppShell('dashboard', 'Dashboard', content);

  requestAnimationFrame(() => {
    renderPortfolioChart();
    // Live update listener
    State.subscribe(() => {
      const valueEl = document.querySelectorAll('.stats-card-value');
      // Simple live update of credits
    });
  });

  return html;
}

function renderPortfolioChart() {
  const canvas = document.getElementById('portfolio-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  // Destroy any existing chart
  if (window._portfolioChart) { window._portfolioChart.destroy(); }

  const labels = PORTFOLIO_CHART_DATA.map(d => d.month);
  const values = PORTFOLIO_CHART_DATA.map(d => d.value);

  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0,   'rgba(0,212,255,0.3)');
  gradient.addColorStop(1,   'rgba(0,212,255,0)');

  window._portfolioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Portfolio Value',
        data: values,
        borderColor: '#00d4ff',
        borderWidth: 2,
        backgroundColor: gradient,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00d4ff',
        tension: 0.4,
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
          borderColor: 'rgba(0,212,255,0.3)',
          borderWidth: 1,
          titleColor: '#00d4ff',
          bodyColor: '#fff',
          callbacks: {
            label: ctx => ' ' + formatCurrency(ctx.parsed.y),
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
          border: { display: false },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: 'rgba(255,255,255,0.4)',
            font: { size: 11 },
            callback: v => '$' + (v / 1000).toFixed(0) + 'K',
          },
          border: { display: false },
        }
      }
    }
  });
}
