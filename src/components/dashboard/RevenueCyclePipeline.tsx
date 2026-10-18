import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  ShieldCheck, 
  FileCode2, 
  FileCheck, 
  Send, 
  Cpu, 
  CreditCard, 
  PhoneCall, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { ModuleId } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';

interface PipelineStage {
  id: number;
  name: string;
  shortName: string;
  ediCode?: string;
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  tat: string;
  description: string;
  keyAction: string;
  pitfalls: string[];
  targetModule: ModuleId;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose';
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    name: '1. Patient Registration & Scheduling',
    shortName: 'Registration',
    icon: UserPlus,
    role: 'Front Desk / Patient Access Specialist',
    tat: 'Day 0 (Pre-Service)',
    description: 'Patient demographic data, primary/secondary insurance cards, photo ID, signed HIPAA Release (Box 12), and Assignment of Benefits (Box 13) captured.',
    keyAction: 'Obtain exact subscriber ID, group number, DOB, and secondary coverage details at intake.',
    pitfalls: ['Name spelling mismatch', 'Missing subscriber DOB', 'Unsigned Assignment of Benefits (check sent to patient)'],
    targetModule: 'foundations',
    color: 'blue'
  },
  {
    id: 2,
    name: '2. Eligibility & Benefits Verification',
    shortName: 'Eligibility',
    ediCode: 'EDI 270 / 271',
    icon: ShieldCheck,
    role: 'Insurance Verification Specialist',
    tat: '48–72 Hrs Pre-Service',
    description: 'Electronic EDI 270 inquiry and 271 response sent to verify active coverage, deductible remaining, copay/coinsurance, and prior authorization needs.',
    keyAction: 'Verify calendar vs plan year deductible, network status, and Birthday Rule if dependent child.',
    pitfalls: ['Policy terminated', 'Pended for premium grace period', 'Missing prior auth for specialist imaging'],
    targetModule: 'insurance-payers',
    color: 'emerald'
  },
  {
    id: 3,
    name: '3. Medical Coding & Charge Capture',
    shortName: 'Coding',
    icon: FileCode2,
    role: 'Certified Professional Coder (CPC / CCS)',
    tat: '24–48 Hrs Post-DOS',
    description: 'Translating clinical physician notes and operative reports into standardized CPT (5-digit), HCPCS Level II, ICD-10-CM diagnosis codes, and necessary modifiers.',
    keyAction: 'Ensure LCD/NCD medical necessity linkage and append appropriate modifiers (25, 59, RT/LT, 76).',
    pitfalls: ['Truncated ICD-10 codes', 'Unbundled procedures (CO-97)', 'Omitted Modifier 25 on same-day E&M'],
    targetModule: 'coding-modifiers',
    color: 'purple'
  },
  {
    id: 4,
    name: '4. Claim Scrubbing & Rules Engine',
    shortName: 'Scrubbing',
    icon: FileCheck,
    role: 'Billing Specialist / AI Scrubber',
    tat: 'Real-Time / 12 Hrs',
    description: 'Internal rules engine validating claim against CMS NCCI Procedure-to-Procedure (PTP) edits, Medically Unlikely Edits (MUE), CLIA lab numbers, and payer-specific rules.',
    keyAction: 'Halt flawed claims before transmission to prevent costly external clearinghouse rejections.',
    pitfalls: ['PO Box in Box 32 service facility', 'Missing rendering NPI in Box 24J', 'Missing Box 23 CLIA number'],
    targetModule: 'claim-forms',
    color: 'amber'
  },
  {
    id: 5,
    name: '5. Clearinghouse Transmission',
    shortName: 'Clearinghouse',
    ediCode: 'EDI 837P / 837I',
    icon: Send,
    role: 'EDI Specialist / Clearinghouse Gateway',
    tat: 'Daily (Batch Transmission)',
    description: 'Clearinghouse converts claim into HIPAA-compliant ASC X12 837 format, performs Level 1/2 EDI validation, and returns 999 and 277CA acceptance reports.',
    keyAction: 'Monitor 277CA acceptance report to establish Proof of Timely Filing (POTF).',
    pitfalls: ['Payer ID misroute', 'Clearinghouse front-end rejection left unworked in queue', 'Expired TFL clock'],
    targetModule: 'ar-playbook',
    color: 'blue'
  },
  {
    id: 6,
    name: '6. Payer Adjudication Engine',
    shortName: 'Adjudication',
    ediCode: 'EDI 276 / 277',
    icon: Cpu,
    role: 'Insurance Claims Examiner / AI Auto-Adjudicator',
    tat: '14–30 Days',
    description: 'Payer adjudication software checks member eligibility, applies contracted fee schedule, verifies prior auth, and calculates PR (PR-1, PR-2, PR-3) vs CO-45 write-offs.',
    keyAction: 'Clean claims pass straight through without manual examiner touch (First Pass Resolution).',
    pitfalls: ['Pended for medical records (CO-16)', 'Suspended for member COB update (CO-22)', 'Denied CO-197'],
    targetModule: 'ar-playbook',
    color: 'rose'
  },
  {
    id: 7,
    name: '7. Payment Posting & Reconciliation',
    shortName: 'Posting',
    ediCode: 'EDI 835 (ERA) / EOB',
    icon: CreditCard,
    role: 'Payment Poster / Cash Applications',
    tat: '24–48 Hrs from Deposit',
    description: 'Electronic Remittance Advice (835 ERA) auto-posted to patient ledgers, balancing EFT bank deposits, posting CO-45 adjustments, and identifying payer recoupment offsets.',
    keyAction: 'Cross-verify uncashed checks and cross-post historical offset clawbacks.',
    pitfalls: ['Unposted bulk EFT payments', 'Failure to secondary-bill cross-over claims', 'Misallocated PR balances'],
    targetModule: 'foundations',
    color: 'emerald'
  },
  {
    id: 8,
    name: '8. AR Denial Management & Appeals',
    shortName: 'AR Follow-Up',
    icon: PhoneCall,
    role: 'Accounts Receivable (AR) Follow-up Specialist',
    tat: '30–120+ Days Aging',
    description: 'Working unpaid, pended, and denied claims. Calling insurance reps, executing 14 denial workflows, preparing timely filing appeals, and submitting corrected claims.',
    keyAction: 'Capture 6-point audit note with Call Reference # and Rep Name on every phone encounter.',
    pitfalls: ['Untimely filing (CO-29)', 'Accepting verbal refusal without appeal', 'Billing CO codes to in-network patients'],
    targetModule: 'ar-playbook',
    color: 'rose'
  }
];

export const RevenueCyclePipeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const { setActiveModule } = useAcademy();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStageId(prev => (prev < PIPELINE_STAGES.length ? prev + 1 : 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStage = PIPELINE_STAGES.find(s => s.id === activeStageId) || PIPELINE_STAGES[0];

  return (
    <div className="w-full bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-health-electric/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-health-electric/10 text-health-electric border border-health-electric/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Lifecycle Architecture
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            The Complete US Healthcare Revenue Cycle Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
            Watch a healthcare claim travel from Patient Registration to Clean Payment Posting or AR Denial Follow-Up
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-500" />
                <span>Pause Flow</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Auto-Play Flow</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveStageId(1)}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Restart flow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Step-by-Step Flow Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
        {PIPELINE_STAGES.map(stage => {
          const Icon = stage.icon;
          const isCurrent = stage.id === activeStageId;
          const isPassed = stage.id < activeStageId;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setActiveStageId(stage.id);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-2xl text-left transition-all relative flex flex-col justify-between h-28 border ${
                isCurrent
                  ? 'bg-health-electric/15 border-health-electric dark:border-health-electric shadow-md shadow-health-electric/15 ring-2 ring-health-electric/30'
                  : isPassed
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-health-darkSubtle/30 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-xl ${
                  isCurrent
                    ? 'bg-health-electric text-white'
                    : isPassed
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  #{stage.id}
                </span>
              </div>

              <div>
                <div className={`text-xs font-bold truncate ${isCurrent ? 'text-health-electric dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {stage.shortName}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate mt-0.5">
                  {stage.ediCode || stage.tat}
                </div>
              </div>

              {/* Active Step Indicator Pulse */}
              {isCurrent && (
                <motion.div
                  layoutId="activePipelineIndicator"
                  className="absolute -bottom-1 left-4 right-4 h-1 bg-health-electric rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* In-Depth Stage Breakdown Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-50 dark:bg-health-darkSubtle/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Left detail */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-health-electric/10 text-health-electric border border-health-electric/20">
                  STAGE {currentStage.id} OF 8
                </span>
                {currentStage.ediCode && (
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {currentStage.ediCode} Standard
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">
                  • TAT: <strong className="text-slate-700 dark:text-slate-200">{currentStage.tat}</strong>
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentStage.name}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStage.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Core Action Required: </span>
                <span className="text-slate-600 dark:text-slate-300">{currentStage.keyAction}</span>
              </div>
            </div>

            {/* Right Meta & Pitfalls */}
            <div className="lg:w-80 shrink-0 space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Responsible Role</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    {currentStage.role}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-rose-500 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Critical Pitfalls to Avoid:
                  </div>
                  <ul className="mt-1 space-y-1 text-xs text-slate-800 dark:text-slate-200 list-disc list-inside">
                    {currentStage.pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModule(currentStage.targetModule)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-health-electric text-white text-xs font-bold hover:bg-health-electricDark transition-colors shadow-sm"
              >
                <span>Study Related Academy Module</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
