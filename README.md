<div align="center">

<img src="https://img.shields.io/badge/AETHER%20X%20STOCKS-AI%20Powered-cyan?style=for-the-badge&logo=trending-up" alt="AETHER X STOCKS" />

# 📈 AETHER X STOCKS

**AI-Powered Stock Market Learning & Simulation Ecosystem**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-ff6384?style=flat-square&logo=chart.js)](https://www.chartjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Master the stock market **without the risk**. Trade real stocks with virtual money, learn from AI, compete with traders worldwide, and build the skills to invest with confidence.

[🚀 Live Demo](#) · [📖 Documentation](#) · [🐛 Report Bug](https://github.com/Harshitkashyap2027/AETHER-X-STOCKS/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Firebase Configuration](#-firebase-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AETHER X STOCKS** is a buildless, static single-page application (SPA) for AI-powered stock market simulation. Designed for beginners and intermediate traders, it lets you learn investing without risking real capital. Users receive **$100,000 in virtual credits** upon registration and can:

- Execute real-time paper trades across popular stocks
- Get AI-driven analysis and personalized recommendations
- Follow structured learning paths and earn XP
- Compete on daily, weekly, and all-time leaderboards
- Connect with and follow other traders in a social network

Because there is **no build step**, you can run the app by simply serving the repository root with any static file server.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Trading Assistant** | Real-time AI-powered insights, stock analysis, and personalized trading recommendations |
| 📊 **Paper Trading Simulator** | Trade with $100,000 in virtual credits under real market conditions, risk-free |
| 📚 **Structured Learning Paths** | From beginner to advanced — earn XP and level up as you master trading concepts (200+ modules) |
| 🏆 **Competitive Leaderboards** | Compete with thousands of traders across daily, weekly, and all-time rankings |
| 👥 **Social Trading Network** | Follow top traders, copy strategies, and build your trading community |
| 🛡️ **Risk-Free Environment** | Learn hard lessons with virtual money before committing real capital |
| 🔐 **Firebase Authentication** | Secure sign-up/sign-in with Google OAuth and email/password support |
| 📱 **Responsive Design** | Fully optimized for desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

**Frontend**
- Vanilla **JavaScript (ES6+)** — no framework or build tooling required
- Plain **CSS** (`css/styles.css`) — custom design system with CSS variables
- Hash-based client-side routing (`js/router.js`)
- [Chart.js 4.4](https://www.chartjs.org/) — interactive charts via CDN

**Backend / Infrastructure**
- [Firebase 10](https://firebase.google.com/) (compat SDK via CDN) — Authentication, Firestore database, and Analytics

---

## ✅ Prerequisites

| Tool | Notes |
|---|---|
| **Git** | To clone the repository — [git-scm.com](https://git-scm.com/) |
| **Any static file server** | e.g. VS Code Live Server, `npx serve`, Python's `http.server`, or similar |
| **Firebase project** | For authentication and database — see [Firebase Configuration](#-firebase-configuration) |

> No Node.js build step is required to run the application.

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Harshitkashyap2027/AETHER-X-STOCKS.git
cd AETHER-X-STOCKS
```

### 2. Configure Firebase

Edit `js/firebase-config.js` and replace the placeholder values with your own Firebase project credentials (see [Firebase Configuration](#-firebase-configuration) for details).

### 3. Serve the App

Serve the project root with any static file server. Examples:

```bash
# Using the npm serve package
npx serve .

# Using Python 3
python3 -m http.server 3000

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Open [http://localhost:3000](http://localhost:3000) (or the port your server reports) in your browser.

---

## 🔧 Firebase Configuration

The application requires a Firebase project for authentication and Firestore data storage.

### Step 1 — Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Enter a project name (e.g., `aether-x-stocks`) and follow the setup wizard.
3. Navigate to **Project Settings** → **General** → **Your apps**.
4. Click **Add app** → **Web** (`</>`), register the app, and copy the config object.

### Step 2 — Enable Firebase Services

- **Authentication** → Sign-in method → Enable **Email/Password** and optionally **Google**
- **Firestore Database** → Create database → Start in **test mode** (update rules before production)

### Step 3 — Update `js/firebase-config.js`

Open `js/firebase-config.js` and replace the placeholder values with your Firebase config:

```js
const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};
```

> ⚠️ **Never commit real credentials to version control.** Consider using environment-specific config files excluded via `.gitignore`.

---

## ▶️ Running the Application

Because AETHER X STOCKS is a buildless static app, simply serve the repository root:

```bash
npx serve .
```

Then open the URL shown in your terminal (e.g. [http://localhost:3000](http://localhost:3000)).

Navigation is fully hash-based (e.g. `/#/dashboard`, `/#/trading`), so no server-side routing configuration is needed.

---

## 📁 Project Structure

```
AETHER-X-STOCKS/
├── index.html                  # App entry point — loads all scripts in order
├── css/
│   └── styles.css              # Global styles & CSS design system
├── js/
│   ├── firebase-config.js      # Firebase project credentials & initialization
│   ├── data.js                 # Static stock data and constants
│   ├── utils.js                # Helper utilities (formatting, escaping, etc.)
│   ├── state.js                # Global reactive state management
│   ├── auth.js                 # Firebase Authentication logic
│   ├── components.js           # Reusable UI component renderers
│   ├── router.js               # Hash-based client-side router
│   └── pages/                  # Page renderer functions
│       ├── landing.js          # Landing / home page
│       ├── login.js            # Sign-in page
│       ├── register.js         # Registration page
│       ├── dashboard.js        # Main dashboard
│       ├── trading.js          # Paper trading simulator
│       ├── portfolio.js        # User portfolio
│       ├── learn.js            # Learning modules
│       ├── ai.js               # AI Trading Assistant
│       ├── leaderboard.js      # Rankings & leaderboards
│       └── social.js           # Social trading network
├── public/
│   └── manifest.json           # PWA manifest
├── .env.local.example          # Reference — shows expected Firebase keys
└── package.json                # Metadata only (no build step required)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Harshitkashyap2027](https://github.com/Harshitkashyap2027)

**AETHER X STOCKS** — For educational purposes only. Not financial advice.

</div>