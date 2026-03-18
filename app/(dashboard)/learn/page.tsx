'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CourseCard from '@/components/learn/CourseCard';
import QuizComponent from '@/components/learn/QuizComponent';
import { COURSES } from '@/lib/constants';

export default function LearnPage() {
  const [filter, setFilter] = useState('All');
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filtered = filter === 'All' ? COURSES : COURSES.filter(c => c.level === filter);
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Learning Center</h1>
        <p className="text-slate-400 text-sm mt-1">Master trading from beginner to advanced</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {levels.map(l => (
              <button key={l} onClick={() => setFilter(l)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === l ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'}`}>{l}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">📝 Quick Quiz</CardTitle></CardHeader>
            <CardContent><QuizComponent /></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
