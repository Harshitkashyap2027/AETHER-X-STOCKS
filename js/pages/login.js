// Login page

function renderLoginPage() {
  return `
    <div class="auth-page bg-grid">
      <div class="hero-bg-blur auth-bg-1"></div>
      <div class="hero-bg-blur auth-bg-2"></div>
      <div class="glass-card auth-card animate-fade-in">
        <div class="auth-logo">
          <div class="auth-logo-text gradient-text">AETHER X</div>
          <div style="font-size:0.75rem;color:var(--fg3);margin-top:4px;">STOCKS SIMULATOR</div>
        </div>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to your trading account</p>

        <div id="login-error" class="auth-error"></div>

        <form class="auth-form" id="login-form" onsubmit="handleLogin(event)">
          <div class="input-group">
            <label for="login-email">Email Address</label>
            <input class="input" id="login-email" type="email" placeholder="trader@example.com" required autocomplete="email" />
          </div>
          <div class="input-group">
            <label for="login-password">Password</label>
            <input class="input" id="login-password" type="password" placeholder="••••••••" required autocomplete="current-password" />
          </div>
          <button class="btn btn-primary w-full" type="submit" id="login-btn" style="padding:13px;">
            Sign In
          </button>
        </form>

        <div class="auth-divider" style="margin-top:20px;">or</div>

        <button class="btn btn-secondary w-full" style="padding:13px;margin-top:16px;" onclick="handleDemoLogin()">
          🎮 Try Demo Account
        </button>

        <p class="auth-footer-link" style="margin-top:20px;">
          Don't have an account? <a onclick="Router.navigate('register')" style="cursor:pointer">Create one free</a>
        </p>
      </div>
    </div>
  `;
}

async function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn      = document.getElementById('login-btn');
  const errEl    = document.getElementById('login-error');

  btn.disabled = true;
  btn.textContent = 'Signing in…';
  errEl.classList.remove('visible');

  try {
    await Auth.login(email, password);
    Toast.success('Welcome back!', 'Redirecting to your dashboard…');
    Router.navigate('dashboard');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.add('visible');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

async function handleDemoLogin() {
  await Auth.login('demo@aetherx.app', 'demo1234');
  Toast.success('Demo mode active!', 'Explore with $100,000 virtual credits');
  Router.navigate('dashboard');
}
