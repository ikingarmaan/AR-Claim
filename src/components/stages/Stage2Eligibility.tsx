import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  ShieldCheck, 
  Search, 
  Calendar, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileSearch,
  DollarSign
} from 'lucide-react';

export const Stage2Eligibility: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('eligibility');

  const [activeTab, setActiveTab] = useState<'edi270' | 'cob' | 'msp' | 'calculator'>('edi270');

  // Birthday Rule interactive state
  const [parent1Dob, setParent1Dob] = useState('1984-04-12');
  const [parent2Dob, setParent2Dob] = useState('1986-09-24');

  const getBirthdayRuleResult = () => {
    const p1Month = parseInt(parent1Dob.split('-')[1], 10);
    const p1Day = parseInt(parent1Dob.split('-')[2], 10);
    const p2Month = parseInt(parent2Dob.split('-')[1], 10);
    const p2Day = parseInt(parent2Dob.split('-')[2], 10);

    if (p1Month < p2Month || (p1Month === p2Month && p1Day < p2Day)) {
      return { winner: 'Parent 1', reason: 'Birthday falls earlier in the calendar year (April vs September).' };
    } else if (p2Month < p1Month || (p2Month === p1Month && p2Day < p1Day)) {
      return { winner: 'Parent 2', reason: 'Birthday falls earlier in the calendar year (September vs April).' };
    } else {
      return { winner: 'Tie', reason: 'Both parents share the same month and day. The policy in effect the longest is primary.' };
    }
  };

  const birthdayResult = getBirthdayRuleResult();

  return (
    <div className="space-y-8 animate-fadeIn">
      <RcmPipelineFlow />

      <div className="skeuo-manila p-6 sm:p-8 rounded-xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Binder Clip */}
        <div className="absolute -top-4 left-10 w-16 h-8 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-md shadow-md border border-stone-500 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-indigo-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 2 OF 10: FRONT-END
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                EDI 270 / 271 REAL-TIME ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 2: Eligibility & Benefits Verification
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Verify active coverage, copayments, remaining deductibles, out-of-pocket maximums, prior authorization rules, and primary/secondary Coordination of Benefits (COB) before the patient arrives in the clinic.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              COVERAGE VALIDATED
            </div>
            <button
              onClick={() => markModuleCompleted('eligibility')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 border transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-white/80 dark:bg-stone-800 border-stone-400 text-stone-700 dark:text-stone-200 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Stage Mastered' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('edi270')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'edi270'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📡 EDI 270 / 271 Electronic Inquiry
          </button>
          <button
            onClick={() => setActiveTab('cob')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'cob'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ⚖️ Coordination of Benefits (COB) & Birthday Rule
          </button>
          <button
            onClick={() => setActiveTab('msp')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'msp'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🏛️ Medicare Secondary Payer (MSP) Rules
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'calculator'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🎂 Interactive Birthday Rule Simulator
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'edi270' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="skeuo-inset p-4 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-300 dark:border-stone-700">
                  <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                    TRANSACTION 1: ANSI X12 EDI 270 (INQUIRY)
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                    What the Provider Sends to Payer
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Sent automatically by PMS or clearinghouse. Key segments:
                  </p>
                  <ul className="text-xs text-stone-700 dark:text-stone-300 mt-2 space-y-1 font-mono">
                    <li>• <code>NM1*PR</code>: Payer Identifier (e.g. BCBS-001)</li>
                    <li>• <code>NM1*1P</code>: Billing Provider NPI & Taxonomy</li>
                    <li>• <code>NM1*IL</code>: Insured Subscriber Member ID & Name</li>
                    <li>• <code>EQ*30</code>: Service Type Code (30 = General Health Benefit)</li>
                    <li>• <code>DTP*291</code>: Requested Date of Service</li>
                  </ul>
                </div>

                <div className="skeuo-inset p-4 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-300 dark:border-stone-700">
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    TRANSACTION 2: ANSI X12 EDI 271 (RESPONSE)
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                    What the Payer Returns in Milliseconds
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Parses live eligibility data into the PMS ledger. Key fields:
                  </p>
                  <ul className="text-xs text-stone-700 dark:text-stone-300 mt-2 space-y-1 font-mono">
                    <li>• <code>EB*1</code>: Active Coverage Flag (1 = Active)</li>
                    <li>• <code>EB*C</code>: Deductible Amount remaining for year</li>
                    <li>• <code>EB*B</code>: Copayment required ($30.00 Specialist)</li>
                    <li>• <code>EB*A</code>: Coinsurance percentage (20% patient)</li>
                    <li>• <code>EB*G</code>: Out-of-Pocket Maximum remaining ($2,500)</li>
                  </ul>
                </div>
              </div>

              {/* Real World Case Study */}
              <div className="skeuo-paper p-4 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 font-mono">
                  CASE STUDY: THE $1,200 ACCUMULATOR TRAP
                </span>
                <p className="text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                  Patient Eleanor visits an orthopedic surgeon on January 15. Her plan deductible is $1,500 calendar-year. 
                  Because it is the beginning of the year, her <strong>deductible accumulator has reset to $0</strong>. 
                  If the clinic fails to run an EDI 270 and collects only a $30 copay, the practice will receive $0 from the payer on the $800 visit because the entire amount is assigned to <strong>PR-1 (Deductible)</strong>. Collecting patient deductible at front desk prevents bad debt.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cob' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                National Association of Insurance Commissioners (NAIC) COB Hierarchy:
              </h4>

              <div className="space-y-3">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-stone-900 dark:text-stone-100 font-serif">1. Subscriber / Employee vs Dependent:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    The plan covering the patient as an active employee/subscriber is always <strong>PRIMARY</strong> to a plan covering them as a spouse or dependent.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-stone-900 dark:text-stone-100 font-serif">2. The Birthday Rule for Dependent Children:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    When a child is covered under both parents' health insurance policies, the plan of the parent whose birthday (month and day) falls <strong>earlier in the calendar year</strong> is PRIMARY. The year of birth is completely irrelevant.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-stone-900 dark:text-stone-100 font-serif">3. Divorced / Separated Parents:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    If no court decree assigns financial responsibility, the order is: (1) Parent with primary legal custody, (2) Spouse of parent with custody (stepparent), (3) Parent without custody, (4) Spouse of non-custodial parent.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-stone-900 dark:text-stone-100 font-serif">4. Active Employment vs COBRA / Retiree Coverage:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    An active group health plan (EGHP) is always PRIMARY to a COBRA continuation plan or a retiree medical policy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'msp' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Medicare Secondary Payer (MSP) Questionnaire Hierarchy:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-amber-800 font-mono">MSP CONDITION 1: WORKING AGED</span>
                  <p className="mt-1">
                    Employer has <strong>20 or more employees</strong>, and patient (or spouse) is age 65+ and actively employed. Employer Group Health Plan (EGHP) is <strong>PRIMARY</strong>; Medicare is <strong>SECONDARY</strong>.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-amber-800 font-mono">MSP CONDITION 2: DISABILITY</span>
                  <p className="mt-1">
                    Employer has <strong>100 or more employees</strong>, and disabled beneficiary (under 65) is covered under active employment. EGHP is <strong>PRIMARY</strong>; Medicare is <strong>SECONDARY</strong>.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-amber-800 font-mono">MSP CONDITION 3: ESRD (KIDNEY DISEASE)</span>
                  <p className="mt-1">
                    Medicare ESRD has a statutory <strong>30-month coordination period</strong> during which commercial group health plan is PRIMARY. After month 30, Medicare becomes PRIMARY.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-amber-800 font-mono">MSP CONDITION 4: ACCIDENT / LIABILITY / WORKERS COMP</span>
                  <p className="mt-1">
                    Auto No-Fault, General Liability, or State Workers' Compensation is always <strong>PRIMARY</strong>. Medicare will issue conditional payments only if carrier delays beyond 120 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="skeuo-inset p-5 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-300 dark:border-stone-700">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Live NAIC Birthday Rule Determination Engine
                </h4>
                <span className="text-xs font-mono text-stone-500">COB SIMULATOR</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Parent 1 (e.g. Mother) Date of Birth:
                  </label>
                  <input
                    type="date"
                    value={parent1Dob}
                    onChange={(e) => setParent1Dob(e.target.value)}
                    className="p-2 text-xs rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 w-full"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Month/Day: {parent1Dob.slice(5)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Parent 2 (e.g. Father) Date of Birth:
                  </label>
                  <input
                    type="date"
                    value={parent2Dob}
                    onChange={(e) => setParent2Dob(e.target.value)}
                    className="p-2 text-xs rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 w-full"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Month/Day: {parent2Dob.slice(5)}
                  </span>
                </div>
              </div>

              {/* Outcome Badge */}
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-200">
                <div className="font-bold text-sm font-serif">
                  Primary Payer: <span className="underline">{birthdayResult.winner}'s Health Insurance Plan</span>
                </div>
                <p className="mt-1">{birthdayResult.reason}</p>
                <p className="mt-2 text-[11px] text-stone-600 dark:text-stone-400">
                  <strong>CMS-1500 Filing Note:</strong> {birthdayResult.winner}'s policy is entered in Boxes 1–11. The other parent's policy is entered as Secondary Payer in Boxes 9, 9a, 9b, 9d.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('appointment')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 1 Appointment
          </button>

          <button
            onClick={() => setActiveModule('registration')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 3: Patient Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
