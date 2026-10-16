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
  RotateCcw
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { ModuleId } from '../../types/rcm';

interface NavItem {
  id: ModuleId;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview & Pipeline',
    icon: Activity,
    description: 'Animated Revenue Cycle Flow'
  },
  {
    id: 'foundations',
    label: '1. RCM Foundations',
    badge: 'Core',
    icon: BookOpen,
    description: 'PR vs CO, 3D Flashcards, Math'
  },
  {
    id: 'claim-forms',
    label: '2. Claim Forms Explorer',
    badge: 'Visual Map',
    icon: FileCheck2,
    description: 'CMS-1500 & UB-04 Hotspots'
  },
  {
    id: 'insurance-payers',
    label: '3. US Insurance & Medicare',
    badge: 'Rules',
    icon: ShieldAlert,
    description: 'Medicare A-D, HMO/PPO, Birthday Rule'
  },
  {
    id: 'coding-modifiers',
    label: '4. Modifier Masterclass',
    badge: 'High Impact',
    icon: Code2,
    description: 'Modifiers 25, 59, 76, 77, 91, NCCI'
  },
  {
    id: 'ar-analytics',
    label: '5. AR Analytics & Aging',
    icon: BarChart3,
    description: 'KPI Gauges, Buckets & Note Builder'
  },
  {
    id: 'ar-playbook',
    label: '6. 14-Scenario AR Playbook',
    badge: '14 Scenarios',
    icon: PhoneForwarded,
    description: 'Decision Trees, CO-16 to CO-197'
  },
  {
    id: 'call-scripts',
    label: '7. Call Scripts & NATO',
    badge: 'Speech Audio',
    icon: Headphones,
    description: 'GPD Roleplay & NATO Converter'
  },
  {
    id: 'quiz-engine',
    label: '8. Certification Quiz',
    badge: '40+ MCQs',
    icon: GraduationCap,
    description: 'Practice & Timed Exam Engine'
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
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white dark:bg-health-darkCard border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-health-electricDark to-health-electric flex items-center justify-center text-white shadow-md shadow-health-electric/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                RCM & AR Academy
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                US Healthcare Billing
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

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Academy Modules
          </div>

          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            const isCompleted = item.id !== 'dashboard' && progress.completedModules.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl text-xs transition-all relative group ${
                  isActive
                    ? 'bg-health-electric/10 text-health-electric font-semibold border border-health-electric/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isActive
                    ? 'bg-health-electric text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate">{item.label}</span>
                    {isCompleted ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : item.badge ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5 font-medium">
                    {item.description}
                  </div>
                </div>

                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-health-electric self-center shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Progress & Stats */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-health-darkSubtle/30">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-300">Curriculum Progress</span>
            <span className="text-emerald-500 font-bold">{completionPercentage}%</span>
          </div>

          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-health-electric to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
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
