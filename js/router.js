// Client-side router using URL hash navigation

const Router = (() => {
  const PUBLIC_PAGES  = ['landing', 'login', 'register'];
  const PAGE_TITLES   = {
    landing:    'AETHER X STOCKS',
    login:      'Sign In · AETHER X',
    register:   'Create Account · AETHER X',
    dashboard:  'Dashboard',
    trading:    'Trading',
    portfolio:  'Portfolio',
    learn:      'Learn',
    ai:         'AI Assistant',
    leaderboard:'Leaderboard',
    social:     'Social',
    profile:    'Profile',
  };

  const PAGE_RENDERERS = {
    landing:     renderLandingPage,
    login:       renderLoginPage,
    register:    renderRegisterPage,
    dashboard:   renderDashboardPage,
    trading:     renderTradingPage,
    portfolio:   renderPortfolioPage,
    learn:       renderLearnPage,
    ai:          renderAIPage,
    leaderboard: renderLeaderboardPage,
    social:      renderSocialPage,
    profile:     renderProfilePage,
  };

  function getPageFromHash() {
    const hash = window.location.hash.slice(1).replace(/^\//, '') || 'landing';
    return hash;
  }

  function navigate(page) {
    window.location.hash = '/' + page;
  }

  function render(page) {
    const { user, isAuthLoading } = State.get();

    // Auth guard for protected pages
    if (!PUBLIC_PAGES.includes(page) && !user) {
      navigate('landing');
      return;
    }

    // Redirect logged-in users away from auth pages
    if (user && (page === 'login' || page === 'register')) {
      navigate('dashboard');
      return;
    }

    const renderer = PAGE_RENDERERS[page] || PAGE_RENDERERS['landing'];
    const html     = renderer();

    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = html;

    // Update title and state
    document.title = PAGE_TITLES[page] || 'AETHER X STOCKS';
    State.set({ currentPage: page });

    // Mobile: close sidebar overlay on nav
    document.getElementById('sidebar')?.classList.remove('mobile-open');
  }

  function init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const page = getPageFromHash();
      render(page);
    });

    // Auth state ready
    const { isAuthLoading } = State.get();
    if (!isAuthLoading) {
      render(getPageFromHash() || 'landing');
    } else {
      // Wait for auth to resolve
      const unsub = State.subscribe(state => {
        if (!state.isAuthLoading) {
          unsub();
          render(getPageFromHash() || 'landing');
        }
      });
    }
  }

  return { navigate, render, init };
})();

// Profile page (simple)
function renderProfilePage() {
  const { user } = State.get();
  const pnl      = State.getPortfolioPnl();
  const level    = State.getUserLevel();
  const xp       = State.getTotalXp();
  const xpProgress = ((xp % 1000) / 1000) * 100;

  const content = `
    <div class="page-header">
      <h1 class="page-title">Profile</h1>
    </div>
    <div style="max-width:600px;">
      <div class="glass-card p-6 mb-4">
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:2rem;">👤</div>
          <div>
            <div style="font-size:1.5rem;font-weight:800;">${escapeHtml(user?.displayName || 'Trader')}</div>
            <div style="color:var(--fg3);font-size:0.875rem;">${escapeHtml(user?.email || '')}</div>
            <div style="margin-top:6px;display:flex;gap:8px;">
              <span class="badge badge-primary">Level ${level}</span>
              <span class="badge badge-secondary">${formatNumber(xp)} XP</span>
            </div>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--fg2);margin-bottom:6px;">
            <span>XP Progress to Level ${level + 1}</span>
            <span>${xp % 1000} / 1000 XP</span>
          </div>
          <div class="progress-track"><div class="progress-bar" style="width:${xpProgress}%"></div></div>
        </div>

        <div class="grid-2">
          ${statsCard({ label: 'Portfolio P&L', value: formatCurrency(pnl), icon: Icons.trending, iconBg: pnl >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)' })}
          ${statsCard({ label: 'Available Credits', value: formatCurrency(State.get().credits), icon: Icons.wallet, iconBg: 'rgba(0,212,255,0.12)' })}
        </div>
      </div>

      <div class="glass-card p-5">
        <div style="font-weight:700;margin-bottom:16px;">Account Settings</div>
        <div class="input-group mb-3">
          <label>Display Name</label>
          <input class="input" type="text" value="${escapeHtml(user?.displayName || '')}" placeholder="Your name" />
        </div>
        <div class="input-group mb-4">
          <label>Email</label>
          <input class="input" type="email" value="${escapeHtml(user?.email || '')}" disabled style="opacity:0.6;" />
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-primary" onclick="Toast.success('Settings saved!','Your profile has been updated.')">Save Changes</button>
          <button class="btn btn-danger" onclick="Auth.logout()">Logout</button>
        </div>
      </div>
    </div>
  `;

  return renderAppShell('profile', 'Profile', content);
}

// Initialize the app
(function () {
  Auth.init();
  Router.init();
})();
