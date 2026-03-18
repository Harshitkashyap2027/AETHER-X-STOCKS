'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUIZ_QUESTIONS = [
  {
    question: 'What does P/E ratio stand for?',
    options: ['Price-to-Earnings', 'Profit-to-Equity', 'Price-to-Equity', 'Profit-to-Earnings'],
    correct: 0,
    explanation: 'P/E ratio compares a company\'s share price to its earnings per share.',
  },
  {
    question: 'What is a "bull market"?',
    options: ['A declining market', 'A rising market', 'A stable market', 'A volatile market'],
    correct: 1,
    explanation: 'A bull market is characterized by rising asset prices and investor optimism.',
  },
  {
    question: 'What is diversification?',
    options: ['Investing all money in one stock', 'Spreading investments across assets', 'Selling all investments', 'Buying only bonds'],
    correct: 1,
    explanation: 'Diversification reduces risk by spreading investments across different assets.',
  },
];

export default function QuizComponent() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentQ];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowResult(true);
    if (index === question.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-5xl mb-4">
          {score === QUIZ_QUESTIONS.length ? '🏆' : score >= QUIZ_QUESTIONS.length / 2 ? '⭐' : '📚'}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-slate-400 mb-1">Score: {score}/{QUIZ_QUESTIONS.length}</p>
        <p className="text-cyan-400 font-semibold">+{score * 50} XP Earned!</p>
        <Button onClick={() => { setCurrentQ(0); setSelected(null); setShowResult(false); setFinished(false); setScore(0); }} className="mt-6">
          Retry Quiz
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="text-sm text-cyan-400">{score} correct</span>
      </div>

      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
          style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="text-base font-semibold text-white">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((option, i) => (
          <motion.button
            key={i}
            whileHover={selected === null ? { scale: 1.01 } : {}}
            onClick={() => handleAnswer(i)}
            className={`w-full text-left p-3 rounded-xl text-sm font-medium border transition-all ${
              selected === null
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                : i === question.correct
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : i === selected && i !== question.correct
                    ? 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'bg-white/3 border-white/5 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {showResult && i === question.correct && <CheckCircle2 className="h-4 w-4 shrink-0" />}
              {showResult && i === selected && i !== question.correct && <XCircle className="h-4 w-4 shrink-0" />}
              {option}
            </div>
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-xs text-slate-300">{question.explanation}</p>
        </motion.div>
      )}

      {showResult && (
        <Button onClick={handleNext} className="w-full">
          {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
}
