// Authentication logic — Firebase Auth + demo mode

const Auth = (() => {
  let _demoMode = false;

  function isDemoMode() { return _demoMode; }

  async function login(email, password) {
    // Demo mode: accept any non-empty credentials
    if (!email || !password) throw new Error('Please enter email and password');

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      return result.user;
    } catch (err) {
      if (err.code === 'auth/invalid-api-key' ||
          err.code === 'auth/configuration-not-found' ||
          err.code === 'auth/api-key-not-valid' ||
          err.code === 'auth/network-request-failed') {
        // Fall back to demo mode
        return _demoLogin(email);
      }
      throw new Error(_friendlyError(err.code));
    }
  }

  async function register(email, password, displayName) {
    if (!email || !password || !displayName) throw new Error('Please fill in all fields');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName });
      return result.user;
    } catch (err) {
      if (err.code === 'auth/invalid-api-key' ||
          err.code === 'auth/configuration-not-found' ||
          err.code === 'auth/api-key-not-valid' ||
          err.code === 'auth/network-request-failed') {
        return _demoLogin(email, displayName);
      }
      throw new Error(_friendlyError(err.code));
    }
  }

  async function logout() {
    if (_demoMode) {
      _demoMode = false;
      State.set({ user: null });
      Router.navigate('landing');
      return;
    }
    await auth.signOut();
  }

  function _demoLogin(email, displayName) {
    _demoMode = true;
    const user = {
      uid: 'demo-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      credits: 100000,
      xp: 12450,
      level: 13,
      role: 'user',
    };
    State.set({ user, isAuthLoading: false });
    return user;
  }

  function _friendlyError(code) {
    const map = {
      'auth/user-not-found':       'No account found with this email',
      'auth/wrong-password':       'Incorrect password',
      'auth/email-already-in-use': 'Email already registered',
      'auth/weak-password':        'Password is too weak (min 6 chars)',
      'auth/invalid-email':        'Invalid email address',
      'auth/too-many-requests':    'Too many attempts. Please wait a moment.',
    };
    return map[code] || 'Something went wrong. Please try again.';
  }

  function init() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        State.set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            credits: 100000,
            xp: 12450,
            level: 13,
            role: 'user',
          },
          isAuthLoading: false,
        });
        // If on auth page, redirect to dashboard
        const { currentPage } = State.get();
        if (!currentPage || currentPage === 'landing' || currentPage === 'login' || currentPage === 'register') {
          Router.navigate('dashboard');
        }
      } else if (!_demoMode) {
        State.set({ user: null, isAuthLoading: false });
        const { currentPage } = State.get();
        const publicPages = ['landing', 'login', 'register'];
        if (currentPage && !publicPages.includes(currentPage)) {
          Router.navigate('landing');
        }
      }
    });
  }

  return { login, register, logout, isDemoMode, init };
})();
