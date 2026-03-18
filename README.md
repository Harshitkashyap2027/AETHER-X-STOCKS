<div align="center">

<img src="https://img.shields.io/badge/AETHER%20X%20STOCKS-AI%20Powered-cyan?style=for-the-badge&logo=trending-up" alt="AETHER X STOCKS" />

# 📈 AETHER X STOCKS

**AI-Powered Stock Market Learning & Simulation Ecosystem**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
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
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AETHER X STOCKS** is a full-stack, AI-powered stock market simulation platform designed to help beginners and intermediate traders learn investing without risking real capital. Users receive **$100,000 in virtual credits** upon registration and can:

- Execute real-time paper trades across popular stocks
- Get AI-driven analysis and personalized recommendations
- Follow structured learning paths and earn XP
- Compete on daily, weekly, and all-time leaderboards
- Connect with and follow other traders in a social network

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
- [Next.js 15](https://nextjs.org/) — React framework with App Router
- [TypeScript 5.8](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3.4](https://tailwindcss.com/) — Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) — Animations and transitions
- [Recharts](https://recharts.org/) — Composable charting library
- [Radix UI](https://www.radix-ui.com/) — Accessible headless UI components
- [Lucide React](https://lucide.dev/) — Icon library
- [Zustand](https://zustand-demo.pmnd.rs/) — Lightweight state management

**Backend / Infrastructure**
- [Firebase 11](https://firebase.google.com/) — Authentication, Firestore database, and Analytics

---

## ✅ Prerequisites

Ensure you have the following installed before getting started:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18.0.0 or later | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0 or later (bundled with Node.js) | — |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

You will also need a **Firebase project** to provide authentication and database services. See [Environment Configuration](#-environment-configuration) for setup instructions.

---

## 🚀 Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Harshitkashyap2027/AETHER-X-STOCKS.git
cd AETHER-X-STOCKS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and update each value (see [Environment Configuration](#-environment-configuration) for details).

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔧 Environment Configuration

The application requires Firebase credentials to enable authentication and database functionality.

### Step 1 — Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Enter a project name (e.g., `aether-x-stocks`) and follow the setup wizard.
3. Once created, navigate to **Project Settings** → **General** → **Your apps**.
4. Click **Add app** → **Web** (`</>`), register the app, and copy the config object.

### Step 2 — Enable Firebase Services

In the Firebase Console, enable the following services:

- **Authentication** → Sign-in method → Enable **Email/Password** and optionally **Google**
- **Firestore Database** → Create database → Start in **test mode** (update rules before production)

### Step 3 — Populate `.env.local`

Open your `.env.local` file and replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Never commit your `.env.local` file to version control.** It is already listed in `.gitignore`.

---

## ▶️ Running the Application

### Development Mode

Runs the app in development mode with hot reloading:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build

Build an optimized production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Linting

Run the Next.js linter to check for code issues:

```bash
npm run lint
```

---

## 📁 Project Structure

```
AETHER-X-STOCKS/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── ai-assistant/       # AI Trading Assistant
│   │   ├── dashboard/          # Main dashboard
│   │   ├── leaderboard/        # Rankings & leaderboards
│   │   ├── learn/              # Learning modules
│   │   ├── portfolio/          # User portfolio
│   │   ├── profile/            # User profile
│   │   ├── social/             # Social trading network
│   │   └── trading/            # Paper trading simulator
│   ├── admin/                  # Admin panel
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                 # Reusable React components
│   ├── ai/                     # AI assistant components
│   ├── dashboard/              # Dashboard widgets
│   ├── layout/                 # Layout components (sidebar, navbar)
│   ├── learn/                  # Learning module components
│   ├── trading/                # Trading UI components
│   └── ui/                     # Shared UI primitives (buttons, modals, etc.)
├── lib/                        # Utility libraries
│   ├── constants.ts            # App-wide constants
│   ├── firebase.ts             # Firebase initialization
│   └── utils.ts                # Helper utilities
├── store/                      # Zustand state management
├── types/                      # TypeScript type definitions
├── public/                     # Static assets
├── .env.local.example          # Example environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies & scripts
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start development server on port 3000 |
| Build | `npm run build` | Create optimized production build |
| Start | `npm run start` | Start production server |
| Lint | `npm run lint` | Run ESLint code checks |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your code passes linting (`npm run lint`) before submitting.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Harshitkashyap2027](https://github.com/Harshitkashyap2027)

**AETHER X STOCKS** — For educational purposes only. Not financial advice.

</div>