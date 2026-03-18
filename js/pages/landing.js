// Landing page

function renderLandingPage() {
  const tickerStocks = [...MOCK_STOCKS, ...MOCK_STOCKS]; // duplicate for infinite scroll
  const tickerItems = tickerStocks.map(s => {
    const color = s.changePercent >= 0 ? 'var(--success)' : 'var(--danger)';
    const arrow  = s.changePercent >= 0 ? '▲' : '▼';
    return `<span class="ticker-item">
      <strong>${escapeHtml(s.symbol)}</strong>
      <span>${formatCurrency(s.price)}</span>
      <span style="color:${color}">${arrow} ${Math.abs(s.changePercent).toFixed(2)}%</span>
    </span>`;
  }).join('');

  const features = [
    { icon: '📈', iconBg: 'rgba(0,212,255,0.15)', title: 'Paper Trading', desc: 'Trade with $100,000 in virtual credits. No risk, real market data, real learning.' },
    { icon: '🤖', iconBg: 'rgba(124,58,237,0.15)', title: 'AI Assistant', desc: 'Ask our AI anything about stocks, strategies, and market analysis.' },
    { icon: '📚', iconBg: 'rgba(16,185,129,0.15)', title: '200+ Lessons', desc: 'Structured courses from beginner to advanced. Learn at your own pace.' },
    { icon: '🏆', iconBg: 'rgba(245,158,11,0.15)', title: 'Leaderboards', desc: 'Compete with traders worldwide. Climb the ranks and showcase your skills.' },
    { icon: '🤝', iconBg: 'rgba(239,68,68,0.15)', title: 'Social Trading', desc: 'Follow top traders, copy strategies, and build your trading network.' },
    { icon: '⚡', iconBg: 'rgba(0,212,255,0.15)', title: 'XP & Levels', desc: 'Earn experience points from trading and learning. Level up your profile.' },
  ];

  const featureCards = features.map(f => `
    <div class="glass-card-hover feature-card">
      <div class="feature-icon" style="background:${f.iconBg}">${f.icon}</div>
      <div class="feature-title">${escapeHtml(f.title)}</div>
      <div class="feature-desc">${escapeHtml(f.desc)}</div>
    </div>
  `).join('');

  return `
    <div class="landing bg-grid">
      <!-- Navbar -->
      <nav class="landing-nav">
        <div class="landing-nav-logo gradient-text">AETHER X STOCKS</div>
        <div class="landing-nav-links">
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('login')">Sign In</button>
          <button class="btn btn-primary btn-sm animate-pulse-glow" onclick="Router.navigate('register')">Start Free</button>
        </div>
      </nav>

      <!-- Ticker -->
      <div class="ticker-section" style="margin-top:64px;">
        <div class="ticker-track animate-ticker">${tickerItems}${tickerItems}</div>
      </div>

      <!-- Hero -->
      <section class="landing-hero">
        <div class="hero-bg-blur hero-bg-1"></div>
        <div class="hero-bg-blur hero-bg-2"></div>
        <div class="hero-badge animate-float">
          <span>🚀</span> <span>AI-Powered Stock Market Simulator</span>
        </div>
        <h1 class="hero-title">
          Master the Markets<br>
          <span class="gradient-text">Risk-Free</span>
        </h1>
        <p class="hero-subtitle">
          Trade real stocks with $100,000 in virtual credits. Learn from 200+ lessons,
          compete on leaderboards, and get AI-powered insights — all for free.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-xl animate-pulse-glow" onclick="Router.navigate('register')">
            🚀 Start Trading Free
          </button>
          <button class="btn btn-secondary btn-xl" onclick="Router.navigate('login')">
            Sign In
          </button>
        </div>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-value gradient-text">$100K</div>
            <div class="hero-stat-label">Virtual Credits</div>
          </div>
          <div>
            <div class="hero-stat-value gradient-text">200+</div>
            <div class="hero-stat-label">Learning Modules</div>
          </div>
          <div>
            <div class="hero-stat-value gradient-text">10+</div>
            <div class="hero-stat-label">Live Stocks</div>
          </div>
          <div>
            <div class="hero-stat-value gradient-text">Free</div>
            <div class="hero-stat-label">Always</div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features-section">
        <div class="features-header">
          <h2 class="features-title">Everything You Need to <span class="gradient-text">Trade Better</span></h2>
          <p class="features-subtitle">Powerful tools and features designed for both beginners and experienced traders.</p>
        </div>
        <div class="grid-3">${featureCards}</div>
      </section>

      <!-- CTA -->
      <section class="landing-cta">
        <div class="hero-bg-blur hero-bg-1" style="width:400px;height:400px;top:-100px;left:50%;transform:translateX(-50%);"></div>
        <h2 class="hero-title" style="font-size:clamp(2rem,4vw,3.5rem);">
          Ready to Start <span class="gradient-text">Trading?</span>
        </h2>
        <p class="hero-subtitle" style="margin:0 auto 32px;">
          Join thousands of traders learning and competing on AETHER X STOCKS.
        </p>
        <button class="btn btn-primary btn-xl animate-pulse-glow" onclick="Router.navigate('register')">
          Create Free Account →
        </button>
      </section>

      <footer class="landing-footer">
        <p>© ${new Date().getFullYear()} AETHER X STOCKS · AI-powered stock market learning and simulation ecosystem · For educational purposes only</p>
      </footer>
    </div>
  `;
}
