import React from 'react';
import { 
  Activity, 
  BookOpen, 
  FileCheck2, 
  ShieldAlert, 
  Code2, 
  BarChart3, 
  PhoneForwarded, 
  Headphones, 
  GraduationCap, 
  CheckCircle, 
  ChevronRight,
  X,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { ModuleId } from '../../types/rcm';

interface NavGroup {
  category: string;
  items: {
    id: ModuleId;
    label: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    highlight?: boolean;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    category: '1. Forms Studio',
    items: [
      {
        id: 'claim-forms',
        label: 'Claim Forms Studio',
        badge: 'CMS-1500 & UB-04',
        icon: FileCheck2,
        description: 'All 33 CMS Boxes & 81 UB-04 Locators',
        highlight: true
      }
    ]
  },
  {
    category: '2. RCM Pipeline & Journey',
    items: [
      {
        id: 'dashboard',
        label: 'Revenue Cycle Flow',
        badge: '8 Stages',
        icon: Activity,
        description: 'Interactive Pipeline & Claimy Comic'
      },
      {
        id: 'foundations',
        label: 'RCM Foundations',
        badge: 'Core',
        icon: BookOpen,
        description: 'PR vs CO, Cost-Sharing & Math'
      }
    ]
  },
  {
    category: '3. Coding & Modifiers',
    items: [
      {
        id: 'coding-modifiers',
        label: 'Modifier Masterclass',
        badge: 'High Impact',
        icon: Code2,
        description: 'Modifiers 25, 59, 26, TC, NCCI Edits'
      }
    ]
  },
  {
    category: '4. AR Denials & Payer Lab',
    items: [
      {
        id: 'ar-playbook',
        label: '14-Scenario AR Playbook',
        badge: 'Decision Trees',
        icon: PhoneForwarded,
        description: 'CO-16 to CO-197 Step-by-Step Fixes'
      },
      {
        id: 'call-scripts',
        label: 'Call Scripts & NATO',
        badge: 'Audio TTS',
        icon: Headphones,
        description: 'Live Payer Roleplay & Speech Audio'
      },
      {
        id: 'ar-analytics',
        label: 'AR Aging & 6-Point Note',
        icon: BarChart3,
        description: 'Aging Buckets & Audit Note Builder'
      },
      {
        id: 'insurance-payers',
        label: 'Payers & Birthday Rule',
        icon: ShieldAlert,
        description: 'Medicare A-D, HMO/PPO Coordination'
      }
    ]
  },
  {
    category: '5. Exam & Practice',
    items: [
      {
        id: 'quiz-engine',
        label: 'Certification Exam',
        badge: '40+ MCQs',
        icon: GraduationCap,
        description: 'Practice & Timed Exam Engine'
      }
    ]
  }
];

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

  const handleNavClick = (id: ModuleId) => {
    setActiveModule(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 glass-spatial border-r border-white/60 dark:border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tighter">RC</span>
              </div>
            </div>
            <div>
              <div className="font-black text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                <span>RCM</span>
                <span className="text-emerald-500">claim</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Spatial Billing Studio
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <div className="px-2.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {group.category}
              </div>

              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  const isCompleted = item.id !== 'dashboard' && progress.completedModules.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-all relative group ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30 shadow-xs'
                          : item.highlight
                            ? 'bg-slate-100/70 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/60 dark:border-white/5'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{item.label}</span>
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : item.badge ? (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                              item.highlight 
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                          {item.description}
                        </div>
                      </div>

                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 self-center shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress & Stats */}
        <div className="p-3.5 border-t border-white/60 dark:border-white/10 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center justify-between text-xs mb-1 font-bold">
            <span className="text-slate-700 dark:text-slate-300">Progress</span>
            <span className="text-emerald-500">{completionPercentage}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2.5">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>{progress.completedModules.length} of 8 Completed</span>
            <button
              type="button"
              onClick={resetAllProgress}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-500 transition-colors"
              title="Reset progress to default"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
