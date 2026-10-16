import React, { useState } from 'react';
import { 
  Calculator, 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  DollarSign,
  FileSpreadsheet,
  Info
} from 'lucide-react';
import { TERMINOLOGY_DATA } from '../../data/terminology';
import { FlipCard } from '../common/FlipCard';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';
import { CartoonTip } from '../common/CartoonTip';

export const Module1Foundations: React.FC = () => {
  const { progress, markModuleCompleted } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Interactive RCM Math Calculator State
  const [calcBilled, setCalcBilled] = useState<number>(450);
  const [calcAllowed, setCalcAllowed] = useState<number>(200);
  const [calcDeductibleRemaining, setCalcDeductibleRemaining] = useState<number>(50);
  const [calcCoinsurancePercent, setCalcCoinsurancePercent] = useState<number>(20);
  const [calcCopay, setCalcCopay] = useState<number>(0);

  const isCompleted = progress.completedModules.includes('foundations');

  // Adjudication Math Engine
  const contractualAdjustment = Math.max(0, calcBilled - calcAllowed); // CO-45 write-off
  const deductibleApplied = Math.min(calcAllowed, calcDeductibleRemaining);
  const remainingAfterDeductible = Math.max(0, calcAllowed - deductibleApplied);
  
  // Coinsurance on remaining allowed amount
  const coinsurancePatient = (remainingAfterDeductible * calcCoinsurancePercent) / 100;
  const insuranceBasePayment = remainingAfterDeductible - coinsurancePatient;
  
  // Apply copay if applicable
  const insuranceFinalPayment = Math.max(0, insuranceBasePayment - calcCopay);
  const totalPatientResponsibility = deductibleApplied + coinsurancePatient + calcCopay;

  const categories = [
    { id: 'all', label: 'All Core Concepts' },
    { id: 'cost-sharing', label: 'Patient Cost-Sharing (PR)' },
    { id: 'financial', label: 'Financial & Billing Mechanics' },
    { id: 'compliance', label: 'Compliance & Legal' },
    { id: 'identifiers', label: 'Provider Identifiers' }
  ];

  const filteredTerms = TERMINOLOGY_DATA.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchFilter === '' || 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleMarkComplete = () => {
    markModuleCompleted('foundations');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-health-darkCard to-health-darkCard border border-blue-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Module 1 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              RCM Foundations & Core Terminology
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Master the financial, contractual, and regulatory building blocks of US healthcare claims: cost-sharing rules (PR codes), fee schedules, contractual obligations (CO-45), provider identifiers, and HIPAA standards.
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkComplete}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 self-start sm:self-auto ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{isCompleted ? 'Module Completed!' : 'Mark Module Done'}</span>
          </button>
        </div>
      </div>

      {/* Mascot Mentor Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CartoonTip
          mood="happy"
          type="green-tip"
          title="In-Network Fee Schedule Rule (CO-45)"
          message="Participating providers agree to accept the Allowed Amount ($200 in the simulator below). You must write off the remaining $250 as CO-45 and NEVER bill this difference to in-network patients!"
        />
        <CartoonTip
          mood="denied"
          type="red-warning"
          title="No Surprises Act Balance Billing Trap"
          message="Balance billing a patient for contractual adjustments (CO-45) or emergency out-of-network care violates federal law with civil monetary penalties up to $10,000 per violation!"
        />
      </div>

      {/* Flagship Interactive Feature: Real-Time RCM Math & Adjudication Calculator */}
      <div className="bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-health-electric/10 text-health-electric border border-health-electric/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Interactive Claim Adjudication & Math Simulator
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Experiment with real-world financial figures to see how Allowed Amounts, CO-45 write-offs, and PR cost-sharing calculate on an ERA/EOB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Inputs Section */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 dark:bg-health-darkSubtle/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Billing & Contract Parameters</span>
                <button
                  type="button"
                  onClick={() => {
                    setCalcBilled(450);
                    setCalcAllowed(200);
                    setCalcDeductibleRemaining(50);
                    setCalcCoinsurancePercent(20);
                    setCalcCopay(0);
                  }}
                  className="text-[10px] text-health-electric hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Defaults
                </button>
              </div>

              {/* Billed Amount */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">1. Gross Billed Amount (Provider Charge)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">${calcBilled}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={2500}
                  step={25}
                  value={calcBilled}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setCalcBilled(val);
                    if (calcAllowed > val) setCalcAllowed(val);
                  }}
                  className="w-full accent-health-electric cursor-pointer"
                />
              </div>

              {/* Allowed Amount */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">2. Contracted Allowed Amount (Payer Fee Schedule)</span>
                  <span className="font-mono font-bold text-emerald-500">${calcAllowed}</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={calcBilled}
                  step={25}
                  value={calcAllowed}
                  onChange={e => setCalcAllowed(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Deductible Remaining */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">3. Patient Deductible Remaining</span>
                  <span className="font-mono font-bold text-amber-500">${calcDeductibleRemaining}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={calcDeductibleRemaining}
                  onChange={e => setCalcDeductibleRemaining(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Coinsurance Percentage */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">4. Coinsurance Split (% Patient Pays)</span>
                  <span className="font-mono font-bold text-purple-400">{calcCoinsurancePercent}% (Payer: {100 - calcCoinsurancePercent}%)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[0, 10, 20, 30].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setCalcCoinsurancePercent(pct)}
                      className={`py-1 rounded-lg text-xs font-bold border transition-colors ${
                        calcCoinsurancePercent === pct
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Copay */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">5. Fixed Copay (if applicable)</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">${calcCopay}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[0, 20, 35, 50].map(cp => (
                    <button
                      key={cp}
                      type="button"
                      onClick={() => setCalcCopay(cp)}
                      className={`py-1 rounded-lg text-xs font-bold border transition-colors ${
                        calcCopay === cp
                          ? 'bg-health-electric text-white border-health-electric'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      ${cp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Adjudication Outcome Waterfall */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-mono text-slate-400">835 ERA REMITTANCE ADVICE BREAKDOWN</span>
                <span className="text-emerald-400 font-bold">100% Balanced</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Billed Charge:</span>
                  <span className="font-mono font-bold text-sm text-slate-200">${calcBilled.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-[10px] font-mono">CO-45</span>
                    Contractual Adjustment (Write-Off):
                  </span>
                  <span className="font-mono font-bold text-sm">-${contractualAdjustment.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800/80">
                  <span className="font-bold">Total Contractual Allowed Amount:</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">${calcAllowed.toFixed(2)}</span>
                </div>

                {/* Patient Responsibility Breakdown */}
                <div className="pl-4 border-l-2 border-amber-500/40 space-y-1.5 py-1 text-slate-400">
                  {deductibleApplied > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-[10px] text-amber-400 font-mono">PR-1</span>
                        Patient Deductible:
                      </span>
                      <span className="font-mono text-amber-400">${deductibleApplied.toFixed(2)}</span>
                    </div>
                  )}

                  {coinsurancePatient > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-[10px] text-amber-400 font-mono">PR-2</span>
                        Patient Coinsurance ({calcCoinsurancePercent}%):
                      </span>
                      <span className="font-mono text-amber-400">${coinsurancePatient.toFixed(2)}</span>
                    </div>
                  )}

                  {calcCopay > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-[10px] text-amber-400 font-mono">PR-3</span>
                        Patient Copay:
                      </span>
                      <span className="font-mono text-amber-400">${calcCopay.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Final Two Net Buckets */}
                <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Insurance Net Payment</div>
                    <div className="text-xl font-mono font-black text-emerald-400 mt-0.5">
                      ${insuranceFinalPayment.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">EFT Check to Provider</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Patient Responsibility (PR)</div>
                    <div className="text-xl font-mono font-black text-amber-400 mt-0.5">
                      ${totalPatientResponsibility.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Bill to Subscriber</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Crucial Balance Billing Warning */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-700 dark:text-rose-300">
                <span className="font-bold">CRITICAL BALANCE BILLING RULE: </span>
                As an in-network provider, you CANNOT bill the <span className="font-mono font-bold">${contractualAdjustment.toFixed(2)}</span> CO-45 write-off to the patient! Doing so violates federal law (No Surprises Act) and insurance contracts. Bill the patient strictly for their verified PR amount of <span className="font-mono font-bold">${totalPatientResponsibility.toFixed(2)}</span>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcards Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3D Flip Flashcards & Terminology Deep Dives
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Click any card to flip in 3D and uncover real-world clinical examples, calculation formulas, and compliance rules
            </p>
          </div>

          {/* Search in terms */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Search concepts or codes..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-health-electric text-white shadow-xs'
                  : 'bg-white dark:bg-health-darkCard text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-health-electric/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredTerms.map(term => (
            <div key={term.id} id={term.id}>
              <FlipCard term={term} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
