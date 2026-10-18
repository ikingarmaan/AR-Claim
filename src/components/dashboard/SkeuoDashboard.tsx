import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RCM_STAGES, StageId } from '../../types/rcm';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  FileText, 
  Search, 
  PhoneCall, 
  Calendar,
  Sparkles,
  Trophy,
  ShieldCheck,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface SkeuoDashboardProps {
  onOpenBirthdayModal: () => void;
  onOpenArNoteModal: () => void;
  onOpenBookmarks: () => void;
}

export const SkeuoDashboard: React.FC<SkeuoDashboardProps> = ({
  onOpenBirthdayModal,
  onOpenArNoteModal,
  onOpenBookmarks
}) => {
  const { setActiveModule, progress, completionPercentage, resetAllProgress } = useAcademy();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Visual Conveyor Blueprint */}
      <RcmPipelineFlow />

      {/* Main Clipboard Hero */}
      <div className="skeuo-clipboard p-6 sm:p-8 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Top Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-amber-800 text-white font-mono text-xs px-2.5 py-1 rounded">
                STUDENT DOSSIER
              </span>
              <span className="text-xs font-mono text-stone-500">
                SERIES: US-HEALTHCARE-REVENUE-CYCLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              RCMclaim Executive Academy
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Master the entire end-to-end US Healthcare Revenue Cycle Management lifecycle across 10 sequential gates — from patient intake to claim submission, official CMS-1500 & UB-04 forms, payment posting, and denial appeals.
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-2deg]">
              CURRICULUM ACTIVE
            </div>
            <div className="text-xs font-mono text-stone-500">
              PROGRESS: {completionPercentage}% COMPLETE
            </div>
          </div>
        </div>

        {/* 3 Physical Ledger Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          {/* Card 1: Completed Stages */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-stone-500 uppercase">Stages Mastered</span>
              <div className="text-2xl font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                {progress.completedModules.length} <span className="text-sm font-normal text-stone-500">/ 10</span>
              </div>
              <div className="text-[11px] font-serif text-stone-600 dark:text-stone-400 mt-0.5">
                {progress.completedModules.length === 10 ? 'All Gates Completed!' : 'Pipeline in progress'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              ✓
            </div>
          </div>

          {/* Card 2: Certification Score */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-stone-500 uppercase">Exam Best Score</span>
              <div className="text-2xl font-mono font-bold text-amber-900 dark:text-amber-300 mt-1">
                {progress.quizBestScore}%
              </div>
              <div className="text-[11px] font-serif text-stone-600 dark:text-stone-400 mt-0.5">
                {progress.quizBestScore >= 80 ? 'Certified Professional' : 'Passing benchmark: 80%'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              ★
            </div>
          </div>

          {/* Card 3: Notes & Bookmarks */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-stone-500 uppercase">Saved Call Notes</span>
              <div className="text-2xl font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                {progress.savedNotes.length}
              </div>
              <div className="text-[11px] font-serif text-stone-600 dark:text-stone-400 mt-0.5">
                {progress.bookmarkedDenials.length} Bookmarked Denials
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold">
              📋
            </div>
          </div>
        </div>

        {/* 10-Stage Conveyor Direct Launcher Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                10-Stage Pipeline Curriculum Stations
              </h3>
              <p className="text-xs text-stone-500">
                Click any station dossier to open that stage file and study its clinical, regulatory, and billing rules.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {RCM_STAGES.map((stage) => {
              const isDone = progress.completedModules.includes(stage.id);

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveModule(stage.id as StageId)}
                  className="skeuo-manila p-3.5 rounded-xl border border-stone-300 dark:border-stone-600 text-left hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between h-36 group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                        GATE #{stage.number}
                      </span>
                      <span className="text-lg">{stage.icon}</span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm mt-1.5 line-clamp-1 group-hover:text-amber-800 dark:group-hover:text-amber-400">
                      {stage.title}
                    </h4>
                    <p className="text-[10px] text-stone-600 dark:text-stone-400 line-clamp-2 mt-0.5">
                      {stage.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-between text-[10px] font-mono">
                    <span className={isDone ? 'text-emerald-700 font-bold' : 'text-stone-500'}>
                      {isDone ? '✓ Completed' : 'Pending'}
                    </span>
                    <span className="text-amber-700 group-hover:translate-x-1 transition-transform">
                      Open →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Tools & Case File */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-300 dark:border-stone-700">
          {/* Quick Tool: Birthday Rule */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase">Interactive Instrument</span>
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Birthday Rule Calculator</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Determine primary vs secondary payer for dependent children when parents have dual coverage.
            </p>
            <button
              onClick={onOpenBirthdayModal}
              className="mt-3 text-xs font-serif font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Launch Calculator</span> →
            </button>
          </div>

          {/* Quick Tool: Official Forms Studio */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Core Documentation</span>
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Official Claim Forms Studio</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              CMS-1500 (33 boxes) & UB-04 (81 locators) with real PDF view & side-by-side box explanations.
            </p>
            <button
              onClick={() => setActiveModule('claim-submission')}
              className="mt-3 text-xs font-serif font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Inspect Forms</span> →
            </button>
          </div>

          {/* Quick Tool: Certification Exam */}
          <div className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase">Knowledge Verification</span>
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Certification Exam Engine</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Timed 50-question comprehensive exam covering all 10 stages with real-time explanations.
            </p>
            <button
              onClick={() => setActiveModule('quiz-engine')}
              className="mt-3 text-xs font-serif font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Begin Exam</span> →
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-4 border-t border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between text-xs text-stone-500">
          <span>RCMclaim v3.0 • Skeuomorphic Healthcare Revenue Cycle Education</span>
          <button
            onClick={resetAllProgress}
            className="text-stone-500 hover:text-red-700 flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
