'use client';

import { motion } from 'framer-motion';
import { Clock, Star, ChevronRight } from 'lucide-react';
import { Course } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const levelColors = {
  Beginner: 'success' as const,
  Intermediate: 'warning' as const,
  Advanced: 'destructive' as const,
};

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 backdrop-blur-md p-5 cursor-pointer hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{course.image}</div>
        <Badge variant={levelColors[course.level]}>{course.level}</Badge>
      </div>

      <h3 className="text-base font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
        {course.title}
      </h3>
      <p className="text-xs text-slate-400 mb-4 line-clamp-2">{course.description}</p>

      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {course.duration}
        </span>
        <span>{course.lessons} lessons</span>
        <span className="flex items-center gap-1 text-yellow-400">
          <Star className="h-3 w-3 fill-yellow-400" />
          +{course.xpReward} XP
        </span>
      </div>

      {course.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Progress</span>
            <span className={course.progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}>
              {course.progress}%
            </span>
          </div>
          <Progress value={course.progress} className="h-1.5" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{course.category}</span>
        <div className="flex items-center gap-1 text-xs text-cyan-400 group-hover:text-cyan-300">
          {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </motion.div>
  );
}
