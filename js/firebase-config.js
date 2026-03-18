// Firebase configuration
// Replace these values with your actual Firebase project configuration
// Get them from: https://console.firebase.google.com → Project Settings → Your Apps

const firebaseConfig = {
  apiKey:            "AIzaSyDemo-Replace-With-Your-API-Key",
  authDomain:        "aether-x-stocks.firebaseapp.com",
  projectId:         "aether-x-stocks",
  storageBucket:     "aether-x-stocks.appspot.com",
  messagingSenderId: "000000000000",
  appId:             "1:000000000000:web:0000000000000000000000",
  measurementId:     "G-XXXXXXXXXX",
};

// Gracefully handle the case where Firebase SDK fails to load (e.g. blocked CDN)
let auth, db;

try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db   = firebase.firestore();
  } else {
    console.warn('Firebase SDK not loaded — running in offline/demo mode.');
    auth = _createFallbackAuth();
    db   = _createFallbackDb();
  }
} catch (e) {
  console.warn('Firebase init failed — running in offline/demo mode.', e.message);
  auth = _createFallbackAuth();
  db   = _createFallbackDb();
}

// Minimal fallback auth object so the app still runs without Firebase
function _createFallbackAuth() {
  return {
    onAuthStateChanged: (cb) => { setTimeout(() => cb(null), 0); return () => {}; },
    signInWithEmailAndPassword: async () => { throw { code: 'auth/network-request-failed' }; },
    createUserWithEmailAndPassword: async () => { throw { code: 'auth/network-request-failed' }; },
    signOut: async () => {},
    currentUser: null,
  };
}

function _createFallbackDb() {
  return {
    collection: () => ({
      doc: () => ({
        set: async () => {},
        get: async () => ({ exists: false, data: () => null }),
      }),
      get: async () => ({ docs: [] }),
    }),
  };
}
