import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  Bookmark, 
  Sparkles, 
  Award,
  FileCheck2,
  Activity,
  Code2,
  PhoneForwarded,
  GraduationCap
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { ModuleId } from '../../types/rcm';

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
    isDark, 
    toggleTheme, 
    setIsSearchOpen, 
    completionPercentage, 
    progress,
    activeModule,
    setActiveModule
  } = useAcademy();

  const totalBookmarks = progress.bookmarkedDenials.length + progress.bookmarkedModifiers.length + progress.bookmarkedTerms.length;

  // Determine current active high-level category
  const getCurrentCategory = (): 'forms' | 'pipeline' | 'coding' | 'ar-lab' | 'exam' => {
    if (activeModule === 'claim-forms') return 'forms';
    if (activeModule === 'dashboard' || activeModule === 'foundations') return 'pipeline';
    if (activeModule === 'coding-modifiers') return 'coding';
    if (activeModule === 'quiz-engine') return 'exam';
    return 'ar-lab';
  };

  const activeCategory = getCurrentCategory();

  const handleCategoryClick = (cat: 'forms' | 'pipeline' | 'coding' | 'ar-lab' | 'exam') => {
    switch (cat) {
      case 'forms':
        setActiveModule('claim-forms');
        break;
      case 'pipeline':
        setActiveModule('dashboard');
        break;
      case 'coding':
        setActiveModule('coding-modifiers');
        break;
      case 'ar-lab':
        setActiveModule('ar-playbook');
        break;
      case 'exam':
        setActiveModule('quiz-engine');
        break;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass-spatial border-b border-white/60 dark:border-white/10 px-3 sm:px-5 lg:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => setActiveModule('dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-tighter">RC</span>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">RCM</span>
            <span className="text-base font-black tracking-tight text-emerald-500">claim</span>
            <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Spatial
            </span>
          </div>
        </div>
      </div>

      {/* Center: Spatial Desktop Category Switcher Capsule */}
      <div className="hidden xl:flex items-center bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-white/40 dark:border-white/10 shadow-xs backdrop-blur-md">
        <button
          type="button"
          onClick={() => handleCategoryClick('forms')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'forms'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Claim Forms</span>
          <span className="text-[10px] px-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">1500/UB</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryClick('pipeline')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'pipeline'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>RCM Pipeline</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryClick('coding')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'coding'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Coding & Modifiers</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryClick('ar-lab')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'ar-lab'
              ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <PhoneForwarded className="w-3.5 h-3.5" />
          <span>AR Denials Lab</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryClick('exam')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'exam'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Exam Hub</span>
        </button>
      </div>

      {/* Right Actions: Search trigger, Quick Tools, Bookmarks, Theme */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Search Modal Trigger */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 hover:border-emerald-500/40 transition-all shadow-xs group"
          title="Search anything (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span className="hidden md:inline text-[11px] truncate max-w-[130px]">Search boxes, codes...</span>
          <kbd className="hidden sm:inline-flex items-center font-mono text-[9px] bg-white dark:bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Quick Tools */}
        <button
          type="button"
          onClick={onOpenQuickTools}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tools</span>
        </button>

        {/* Bookmarks Counter */}
        <button
          type="button"
          onClick={onOpenBookmarks}
          className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-xs font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="Saved Bookmarks"
        >
          <Bookmark className="w-4 h-4 text-amber-500" />
          {totalBookmarks > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
              {totalBookmarks}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Progress Pill */}
        <div className="hidden 2xl:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Progress</div>
            <div className="text-xs font-black text-slate-800 dark:text-slate-100">{completionPercentage}%</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
};
