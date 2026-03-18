// Register page

function renderRegisterPage() {
  return `
    <div class="auth-page bg-grid">
      <div class="hero-bg-blur auth-bg-1"></div>
      <div class="hero-bg-blur auth-bg-2"></div>
      <div class="glass-card auth-card animate-fade-in">
        <div class="auth-logo">
          <div class="auth-logo-text gradient-text">AETHER X</div>
          <div style="font-size:0.75rem;color:var(--fg3);margin-top:4px;">STOCKS SIMULATOR</div>
        </div>
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join free and get $100,000 in virtual credits instantly</p>

        <div id="register-error" class="auth-error"></div>

        <form class="auth-form" id="register-form" onsubmit="handleRegister(event)">
          <div class="input-group">
            <label for="reg-name">Full Name</label>
            <input class="input" id="reg-name" type="text" placeholder="Your name" required autocomplete="name" />
          </div>
          <div class="input-group">
            <label for="reg-email">Email Address</label>
            <input class="input" id="reg-email" type="email" placeholder="trader@example.com" required autocomplete="email" />
          </div>
          <div class="input-group">
            <label for="reg-password">Password</label>
            <input class="input" id="reg-password" type="password" placeholder="Min. 6 characters" required autocomplete="new-password" minlength="6" />
          </div>
          <div style="display:flex;align-items:flex-start;gap:10px;font-size:0.8rem;color:var(--fg2);">
            <input type="checkbox" id="reg-terms" required style="margin-top:3px;flex-shrink:0;" />
            <label for="reg-terms">I agree to the Terms of Service. This platform is for educational purposes only — not real financial advice.</label>
          </div>
          <button class="btn btn-primary w-full" type="submit" id="register-btn" style="padding:13px;">
            🚀 Start Trading Free
          </button>
        </form>

        <div style="margin-top:16px;padding:14px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);border-radius:10px;font-size:0.8rem;color:var(--fg2);">
          <strong style="color:var(--primary);">🎁 What you get:</strong>
          <ul style="margin-top:8px;padding-left:16px;display:flex;flex-direction:column;gap:4px;list-style:disc;">
            <li>$100,000 virtual trading credits</li>
            <li>Access to 200+ learning lessons</li>
            <li>AI trading assistant</li>
            <li>Leaderboard competitions</li>
          </ul>
        </div>

        <p class="auth-footer-link" style="margin-top:20px;">
          Already have an account? <a onclick="Router.navigate('login')" style="cursor:pointer">Sign in</a>
        </p>
      </div>
    </div>
  `;
}

async function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const btn      = document.getElementById('register-btn');
  const errEl    = document.getElementById('register-error');

  btn.disabled = true;
  btn.textContent = 'Creating account…';
  errEl.classList.remove('visible');

  try {
    await Auth.register(email, password, name);
    Toast.success('Account created! 🎉', 'Welcome to AETHER X STOCKS!');
    Router.navigate('dashboard');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.add('visible');
  } finally {
    btn.disabled = false;
    btn.textContent = '🚀 Start Trading Free';
  }
}
