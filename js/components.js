// Reusable UI components

// ---- Toast notifications ----
const Toast = (() => {
  const container = document.getElementById('toast-container');

  function show({ title, body = '', type = 'info', duration = 4000 }) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <div class="toast-msg">
        <div class="toast-title">${escapeHtml(title)}</div>
        ${body ? `<div class="toast-body">${escapeHtml(body)}</div>` : ''}
      </div>
    `;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; el.style.transition = '0.3s ease'; setTimeout(() => el.remove(), 300); }, duration);
  }

  return { success: (title, body) => show({ title, body, type: 'success' }), error: (title, body) => show({ title, body, type: 'error' }), info: (title, body) => show({ title, body, type: 'info' }), warning: (title, body) => show({ title, body, type: 'warning' }) };
})();

// ---- Sidebar ----
function renderSidebar(activePage) {
  const { isSidebarCollapsed } = State.get();
  const collapsed = isSidebarCollapsed ? 'collapsed' : '';

  const navItems = [
    { page: 'dashboard',  label: 'Dashboard',     icon: Icons.dashboard },
    { page: 'trading',    label: 'Trading',        icon: Icons.trending  },
    { page: 'portfolio',  label: 'Portfolio',      icon: Icons.pie       },
    { page: 'learn',      label: 'Learn',          icon: Icons.book      },
    { page: 'social',     label: 'Social',         icon: Icons.users     },
    { page: 'leaderboard',label: 'Leaderboard',    icon: Icons.trophy    },
    { page: 'ai',         label: 'AI Assistant',   icon: Icons.bot       },
  ];

  const links = navItems.map(item => `
    <a class="sidebar-link${activePage === item.page ? ' active' : ''}" onclick="Router.navigate('${item.page}')" style="cursor:pointer">
      ${item.icon}
      <span class="sidebar-link-label">${item.label}</span>
    </a>
  `).join('');

  return `
    <aside class="sidebar ${collapsed}" id="sidebar">
      <div class="sidebar-logo">
        <span class="sidebar-logo-icon">📈</span>
        <span class="sidebar-logo-text gradient-text" style="font-weight:900;letter-spacing:-0.5px;font-size:1rem;">AETHER X</span>
      </div>
      <nav class="sidebar-nav">${links}</nav>
      <div class="sidebar-bottom">
        <a class="sidebar-link" onclick="Router.navigate('profile')" style="cursor:pointer">
          ${Icons.user}
          <span class="sidebar-link-label">Profile</span>
        </a>
        <a class="sidebar-link" onclick="Auth.logout()" style="cursor:pointer">
          ${Icons.logout}
          <span class="sidebar-link-label">Logout</span>
        </a>
      </div>
      <button class="sidebar-toggle" onclick="State.toggleSidebar(); rerenderLayout();" title="Toggle sidebar">
        ${Icons.chevron}
      </button>
    </aside>
  `;
}

// ---- Navbar ----
function renderNavbar(title) {
  const { user, isSidebarCollapsed, credits } = State.get();
  const xp    = State.getTotalXp();
  const level = State.getUserLevel();
  const collapsed = isSidebarCollapsed ? 'sidebar-collapsed' : '';
  const displayCredits = formatCurrency(State.get().credits || 100000);

  return `
    <header class="navbar ${collapsed}" id="navbar">
      <button class="navbar-btn mobile-menu-btn" onclick="document.getElementById('sidebar').classList.toggle('mobile-open')" style="display:none">
        ${Icons.menu}
      </button>
      <span class="navbar-title">${escapeHtml(title)}</span>
      <div class="navbar-search" style="display:none">
        ${Icons.search}
        <input type="text" placeholder="Search stocks..." />
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-left:auto;">
        <div class="navbar-stat" style="color:#00d4ff;">
          ${Icons.zap}
          <span>${displayCredits}</span>
        </div>
        <div class="navbar-stat" style="color:#7c3aed;">
          <span style="font-size:0.75rem;font-weight:800;">LVL ${level}</span>
        </div>
        <button class="navbar-btn" title="Notifications">
          ${Icons.bell}
          <span class="badge-dot"></span>
        </button>
        <button class="navbar-btn" title="${escapeHtml(user ? user.displayName : 'Profile')}" onclick="Router.navigate('profile')">
          ${Icons.user}
        </button>
      </div>
    </header>
  `;
}

// ---- App shell wrapper ----
function renderAppShell(activePage, title, content) {
  const { isSidebarCollapsed } = State.get();
  const collapsed = isSidebarCollapsed ? 'sidebar-collapsed' : '';

  return `
    <div class="app-shell">
      ${renderSidebar(activePage)}
      <div class="main-content ${collapsed}" id="main-content">
        ${renderNavbar(title)}
        <main class="page-container animate-fade-in">
          ${content}
        </main>
      </div>
    </div>
  `;
}

function rerenderLayout() {
  // Re-render sidebar and navbar without full page reload
  const sidebar = document.getElementById('sidebar');
  const navbar  = document.getElementById('navbar');
  const mainContent = document.getElementById('main-content');
  if (!sidebar) return;

  const { isSidebarCollapsed } = State.get();
  if (isSidebarCollapsed) {
    sidebar.classList.add('collapsed');
    navbar?.classList.add('sidebar-collapsed');
    mainContent?.classList.add('sidebar-collapsed');
  } else {
    sidebar.classList.remove('collapsed');
    navbar?.classList.remove('sidebar-collapsed');
    mainContent?.classList.remove('sidebar-collapsed');
  }
}

// ---- Stats card ----
function statsCard({ label, value, change, changeLabel, icon, iconBg, subtitle }) {
  const changeClass = change !== undefined ? (change >= 0 ? 'text-positive' : 'text-negative') : '';
  const changeStr   = change !== undefined ? formatPercent(change) : '';
  return `
    <div class="glass-card stats-card">
      <div class="stats-card-left">
        <div class="stats-card-label">${escapeHtml(label)}</div>
        <div class="stats-card-value">${escapeHtml(String(value))}</div>
        ${change !== undefined ? `<div class="stats-card-change ${changeClass}">${changeStr} ${changeLabel ? escapeHtml(changeLabel) : ''}</div>` : ''}
        ${subtitle ? `<div class="stats-card-subtitle">${escapeHtml(subtitle)}</div>` : ''}
      </div>
      ${icon ? `<div class="stats-card-icon" style="background:${iconBg || 'rgba(0,212,255,0.1)'};color:${iconBg ? '#fff' : 'var(--primary)'}">${icon}</div>` : ''}
    </div>
  `;
}
