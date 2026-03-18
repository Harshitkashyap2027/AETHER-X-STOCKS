// Leaderboard page

function renderLeaderboardPage() {
  const tabs = ['Daily', 'Weekly', 'All-Time'];

  const tabBtns = tabs.map((t, i) => `
    <button class="tab-btn${i === 2 ? ' active' : ''}" onclick="switchLeaderboardTab('${t}', this)">${t}</button>
  `).join('');

  const rowsHtml = LEADERBOARD_USERS.map(u => {
    const rankClass = u.rank === 1 ? 'rank-gold' : u.rank === 2 ? 'rank-silver' : u.rank === 3 ? 'rank-bronze' : '';
    const rankIcon  = u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : u.rank;

    return `
      <div class="leaderboard-row glass-card-hover" style="margin-bottom:6px;">
        <div class="leaderboard-rank ${rankClass}">${rankIcon}</div>
        <div class="leaderboard-avatar">${u.avatar}</div>
        <div style="flex:1;">
          <div class="leaderboard-name">${escapeHtml(u.name)}</div>
          <div class="leaderboard-xp">${formatNumber(u.xp)} XP · Level ${u.level}</div>
        </div>
        <div>
          <div class="leaderboard-pnl text-positive">${formatCurrency(u.pnl)}</div>
          <div style="font-size:0.8rem;font-weight:600;text-align:right;color:var(--success);">+${u.pnlPercent.toFixed(2)}%</div>
        </div>
      </div>
    `;
  }).join('');

  // User's position (mock)
  const userRow = `
    <div class="leaderboard-row" style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.3);border-radius:var(--radius-sm);margin-top:12px;padding:14px 16px;">
      <div class="leaderboard-rank" style="color:var(--primary);">#47</div>
      <div class="leaderboard-avatar" style="background:linear-gradient(135deg,rgba(0,212,255,0.2),rgba(124,58,237,0.2));">👤</div>
      <div style="flex:1;">
        <div class="leaderboard-name">You</div>
        <div class="leaderboard-xp">12,450 XP · Level 13</div>
      </div>
      <div>
        <div class="leaderboard-pnl text-positive">${formatCurrency(State.getPortfolioPnl())}</div>
        <div style="font-size:0.8rem;font-weight:600;text-align:right;color:var(--success);">
          ${formatPercent((State.getPortfolioPnl() / 100000) * 100)}
        </div>
      </div>
    </div>
  `;

  const content = `
    <div class="page-header">
      <h1 class="page-title">Leaderboard</h1>
      <p class="page-subtitle">Compete with traders worldwide. Climb the ranks!</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start;">
      <!-- Rankings -->
      <div class="glass-card p-5">
        <div class="tabs mb-4" id="leaderboard-tabs">${tabBtns}</div>
        <div id="leaderboard-list">${rowsHtml}</div>

        <div style="border-top:1px solid var(--border);padding-top:4px;">
          <div style="font-size:0.8rem;color:var(--fg3);text-align:center;margin:8px 0;">Your Position</div>
          ${userRow}
        </div>
      </div>

      <!-- Top 3 Podium -->
      <div>
        <div class="glass-card p-5 mb-4">
          <div style="font-weight:700;font-size:1rem;margin-bottom:20px;text-align:center;">🏆 Top Performers</div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            ${LEADERBOARD_USERS.slice(0, 3).map((u, i) => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;">
                <div style="font-size:1.5rem;">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                <div style="font-size:1.5rem;">${u.avatar}</div>
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:0.875rem;">${escapeHtml(u.name)}</div>
                  <div style="font-size:0.75rem;color:var(--success);">+${u.pnlPercent.toFixed(2)}%</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass-card p-5">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:14px;">Your Stats</div>
          <div style="display:flex;flex-direction:column;gap:10px;font-size:0.875rem;">
            <div style="display:flex;justify-content:space-between;">
              <span style="color:var(--fg2);">Global Rank</span>
              <strong>#47</strong>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="color:var(--fg2);">Total XP</span>
              <strong>12,450</strong>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="color:var(--fg2);">Level</span>
              <strong>13</strong>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="color:var(--fg2);">Portfolio P&L</span>
              <strong class="${getChangeColor(State.getPortfolioPnl())}">${formatCurrency(State.getPortfolioPnl())}</strong>
            </div>
          </div>
          <button class="btn btn-primary w-full btn-sm" style="margin-top:16px;" onclick="Router.navigate('trading')">
            📈 Trade to Climb Higher
          </button>
        </div>
      </div>
    </div>
  `;

  return renderAppShell('leaderboard', 'Leaderboard', content);
}

function switchLeaderboardTab(tab, btn) {
  document.querySelectorAll('#leaderboard-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // In real app, fetch different data per period. For now show same data with toast.
  Toast.info(`Showing ${tab} rankings`, 'Rankings updated!');
}
