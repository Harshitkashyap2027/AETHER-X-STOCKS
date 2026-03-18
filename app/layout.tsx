import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AETHER X STOCKS - AI-Powered Stock Market Simulator',
  description: 'Learn stock trading with AI assistance, compete on leaderboards, and master the markets without risking real money.',
  manifest: '/manifest.json',
  themeColor: '#00d4ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
