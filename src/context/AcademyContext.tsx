import React, { createContext, useContext, useState, useEffect } from 'react';
import { ModuleId, StageId, UserProgress, ArNoteData } from '../types/rcm';

interface AcademyContextType {
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId, targetId?: string) => void;
  targetScrollId: string | null;
  setTargetScrollId: (id: string | null) => void;
  
  isDark: boolean;
  toggleTheme: () => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  progress: UserProgress;
  markModuleCompleted: (moduleId: string) => void;
  toggleBookmarkDenial: (code: string) => void;
  toggleBookmarkModifier: (code: string) => void;
  toggleBookmarkTerm: (termId: string) => void;
  saveQuizScore: (score: number, total: number, mode: 'practice' | 'exam') => void;
  saveArNote: (note: Omit<ArNoteData, 'id' | 'createdAt'>) => void;
  deleteArNote: (id: string) => void;
  resetAllProgress: () => void;
  
  completionPercentage: number;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  bookmarkedDenials: ['CO-16', 'CO-29', 'CO-197'],
  bookmarkedModifiers: ['25', '59'],
  bookmarkedTerms: ['contractual-adjustment-co45'],
  quizBestScore: 0,
  quizHistory: [],
  savedNotes: [
    {
      id: 'sample-note-1',
      date: '2025-02-20',
      repName: 'Sarah Jenkins',
      callRef: 'REF-789021-BCBS',
      claimNumber: 'ICN-202501140089',
      patientName: 'Eleanor Vance',
      dos: '2025-01-15',
      billedAmount: '240.00',
      status: 'Paid / Underpayment Review',
      actionTaken: 'Rep confirmed allowed amount $150.00, paid $120.00 via EFT trace #ACH-99824. $30.00 assigned to PR-2 (20% coinsurance). Billed patient balance.',
      nextFollowUpDate: '2025-03-20',
      createdAt: new Date().toISOString()
    }
  ]
};

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'rcmclaim_progress_v3';
const THEME_STORAGE_KEY = 'rcmclaim_theme';

const LEGACY_TO_STAGE: Record<string, StageId> = {
  'foundations': 'appointment',
  'insurance-payers': 'eligibility',
  'claim-forms': 'claim-submission',
  'coding-modifiers': 'coding',
  'ar-analytics': 'payment-posting',
  'ar-playbook': 'ar-followup',
  'call-scripts': 'ar-followup',
};

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModuleState] = useState<ModuleId>('dashboard');
  const [targetScrollId, setTargetScrollId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Permanent Dark Mode: Academy runs in full dark leather study mode
  const [isDark] = useState<boolean>(true);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user progress', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Ensure documentElement has dark class on load
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } catch (e) {}
  }, []);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save user progress', e);
    }
  }, [progress]);

  // Global keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dark mode is permanent - toggleTheme is a no-op
  const toggleTheme = () => {};

  const setActiveModule = (module: ModuleId, targetId?: string) => {
    const target = (LEGACY_TO_STAGE[module] || module) as ModuleId;
    setActiveModuleState(target);
    if (targetId) {
      setTargetScrollId(targetId);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markModuleCompleted = (moduleId: string) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) {
        return {
          ...prev,
          completedModules: prev.completedModules.filter(id => id !== moduleId)
        };
      } else {
        return {
          ...prev,
          completedModules: [...prev.completedModules, moduleId]
        };
      }
    });
  };

  const toggleBookmarkDenial = (code: string) => {
    setProgress(prev => {
      const exists = prev.bookmarkedDenials.includes(code);
      return {
        ...prev,
        bookmarkedDenials: exists 
          ? prev.bookmarkedDenials.filter(c => c !== code)
          : [...prev.bookmarkedDenials, code]
      };
    });
  };

  const toggleBookmarkModifier = (code: string) => {
    setProgress(prev => {
      const exists = prev.bookmarkedModifiers.includes(code);
      return {
        ...prev,
        bookmarkedModifiers: exists
          ? prev.bookmarkedModifiers.filter(c => c !== code)
          : [...prev.bookmarkedModifiers, code]
      };
    });
  };

  const toggleBookmarkTerm = (termId: string) => {
    setProgress(prev => {
      const exists = prev.bookmarkedTerms.includes(termId);
      return {
        ...prev,
        bookmarkedTerms: exists
          ? prev.bookmarkedTerms.filter(t => t !== termId)
          : [...prev.bookmarkedTerms, termId]
      };
    });
  };

  const saveQuizScore = (score: number, total: number, mode: 'practice' | 'exam') => {
    const percentage = Math.round((score / total) * 100);
    setProgress(prev => ({
      ...prev,
      quizBestScore: Math.max(prev.quizBestScore, percentage),
      quizHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          score,
          total,
          mode
        },
        ...prev.quizHistory.slice(0, 9)
      ]
    }));
  };

  const saveArNote = (noteData: Omit<ArNoteData, 'id' | 'createdAt'>) => {
    const newNote: ArNoteData = {
      ...noteData,
      id: 'note_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setProgress(prev => ({
      ...prev,
      savedNotes: [newNote, ...prev.savedNotes]
    }));
  };

  const deleteArNote = (id: string) => {
    setProgress(prev => ({
      ...prev,
      savedNotes: prev.savedNotes.filter(n => n.id !== id)
    }));
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset your academy progress, quiz scores, and saved notes?')) {
      setProgress(DEFAULT_PROGRESS);
    }
  };

  // 10 RCM pipeline stages total
  const totalCoreModules = 10;
  const completionPercentage = Math.round((progress.completedModules.length / totalCoreModules) * 100);

  return (
    <AcademyContext.Provider
      value={{
        activeModule,
        setActiveModule,
        targetScrollId,
        setTargetScrollId,
        isDark,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        progress,
        markModuleCompleted,
        toggleBookmarkDenial,
        toggleBookmarkModifier,
        toggleBookmarkTerm,
        saveQuizScore,
        saveArNote,
        deleteArNote,
        resetAllProgress,
        completionPercentage
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
