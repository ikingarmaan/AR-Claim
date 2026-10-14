import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  Calculator, 
  Users, 
  AlertTriangle, 
  Building2, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  MEDICARE_3WAY_COMPARISON, 
  MSP_CODES, 
  MANAGED_CARE_TYPES, 
  POLICY_RULES 
} from '../../data/payersAndMedicare';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';
import { BirthdayRuleModal } from '../tools/BirthdayRuleModal';
import { CartoonTip } from '../common/CartoonTip';

export const Module3InsurancePayer: React.FC = () => {
  const { progress, markModuleCompleted } = useAcademy();
  const [activeTab, setActiveTab] = useState<'medicare' | 'spenddown' | 'managed-care' | 'policies'>('medicare');
  const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);

  // Spenddown Interactive Simulator State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1450);
  const [mnilLimit, setMnilLimit] = useState<number>(950); // State Medically Needy Income Limit
  const [medicalBills, setMedicalBills] = useState<number[]>([150, 220]);

  const isCompleted = progress.completedModules.includes('insurance-payers');

  // Spenddown Math
  const spenddownGoal = Math.max(0, monthlyIncome - mnilLimit);
  const totalBillsAccumulated = medicalBills.reduce((acc, curr) => acc + curr, 0);
  const spenddownMet = totalBillsAccumulated >= spenddownGoal;
  const remainingSpenddown = Math.max(0, spenddownGoal - totalBillsAccumulated);

  const handleAddBill = (amount: number) => {
    setMedicalBills(prev => [...prev, amount]);
  };

  const handleResetBills = () => {
    setMedicalBills([]);
  };

  const handleMarkComplete = () => {
    markModuleCompleted('insurance-payers');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-health-darkCard to-health-darkCard border border-amber-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Module 3 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              US Insurance Ecosystem, Payers & Rules
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Navigate Medicare Parts A–D, 3-way Advantage vs Medigap comparison, MSP coordination codes, Medicaid spenddown, Managed Care networks (HMO/PPO/EPO/POS), and essential COB rules.
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

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('medicare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'medicare'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Medicare Masterclass & 3-Way Table
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spenddown')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'spenddown'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Medicaid Spenddown Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('managed-care')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'managed-care'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Managed Care (HMO / PPO / EPO / POS)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'policies'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            COB & Policy Rules (Birthday Rule, COBRA)
          </button>
        </div>
      </div>

      {/* Mascot Payer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CartoonTip
          mood="celebrating"
          type="green-tip"
          title="The Birthday Rule for Dependent Children"
          message="When a dependent child is covered under both parents' insurance plans, the parent whose birth MONTH falls earlier in the calendar year is Primary! If months match, earlier day wins. Birth year is completely irrelevant!"
        />
        <CartoonTip
          mood="denied"
          type="red-warning"
          title="Medicare Advantage (Part C) Replacement Trap"
          message="When a patient enrolls in Medicare Advantage (Part C), the private insurer replaces Original Medicare. Submitting claims to Traditional Medicare Part B will result in an immediate CO-109 rejection!"
        />
      </div>

      {/* TAB 1: MEDICARE MASTERCLASS & 3-WAY TABLE */}
      {activeTab === 'medicare' && (
        <div className="space-y-8">
          {/* 4 Parts Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                PART A
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Hospital Inpatient Insurance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Covers acute inpatient hospital stays, skilled nursing facility (SNF) care, hospice care, and home health services. Billed on UB-04 via DRGs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                PART B
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Medical & Outpatient Insurance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Covers physician visits, outpatient therapy, lab tests, X-rays, and Durable Medical Equipment (DME). 80/20 coinsurance after annual deductible.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
                PART C (ADVANTAGE)
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Medicare Advantage (Private)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Replaces Original Medicare through private commercial HMOs/PPOs. Combines Parts A, B, and D with out-of-pocket maximums and dental/vision perks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                PART D
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Prescription Drug Benefit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Private insurance plans covering retail prescription drugs. Standardized multi-tier formulary with copays and coverage phases.
              </p>
            </div>
          </div>

          {/* 3-Way Comparison Matrix */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3-Way Master Comparison: Original Medicare vs. Medicare Advantage vs. Medigap
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare coverage freedom, provider networks, claims handling, and financial liabilities across 10 core dimensions
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4 w-1/5">Dimension</th>
                    <th className="py-3 px-4 w-1/4 text-health-electric">Original Medicare (A + B)</th>
                    <th className="py-3 px-4 w-1/4 text-purple-400">Medicare Advantage (Part C)</th>
                    <th className="py-3 px-4 w-1/4 text-emerald-400">Medigap Supplement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MEDICARE_3WAY_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-health-darkSubtle/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{row.dimension}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{row.originalMedicare}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{row.medicareAdvantage}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{row.medigapSupplement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MSP Codes Grid */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Medicare Secondary Payer (MSP) Coordination Codes
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Federal coordination rules determining when Medicare pays secondary to commercial, liability, or auto plans
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {MSP_CODES.map(msp => (
                <div key={msp.code} className="p-4 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      MSP CODE {msp.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {msp.name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {msp.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-health-electric">Coordination Rule: </span>
                    {msp.coordinationRules}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEDICAID SPENDDOWN SIMULATOR */}
      {activeTab === 'spenddown' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Interactive Medicaid Spenddown Visual Explainer
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Understand how excess monthly income is reduced by patient medical bills to activate Medicaid coverage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Spenddown Configuration & Bill Adder */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Income & State Eligibility Settings
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Patient Monthly Income:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">${monthlyIncome} / mo</span>
                  </div>
                  <input
                    type="range"
                    min={900}
                    max={2500}
                    step={50}
                    value={monthlyIncome}
                    onChange={e => setMonthlyIncome(Number(e.target.value))}
                    className="w-full accent-health-electric"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">State Medically Needy Limit (MNIL):</span>
                    <span className="font-mono font-bold text-emerald-500">${mnilLimit} / mo</span>
                  </div>
                  <input
                    type="range"
                    min={600}
                    max={1200}
                    step={25}
                    value={mnilLimit}
                    onChange={e => setMnilLimit(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Required Spenddown Target:</span>
                    <span className="font-mono text-sm text-amber-500">${spenddownGoal}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Patient must incur ${spenddownGoal} in medical bills each month before Medicaid activates.
                  </p>
                </div>
              </div>

              {/* Add Mock Bills Sandbox */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Submit Incurred Medical Bills to Spenddown
                  </span>
                  <button
                    type="button"
                    onClick={handleResetBills}
                    className="text-[11px] text-rose-500 hover:underline"
                  >
                    Clear Bills
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddBill(50)}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-health-electric transition-colors text-center"
                  >
                    + $50 Rx Bill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBill(150)}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-health-electric transition-colors text-center"
                  >
                    + $150 Clinic Bill
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBill(300)}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-health-electric transition-colors text-center"
                  >
                    + $300 Lab/Imaging
                  </button>
                </div>

                <div className="text-[11px] text-slate-500">
                  Accumulated Bills on File: {medicalBills.length} ({medicalBills.map(b => `$${b}`).join(' + ') || '$0'})
                </div>
              </div>
            </div>

            {/* Right: Spenddown Progress Gauge */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">MEDICAID STATUS VERIFICATION</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                    spenddownMet ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {spenddownMet ? 'MEDICAID ACTIVE' : 'PENDING SPENDDOWN'}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-400">Spenddown Satisfied:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ${totalBillsAccumulated} / ${spenddownGoal}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalBillsAccumulated / (spenddownGoal || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Incurred Bills</div>
                    <div className="text-lg font-mono font-black text-white mt-0.5">${totalBillsAccumulated}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Remaining to Spenddown</div>
                    <div className="text-lg font-mono font-black text-amber-400 mt-0.5">${remainingSpenddown}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {spenddownMet ? (
                    <span className="text-emerald-400 font-medium">
                      Success! The patient has met their monthly spenddown obligation. All additional medical services rendered during the remainder of this calendar month are 100% covered by Medicaid!
                    </span>
                  ) : (
                    <span>
                      Medicaid is currently inactive. The patient must provide proof of an additional ${remainingSpenddown} in medical bills before the county welfare/Medicaid caseworker will approve coverage for this month.
                    </span>
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
                <span className="font-bold">AR Pro-Tip: </span>
                When billing a claim for a spenddown patient that met the spenddown threshold, split the claim into two: the portion applied to the spenddown (patient liability) and the excess portion billed to Medicaid.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGED CARE (HMO, PPO, EPO, POS) */}
      {activeTab === 'managed-care' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MANAGED_CARE_TYPES.map(mc => (
              <div 
                key={mc.acronym}
                className="bg-white dark:bg-health-darkCard p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xl text-health-electric">
                      {mc.acronym}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mc.inNetworkOnly ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {mc.inNetworkOnly ? 'In-Network Only' : 'Out-of-Network Allowed'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {mc.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {mc.keySummary}
                  </p>

                  <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">PCP Required:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{mc.pcpRequired ? 'Yes (Gatekeeper)' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Referrals Needed:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{mc.referralsRequired ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Out-of-Network: </span>
                  {mc.outOfNetworkCoverage}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COB & POLICY RULES */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-health-electric/15 to-purple-500/15 p-6 rounded-3xl border border-health-electric/30">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Birthday Rule & COB Calculator Widget
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Calculate primary vs secondary insurer for children with dual coverage
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsBirthdayModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-health-electric text-white text-xs font-bold hover:bg-health-electricDark transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Calculator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POLICY_RULES.map((rule, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-health-darkCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {rule.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {rule.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rule.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-health-electric">Operational RCM Impact: </span>
                  <span className="text-slate-600 dark:text-slate-300">{rule.operationalImpact}</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    AR Action Checklist:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                    {rule.arChecklist.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Birthday Rule Calculator Modal */}
      <BirthdayRuleModal
        isOpen={isBirthdayModalOpen}
        onClose={() => setIsBirthdayModalOpen(false)}
      />
    </div>
  );
};
