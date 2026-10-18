import React from 'react';
import { 
  X, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { RCM_STAGES, StageId } from '../../types/rcm';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { 
    activeModule, 
    setActiveModule, 
    progress, 
    completionPercentage, 
    resetAllProgress 
  } = useAcademy();

  const handleStageSelect = (stageId: StageId) => {
    setActiveModule(stageId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Skeuomorphic Binder Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 skeuo-leather text-amber-100 border-r border-amber-950/80 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Binder Spine Top Header */}
        <div className="p-4 border-b border-amber-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Brass Grommet */}
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 border border-amber-900 shadow-sm" />
            <span className="font-serif font-bold text-sm tracking-wide text-amber-200">
              RCMclaim BINDER
            </span>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Index Tabs List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {/* Executive Dashboard Tab */}
          <button
            onClick={() => handleStageSelect('dashboard')}
            className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between group border ${
              activeModule === 'dashboard'
                ? 'bg-amber-900/60 border-amber-500/80 text-amber-100 shadow-inner'
                : 'border-transparent text-amber-200/80 hover:bg-black/30 hover:text-amber-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🏛️</span>
              <div>
                <div className="text-xs font-serif font-bold">Executive Dashboard</div>
                <div className="text-[10px] text-amber-300/60 font-mono">Curriculum Overview</div>
              </div>
            </div>
            {activeModule === 'dashboard' && (
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Section Divider: 10 RCM Pipeline Stages */}
          <div className="pt-3 pb-1 px-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/60 font-bold">
              10-Stage Pipeline Gates
            </span>
          </div>

          {/* All 10 Stages */}
          {RCM_STAGES.map((stage) => {
            const isActive = activeModule === stage.id;
            const isCompleted = progress.completedModules.includes(stage.id);

            return (
              <button
                key={stage.id}
                onClick={() => handleStageSelect(stage.id as StageId)}
                className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between group border ${
                  isActive
                    ? 'bg-amber-900/70 border-amber-500 text-white shadow-inner font-bold'
                    : 'border-transparent text-amber-200/75 hover:bg-black/30 hover:text-amber-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">{stage.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-serif truncate">
                      <span className="font-mono text-[9px] text-amber-400 mr-1">#{stage.number}</span>
                      {stage.title}
                    </div>
                    <div className="text-[9px] text-amber-300/60 truncate font-sans">
                      {stage.subtitle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 ml-1.5 flex items-center">
                  {isCompleted ? (
                    <span className="text-emerald-400 text-xs font-bold" title="Gate Completed">
                      ✓
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-3 h-3 text-amber-400" />
                  ) : null}
                </div>
              </button>
            );
          })}

          {/* Section Divider: Certification */}
          <div className="pt-3 pb-1 px-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/60 font-bold">
              Assessment & Degree
            </span>
          </div>

          {/* Certification Exam Tab */}
          <button
            onClick={() => handleStageSelect('quiz-engine')}
            className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between group border ${
              activeModule === 'quiz-engine'
                ? 'bg-amber-900/60 border-amber-500/80 text-amber-100 shadow-inner'
                : 'border-transparent text-amber-200/80 hover:bg-black/30 hover:text-amber-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🎓</span>
              <div>
                <div className="text-xs font-serif font-bold">Certification Exam</div>
                <div className="text-[10px] text-amber-300/60 font-mono">
                  Best Score: {progress.quizBestScore}%
                </div>
              </div>
            </div>
            {progress.quizBestScore >= 80 && (
              <span className="text-amber-400 text-xs">★</span>
            )}
          </button>
        </div>

        {/* Binder Spine Footer Progress */}
        <div className="p-4 border-t border-amber-950/80 bg-black/30">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-amber-300/80">Curriculum Progress</span>
            <span className="text-amber-300 font-bold">{completionPercentage}%</span>
          </div>

          <div className="w-full skeuo-gauge-track h-2 rounded-full overflow-hidden mb-3">
            <div 
              className="skeuo-gauge-fill h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, completionPercentage)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-amber-400/70 font-mono">
            <span>{progress.completedModules.length} / 10 Gates Mastered</span>
            <button
              onClick={resetAllProgress}
              className="hover:text-red-400 transition-colors"
              title="Reset progress"
            >
              Reset
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
