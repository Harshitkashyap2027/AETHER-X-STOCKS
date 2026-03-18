'use client';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AIChatbot from '@/components/ai/AIChatbot';

export default function AIAssistantPage() {
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Trading Assistant</h1>
            <p className="text-slate-400 text-sm">Powered by AETHER X AI</p>
          </div>
        </div>
      </motion.div>
      <Card className="flex-1 overflow-hidden flex flex-col">
        <AIChatbot />
      </Card>
    </div>
  );
}
