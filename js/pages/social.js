// Social page

let _followState = {};
SOCIAL_USERS.forEach(u => { _followState[u.id] = u.isFollowing; });

function renderSocialPage() {
  const userCardsHtml = SOCIAL_USERS.map(u => renderSocialUserCard(u)).join('');

  const activityHtml = ACTIVITY_FEED.map(item => `
    <div class="activity-item">
      <div class="activity-avatar">${item.avatar}</div>
      <div class="activity-text flex-1">
        <strong>${escapeHtml(item.user)}</strong>
        <span style="color:var(--fg2);"> ${item.action} </span>
        <strong style="color:${item.action === 'bought' ? 'var(--success)' : 'var(--danger)'}">
          ${item.shares} ${escapeHtml(item.symbol)}
        </strong>
        <span style="color:var(--fg2);"> at ${formatCurrency(item.price)}</span>
        ${item.pnl ? `<span style="color:${item.pnl > 0 ? 'var(--success)' : 'var(--danger)'}"> · P&L: ${formatCurrency(item.pnl)}</span>` : ''}
        <div class="activity-time">${item.time}</div>
      </div>
    </div>
  `).join('');

  const content = `
    <div class="page-header">
      <h1 class="page-title">Social Trading</h1>
      <p class="page-subtitle">Follow top traders, copy strategies, and grow your network.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start;">
      <!-- User Cards -->
      <div>
        <div style="font-weight:700;font-size:1rem;margin-bottom:16px;">Top Traders to Follow</div>
        <div class="grid-2">${userCardsHtml}</div>
      </div>

      <!-- Activity Feed -->
      <div>
        <div class="glass-card p-5">
          <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:1rem;margin-bottom:16px;">
            ${Icons.activity} Live Activity
          </div>
          <div id="activity-feed">${activityHtml}</div>
        </div>

        <div class="glass-card p-5 mt-4">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:14px;">Your Network</div>
          <div style="display:flex;justify-content:space-around;text-align:center;">
            <div>
              <div style="font-size:1.5rem;font-weight:800;">2</div>
              <div style="font-size:0.75rem;color:var(--fg3);">Following</div>
            </div>
            <div>
              <div style="font-size:1.5rem;font-weight:800;">0</div>
              <div style="font-size:0.75rem;color:var(--fg3);">Followers</div>
            </div>
            <div>
              <div style="font-size:1.5rem;font-weight:800;">13</div>
              <div style="font-size:0.75rem;color:var(--fg3);">Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return renderAppShell('social', 'Social', content);
}

function renderSocialUserCard(u) {
  const isFollowing = _followState[u.id];
  return `
    <div class="glass-card-hover social-user-card" id="social-card-${escapeHtml(u.id)}">
      <div class="social-user-header">
        <div class="social-avatar">${u.avatar}</div>
        <div style="flex:1;">
          <div style="font-weight:700;">${escapeHtml(u.name)}</div>
          <div class="social-username">${escapeHtml(u.username)}</div>
        </div>
        <span class="badge badge-success">+${u.pnl.toFixed(2)}%</span>
      </div>
      <div class="social-bio">${escapeHtml(u.bio)}</div>
      <div class="social-stats">
        <div><strong>${formatLargeNumber(u.followers)}</strong> followers</div>
        <div><strong>${u.trades}</strong> trades</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-sm w-full ${isFollowing ? 'btn-secondary' : 'btn-primary'}"
                id="follow-btn-${escapeHtml(u.id)}"
                onclick="toggleFollow('${escapeHtml(u.id)}')">
          ${isFollowing ? '✓ Following' : '+ Follow'}
        </button>
        <button class="btn btn-sm btn-ghost" onclick="Toast.info('Copy Strategy', 'This feature copies their trade strategy to your account.')">
          Copy
        </button>
      </div>
    </div>
  `;
}

function toggleFollow(userId) {
  _followState[userId] = !_followState[userId];
  const isFollowing = _followState[userId];
  const btn = document.getElementById('follow-btn-' + userId);
  const user = SOCIAL_USERS.find(u => u.id === userId);
  if (!btn || !user) return;

  btn.textContent = isFollowing ? '✓ Following' : '+ Follow';
  btn.className   = `btn btn-sm w-full ${isFollowing ? 'btn-secondary' : 'btn-primary'}`;

  if (isFollowing) {
    Toast.success('Following ' + user.name, 'You\'ll see their trades in your activity feed!');
  } else {
    Toast.info('Unfollowed ' + user.name, '');
  }
}
