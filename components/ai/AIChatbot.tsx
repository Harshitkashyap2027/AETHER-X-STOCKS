'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/types';

const QUICK_PROMPTS = [
  'Explain P/E ratio simply',
  'What is dollar-cost averaging?',
  'How to read a stock chart?',
  'Best beginner strategies?',
  'Explain options trading',
];

const AI_RESPONSES: Record<string, string> = {
  default: "I'm your AETHER X AI trading assistant! I can help you understand stock market concepts, analyze trading strategies, and guide your investment learning journey. What would you like to know?",
  pe: "The **Price-to-Earnings (P/E) ratio** compares a company's stock price to its earnings per share (EPS).\n\n**Formula:** P/E = Stock Price ÷ EPS\n\n**How to interpret it:**\n- High P/E (>25): Market expects high future growth\n- Low P/E (<15): Stock may be undervalued or company has low growth\n- Negative P/E: Company has losses\n\n**Example:** If AAPL trades at $180 with EPS of $6, P/E = 30x",
  dca: "**Dollar-Cost Averaging (DCA)** is investing a fixed amount at regular intervals, regardless of price.\n\n**Benefits:**\n✅ Reduces impact of volatility\n✅ Removes emotional decision-making\n✅ Works for beginners\n✅ Builds discipline\n\n**Example:** Invest $100 in AAPL every month. When price is high, you buy fewer shares. When low, you buy more. Over time, your average cost is smoothed out.",
  chart: "**Reading Stock Charts:**\n\n📊 **Candlestick patterns** show open, high, low, close prices\n📈 **Moving Averages** (MA50, MA200) show trend direction\n📉 **RSI** (0-100) measures momentum — >70 overbought, <30 oversold\n🔊 **Volume** confirms trend strength\n\n**Key patterns to know:**\n- Head & Shoulders (reversal)\n- Double Bottom (bullish reversal)\n- Cup & Handle (continuation)",
  beginner: "**Best Beginner Trading Strategies:**\n\n1. **Buy & Hold** — Purchase diversified ETFs, hold long-term\n2. **Dollar-Cost Averaging** — Invest fixed amounts regularly\n3. **Index Investing** — Track S&P 500 with SPY/VOO\n4. **Blue-Chip Focus** — Large, stable companies (AAPL, MSFT)\n\n**Rules for beginners:**\n- Never invest money you can't afford to lose\n- Start with paper trading (like this app!)\n- Keep a trading journal\n- Learn before you earn",
  options: "**Options Trading Basics:**\n\n**Call Option** — Right to BUY 100 shares at strike price\n**Put Option** — Right to SELL 100 shares at strike price\n\n**Key terms:**\n- **Strike Price:** Price you can buy/sell at\n- **Expiration:** Date option expires\n- **Premium:** Cost of the option\n- **ITM/OTM:** In/Out of the money\n\n**Basic strategies:**\n- Covered Call: Own shares + sell calls\n- Cash-Secured Put: Cash to buy + sell puts\n- Long Call: Bullish speculation",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('p/e') || lower.includes('pe ratio') || lower.includes('price-to-earning')) return AI_RESPONSES.pe;
  if (lower.includes('dollar-cost') || lower.includes('dca') || lower.includes('averaging')) return AI_RESPONSES.dca;
  if (lower.includes('chart') || lower.includes('candlestick') || lower.includes('read')) return AI_RESPONSES.chart;
  if (lower.includes('beginner') || lower.includes('start') || lower.includes('new')) return AI_RESPONSES.beginner;
  if (lower.includes('option') || lower.includes('call') || lower.includes('put')) return AI_RESPONSES.options;
  return `Great question! "${message}"\n\nI'm analyzing this for you... Here's what I know:\n\nThe stock market involves complex interplay of fundamentals, technicals, and market sentiment. For your specific question, I'd recommend exploring the Learning section where we have dedicated courses on this topic.\n\nWould you like me to explain any specific aspect in more detail?`;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: AI_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(content),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                  : 'bg-gradient-to-br from-purple-500 to-violet-600'
              }`}>
                {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'assistant'
                  ? 'bg-white/5 border border-white/10 text-slate-200'
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-white'
              }`}>
                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <RefreshCw className="h-3 w-3 text-cyan-400 animate-spin" />
              <span className="text-xs text-slate-400 ml-1">AI is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="shrink-0 flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <Sparkles className="h-3 w-3 text-cyan-400" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Ask anything about stocks & trading..."
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
