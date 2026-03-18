// Portfolio page

function renderPortfolioPage() {
  const { portfolio, trades } = State.get();
  const portfolioValue = State.getPortfolioValue();
  const pnl            = State.getPortfolioPnl();
  const pnlPercent     = (portfolioValue - pnl) > 0 ? (pnl / (portfolioValue - pnl)) * 100 : 0;

  const holdingsHtml = portfolio.length === 0
    ? `<div style="text-align:center;padding:40px;color:var(--fg3);">No holdings yet. <a onclick="Router.navigate('trading')" style="color:var(--primary);cursor:pointer;">Start trading →</a></div>`
    : portfolio.map(pos => {
        const value      = pos.shares * pos.currentPrice;
        const posPnl     = (pos.currentPrice - pos.avgCost) * pos.shares;
        const posPnlPct  = ((pos.currentPrice - pos.avgCost) / pos.avgCost) * 100;
        const pctOfPort  = portfolioValue > 0 ? (value / portfolioValue) * 100 : 0;

        return `
          <div class="portfolio-holding">
            <div class="holding-symbol-badge">${escapeHtml(pos.symbol)}</div>
            <div style="flex:1;">
              <div class="holding-name">${escapeHtml(pos.symbol)}</div>
              <div class="holding-shares">${pos.shares} shares · avg ${formatCurrency(pos.avgCost)}</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.75rem;color:var(--fg3);">Weight</div>
              <div style="font-weight:600;">${pctOfPort.toFixed(1)}%</div>
            </div>
            <div style="text-align:right;">
              <div class="holding-value">${formatCurrency(value)}</div>
              <div class="holding-pnl ${getChangeColor(posPnl)}">${formatPercent(posPnlPct)} (${formatCurrency(posPnl)})</div>
            </div>
          </div>
        `;
      }).join('');

  const tradesRows = trades.slice(0, 20).map(t => `
    <tr>
      <td><strong>${escapeHtml(t.symbol)}</strong></td>
      <td><span class="badge ${t.type === 'BUY' ? 'badge-success' : 'badge-danger'}">${t.type}</span></td>
      <td>${t.shares}</td>
      <td>${formatCurrency(t.price)}</td>
      <td><strong>${formatCurrency(t.total)}</strong></td>
      <td style="color:var(--fg3);font-size:0.8rem;">${timeAgo(t.timestamp)}</td>
    </tr>
  `).join('');

  // Pie chart colors
  const pieColors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];

  const content = `
    <div class="page-header">
      <h1 class="page-title">Portfolio</h1>
      <p class="page-subtitle">Track your holdings and performance.</p>
    </div>

    <div class="grid-3 mb-6">
      ${statsCard({ label: 'Total Value', value: formatCurrency(portfolioValue), change: pnlPercent, changeLabel: 'total return', icon: Icons.wallet, iconBg: 'rgba(0,212,255,0.12)' })}
      ${statsCard({ label: 'Total P&L', value: formatCurrency(pnl), change: pnlPercent, icon: pnl >= 0 ? Icons.arrowUp : Icons.arrowDown, iconBg: pnl >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)' })}
      ${statsCard({ label: 'Positions', value: portfolio.length, subtitle: 'Open positions', icon: Icons.pie, iconBg: 'rgba(124,58,237,0.12)' })}
    </div>

    <div class="grid-2 mb-6">
      <!-- Holdings -->
      <div class="glass-card p-5" style="grid-column:1/2;">
        <div style="font-weight:700;font-size:1rem;margin-bottom:16px;">Holdings</div>
        <div style="display:flex;flex-direction:column;gap:8px;">${holdingsHtml}</div>
      </div>

      <!-- Allocation Pie -->
      <div class="glass-card p-5">
        <div style="font-weight:700;font-size:1rem;margin-bottom:16px;">Asset Allocation</div>
        <div style="position:relative;height:220px;display:flex;align-items:center;justify-content:center;">
          <canvas id="pie-chart"></canvas>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px;" id="pie-legend"></div>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="glass-card overflow-hidden">
      <div style="padding:20px 20px 0;font-weight:700;font-size:1rem;">Transaction History</div>
      <div style="overflow-x:auto;padding:16px 0 0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Symbol</th><th>Type</th><th>Shares</th><th>Price</th><th>Total</th><th>Time</th>
            </tr>
          </thead>
          <tbody>${tradesRows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--fg3);">No transactions yet</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  `;

  const html = renderAppShell('portfolio', 'Portfolio', content);

  requestAnimationFrame(() => {
    renderPieChart(portfolio, pieColors);
  });

  return html;
}

function renderPieChart(portfolio, pieColors) {
  const canvas = document.getElementById('pie-chart');
  if (!canvas || portfolio.length === 0 || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  if (window._pieChart) { window._pieChart.destroy(); }

  const labels = portfolio.map(p => p.symbol);
  const values = portfolio.map(p => p.shares * p.currentPrice);
  const colors = portfolio.map((_, i) => pieColors[i % pieColors.length]);

  window._pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors.map(c => c + 'bb'),
        borderColor: colors,
        borderWidth: 2,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,20,0.9)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          callbacks: {
            label: ctx => ` ${formatCurrency(ctx.parsed)} (${((ctx.parsed / values.reduce((a,b)=>a+b,0))*100).toFixed(1)}%)`,
          }
        }
      }
    }
  });

  // Legend
  const legendEl = document.getElementById('pie-legend');
  if (legendEl) {
    legendEl.innerHTML = portfolio.map((p, i) => `
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:10px;height:10px;border-radius:50%;background:${colors[i]};"></div>
          <span>${escapeHtml(p.symbol)}</span>
        </div>
        <span style="color:var(--fg2);">${((values[i]/values.reduce((a,b)=>a+b,0))*100).toFixed(1)}%</span>
      </div>
    `).join('');
  }
}
