import React from 'react';
import { Search, Sun, Moon, Menu, Bookmark, Sparkles, Award } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

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
  const { isDark, toggleTheme, setIsSearchOpen, completionPercentage, progress } = useAcademy();
  const totalBookmarks = progress.bookmarkedDenials.length + progress.bookmarkedModifiers.length + progress.bookmarkedTerms.length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-health-darkBg/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Interactive Learning Sandbox
          </span>
        </div>
      </div>

      {/* Center: Global Search Bar trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-health-darkCard text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-health-electric/50 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-health-electric transition-colors" />
            <span className="truncate">Search CO codes, modifiers, CMS-1500 boxes...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] bg-white dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 shadow-xs">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Tools Button */}
        <button
          type="button"
          onClick={onOpenQuickTools}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-health-electric/10 hover:bg-health-electric/20 text-health-electric font-medium text-xs border border-health-electric/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Tools</span>
        </button>

        {/* Bookmarks Counter Button */}
        <button
          type="button"
          onClick={onOpenBookmarks}
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="Saved Bookmarks"
        >
          <Bookmark className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Bookmarks</span>
          {totalBookmarks > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
              {totalBookmarks}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Progress Pill */}
        <div className="hidden xl:flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Progress</div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{completionPercentage}% Completed</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
