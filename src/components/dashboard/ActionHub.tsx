import React from 'react';
import { 
  BookOpen, 
  FileCheck2, 
  ShieldAlert, 
  Code2, 
  BarChart3, 
  PhoneForwarded, 
  Headphones, 
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { ModuleId } from '../../types/rcm';

interface ModuleCardInfo {
  id: ModuleId;
  number: number;
  title: string;
  subtitle: string;
  topics: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const MODULE_CARDS: ModuleCardInfo[] = [
  {
    id: 'foundations',
    number: 1,
    title: 'RCM Foundations & Financial Mechanics',
    subtitle: 'Master deductibles, coinsurance, PR vs CO codes, capitation, payer offsets, and HIPAA rules.',
    topics: ['PR-1 Deductible', 'CO-45 Write-Offs', 'Payer Offsets', 'NPI / TIN / CLIA'],
    icon: BookOpen,
    accentColor: 'from-blue-500/20 to-sky-500/10'
  },
  {
    id: 'claim-forms',
    number: 2,
    title: 'Claim Forms Explorer (CMS-1500 & UB-04)',
    subtitle: 'Interactive visual hotspots comparing Professional (837P) vs Facility Hospital (837I) billing.',
    topics: ['Box 12/13 Signatures', 'Box 22 Resubmission', 'Revenue Codes', 'Occurrence Codes'],
    icon: FileCheck2,
    accentColor: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'insurance-payers',
    number: 3,
    title: 'US Insurance Ecosystem & Medicare',
    subtitle: 'Medicare Parts A–D, 3-way Advantage vs Medigap matrix, Medicaid spenddown & Birthday Rule.',
    topics: ['Medicare Advantage (Part C)', 'MSP Codes 12–15', 'Birthday Rule Calculator', '72-Hour Rule'],
    icon: ShieldAlert,
    accentColor: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'coding-modifiers',
    number: 4,
    title: 'Medical Coding & Modifier Masterclass',
    subtitle: 'Deep clinical case studies on Modifiers 25, 59, 76, 77, 91, RT/LT, OU vs 50, and NCCI X{EPSU}.',
    topics: ['Modifier 25 vs 59', 'Repeat Modifiers 76/77', 'Lab Repeat 91', 'NCCI Subset Modifiers'],
    icon: Code2,
    accentColor: 'from-purple-500/20 to-pink-500/10'
  },
  {
    id: 'ar-analytics',
    number: 5,
    title: 'AR Analytics, KPIs & Note Documentation',
    subtitle: 'Days in AR gauges, Clean Claim Rate formulas, aging bucket priority & 6-point audit note sandbox.',
    topics: ['Days in AR (< 40 Days)', 'Denial Reduction List', 'Aging Buckets 0-120+', 'AR Note Builder'],
    icon: BarChart3,
    accentColor: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'ar-playbook',
    number: 6,
    title: '14-Scenario AR Call & Denial Playbook',
    subtitle: 'Complete step-by-step resolution decision trees and verbatim rep call questions for top denials.',
    topics: ['Claim Not on File (CNOF)', 'Timely Filing (CO-29)', 'Prior Auth (CO-197)', '4-Tier Appeals'],
    icon: PhoneForwarded,
    accentColor: 'from-rose-500/20 to-red-500/10'
  },
  {
    id: 'call-scripts',
    number: 7,
    title: 'Live Call Scripts & NATO Phonetic Trainer',
    subtitle: 'Interactive A–Z NATO alphabet, speech synthesis ID converter, and dynamic telephonic roleplay.',
    topics: ['Full GPD Script', 'Fast-Track AR Script', 'Speech Pronunciation', 'ER Inpatient Precert'],
    icon: Headphones,
    accentColor: 'from-indigo-500/20 to-violet-500/10'
  },
  {
    id: 'quiz-engine',
    number: 8,
    title: 'Gamified Certification Exam & Quiz Engine',
    subtitle: '40+ MCQs spanning all domains with instant rationale mode and timed certification exam mode.',
    topics: ['Practice Mode', 'Timed Exam Mode', 'Category Score Cards', 'Completion Certificate'],
    icon: GraduationCap,
    accentColor: 'from-emerald-500/20 to-green-500/10'
  }
];

export const ActionHub: React.FC = () => {
  const { setActiveModule, progress, markModuleCompleted } = useAcademy();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Curriculum Modules & Interactive Labs
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Select any module to start learning or click checkmarks to track completed topics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MODULE_CARDS.map(mod => {
          const Icon = mod.icon;
          const isDone = progress.completedModules.includes(mod.id);

          return (
            <div
              key={mod.id}
              className="bg-white dark:bg-health-darkCard rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-health-electric/50 transition-all shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${mod.accentColor} flex items-center justify-center text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50`}>
                    <Icon className="w-5 h-5 text-health-electric" />
                  </div>

                  <button
                    type="button"
                    onClick={() => markModuleCompleted(mod.id)}
                    title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isDone
                        ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px]">{isDone ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                <div className="text-[10px] font-bold text-health-electric uppercase tracking-wider mb-1">
                  Module {mod.number}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-health-electric transition-colors line-clamp-1">
                  {mod.title}
                </h4>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed mb-4">
                  {mod.subtitle}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mod.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModule(mod.id)}
                className="w-full flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-health-electric transition-colors"
              >
                <span>Launch Interactive Module</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
