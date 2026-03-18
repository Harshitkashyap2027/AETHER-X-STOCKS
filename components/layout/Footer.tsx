import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <TrendingUp className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AETHER X STOCKS
          </span>
        </div>
        <p className="text-xs text-slate-500">
          © 2024 AETHER X STOCKS. For educational purposes only. Not financial advice.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
          <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
          <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}
