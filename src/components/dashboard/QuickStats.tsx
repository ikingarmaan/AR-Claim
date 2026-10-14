import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Award, 
  BookMarked, 
  HelpCircle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const QuickStats: React.FC = () => {
  const { progress, completionPercentage } = useAcademy();
  const totalBookmarks = progress.bookmarkedDenials.length + progress.bookmarkedModifiers.length + progress.bookmarkedTerms.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-health-darkCard p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Curriculum</span>
          <div className="p-2 rounded-xl bg-health-electric/10 text-health-electric">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completionPercentage}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {progress.completedModules.length} of 8 Modules Finished
          </div>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-white dark:bg-health-darkCard p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Exam Best</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {progress.quizBestScore > 0 ? `${progress.quizBestScore}%` : 'Not Taken'}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {progress.quizBestScore >= 80 ? 'Certified Master' : 'Passing Target: 80%'}
          </div>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-white dark:bg-health-darkCard p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Saved Items</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <BookMarked className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalBookmarks}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            CARCs, Modifiers & Terms
          </div>
        </div>
      </div>

      {/* Stat 4 */}
      <div className="bg-white dark:bg-health-darkCard p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">AR Scenarios</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            14
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interactive Call Playbooks
          </div>
        </div>
      </div>
    </div>
  );
};
