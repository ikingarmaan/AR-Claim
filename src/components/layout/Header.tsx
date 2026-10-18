import React from 'react';
import { 
  Search, 
  Menu, 
  Bookmark, 
  Award,
  GraduationCap,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { RCM_STAGES, StageId } from '../../types/rcm';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenBookmarks: () => void;
  onOpenQuickTools: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleMobileSidebar, 
  onOpenBookmarks,
  onOpenQuickTools
}) => {
  const { 
    setIsSearchOpen, 
    completionPercentage, 
    progress,
    activeModule,
    setActiveModule
  } = useAcademy();

  const totalBookmarks = progress.bookmarkedDenials.length + progress.bookmarkedModifiers.length + progress.bookmarkedTerms.length;

  const currentStage = RCM_STAGES.find(s => s.id === activeModule);

  return (
    <header className="sticky top-0 z-30 h-16 skeuo-leather text-amber-100 border-b border-amber-950/80 shadow-md px-3 sm:px-6 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-amber-200 hover:bg-black/30 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo with Brass Plaque styling */}
        <div 
          onClick={() => setActiveModule('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-skeuo-raised border-2 border-amber-400/60 group-hover:scale-105 transition-transform flex items-center justify-center bg-stone-950 shrink-0">
            <img 
              src="/rcmclaim-logo.png" 
              alt="RCMclaim Seal Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-lg font-serif font-black tracking-tight text-amber-200 drop-shadow">RCM</span>
              <span className="text-lg font-serif font-black tracking-tight text-amber-400 drop-shadow">claim</span>
              <span className="ml-2 hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded bg-amber-950/80 text-amber-300 border border-amber-600/50">
                Skeuomorphic Edition
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-amber-200 font-medium hidden sm:inline-block -mt-1">
              US Healthcare Revenue Cycle Academy
            </span>
          </div>
        </div>
      </div>

      {/* Center: Active Stage Badge on larger screens */}
      <div className="hidden xl:flex items-center gap-2">
        {currentStage ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-amber-900/60 shadow-inner">
            <span className="text-sm">{currentStage.icon}</span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              GATE {currentStage.number}:
            </span>
            <span className="text-xs font-serif font-bold text-amber-100">
              {currentStage.title}
            </span>
          </div>
        ) : activeModule === 'mind-map' ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-amber-900/60 shadow-inner">
            <span className="text-sm">🧠</span>
            <span className="text-xs font-serif font-bold text-amber-100">
              Dynamic RCM Mind Map
            </span>
          </div>
        ) : activeModule === 'quiz-engine' ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-amber-900/60 shadow-inner">
            <span className="text-sm">🎓</span>
            <span className="text-xs font-serif font-bold text-amber-100">
              Certification Exam Engine
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-amber-900/60 shadow-inner">
            <span className="text-sm">🏛️</span>
            <span className="text-xs font-serif font-bold text-amber-100">
              Executive Dashboard
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Physical Search Bar Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="skeuo-inset flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/40 border border-amber-900/80 text-amber-300/80 hover:text-amber-100 text-xs font-mono transition-all group"
          title="Search RCMclaim (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-amber-200/90">Search codes & boxes...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] rounded bg-black/60 text-amber-400 border border-amber-800">
            ⌘K
          </kbd>
        </button>

        {/* Physical Gauge Progress Indicator */}
        <div 
          onClick={() => setActiveModule('dashboard')}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-amber-900/80 cursor-pointer hover:bg-black/60 transition-colors"
          title={`${completionPercentage}% of pipeline completed`}
        >
          <div className="w-16 skeuo-gauge-track h-2 rounded-full overflow-hidden">
            <div 
              className="skeuo-gauge-fill h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, completionPercentage)}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">
            {completionPercentage}%
          </span>
        </div>

        {/* Bookmarks Drawer Button */}
        <button
          onClick={onOpenBookmarks}
          className="relative p-2 rounded-lg bg-black/30 border border-amber-900/70 text-amber-200 hover:text-white hover:bg-black/50 transition-all"
          title="Open Saved Notes & Bookmarks"
        >
          <Bookmark className="w-4 h-4" />
          {totalBookmarks > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] font-mono font-bold text-white flex items-center justify-center border border-amber-300">
              {totalBookmarks}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
