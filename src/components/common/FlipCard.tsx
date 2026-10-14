import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Bookmark, BookmarkCheck, Calculator, AlertTriangle } from 'lucide-react';
import { TermItem } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';

interface FlipCardProps {
  term: TermItem;
}

export const FlipCard: React.FC<FlipCardProps> = ({ term }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { progress, toggleBookmarkTerm } = useAcademy();
  const isBookmarked = progress.bookmarkedTerms.includes(term.id);

  return (
    <div className="w-full h-[360px] perspective-1000 group">
      <motion.div
        className="w-full h-full relative transform-style-3d transition-transform duration-500 rounded-2xl cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={() => setIsFlipped(prev => !prev)}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-health-electric/40 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-health-electric/10 text-health-electric border border-health-electric/20 uppercase tracking-wider">
                {term.category.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                {term.code && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    {term.code}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => toggleBookmarkTerm(term.id)}
                  title={isBookmarked ? 'Bookmarked' : 'Bookmark term'}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-health-electric transition-colors">
              {term.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
              {term.shortDefinition}
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="flex items-start gap-2 bg-slate-50 dark:bg-health-darkSubtle/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Rule: </span>
                {term.keyRule}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1 text-health-electric font-medium">
                <RotateCw className="w-3.5 h-3.5" /> Click for Real-World Math & Detail
              </span>
              <span>3D Flip</span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-slate-100 border border-health-electric/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-health-electric">
                {term.code || term.title} • Deep Dive
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-health-electric" /> Flip back
              </span>
            </div>

            <h4 className="text-sm font-semibold text-slate-200 mb-2">
              Clinical & Financial Explanation:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {term.detailedExplanation}
            </p>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                <Calculator className="w-3.5 h-3.5" /> Real-World Clinical Example:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {term.realWorldExample}
              </p>
            </div>

            {term.calculationMath && (
              <div className="bg-health-electric/10 p-2.5 rounded-lg border border-health-electric/30 font-mono text-[11px] text-health-electric">
                {term.calculationMath}
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-between border-t border-slate-800">
            <span>RCM Masterclass</span>
            <span className="text-emerald-400 font-medium">Verified Compliance</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
