import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { EobEraGuide } from '../diagrams/EobEraGuide';
import { 
  Building2, 
  CreditCard, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Receipt,
  FileCheck,
  Scale,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
import { CarcRarcDictionaryDesk } from '../dashboard/CarcRarcDictionaryDesk';

export const Stage9PaymentPosting: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('payment-posting');

  const [activeTab, setActiveTab] = useState<'calculator' | 'era835' | 'crossover' | 'creditBalances' | 'carcRarc'>('calculator');

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
              <span className="skeuo-badge bg-green-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 9 OF 10: BACK-END
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                ERA 835 • EOB • EFT DEPOSITS • LEDGER BALANCING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 9: Payment Posting & Adjudication Reconciliation
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              When the payer issues reimbursement, payment posting reconciles the bank deposit with the electronic 835 remittance advice. Contractual adjustments (CO-45) are recorded, patient responsibility is transferred, and denials are routed to A/R.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              LEDGER BALANCED
            </div>
            <button
              onClick={() => markModuleCompleted('payment-posting')}
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'calculator'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            🧮 Interactive EOB / 835 Remittance Ledger
          </button>
          <button
            onClick={() => setActiveTab('era835')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'era835'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            🏦 ERA 835 Segments & EFT Trace Reconciliation
          </button>
          <button
            onClick={() => setActiveTab('crossover')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'crossover'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            🔄 Secondary Payer Crossover Generation
          </button>
          <button
            onClick={() => setActiveTab('creditBalances')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'creditBalances'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            ⚠️ Credit Balances & 60-Day Refund Rule
          </button>
          <button
            onClick={() => setActiveTab('carcRarc')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
              activeTab === 'carcRarc'
                ? 'bg-rose-900 text-white border-rose-950 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>CARC & RARC Codebook</span>
            <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">49+</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'calculator' && (
            <div>
              <EobEraGuide />
            </div>
          )}

          {activeTab === 'era835' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Anatomy of an ANSI X12 EDI 835 Remittance File
              </h4>
              <p className="leading-relaxed">
                When Medicare or commercial payers pay via Electronic Funds Transfer (EFT), they transmit an EDI 835 data file to your practice management software.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border font-mono">
                  <span className="font-bold text-amber-700 dark:text-amber-400">1. TRN Segment (Check Trace #):</span>
                  <p className="mt-1 text-stone-800 dark:text-stone-200 font-sans">
                    <code>TRN*1*ACH98214002*1948210344~</code><br />
                    Ties the 835 remittance file to the electronic deposit appearing on the practice bank account statement. Payment poster verifies cash in bank before unlocking batch.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border font-mono">
                  <span className="font-bold text-amber-700 dark:text-amber-400">2. CLP Segment (Claim Payment Data):</span>
                  <p className="mt-1 text-stone-800 dark:text-stone-200 font-sans">
                    <code>CLP*PATIENT-ACCT*1*450.00*144.00*36.00*MC~</code><br />
                    Contains Patient Account #, Claim Status Code (1 = Primary, 2 = Secondary, 4 = Denied), Total Billed ($450), Payer Payment ($144), Patient Responsibility ($36).
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border font-mono">
                  <span className="font-bold text-amber-700 dark:text-amber-400">3. CAS Segment (Adjustment Codes):</span>
                  <p className="mt-1 text-stone-800 dark:text-stone-200 font-sans">
                    <code>CAS*CO*45*170.00~</code> (Contractual write-off)<br />
                    <code>CAS*PR*1*100.00~</code> (Patient deductible)<br />
                    Breaks down exactly where every unpaid dollar went using CARC reason codes.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border font-mono">
                  <span className="font-bold text-amber-700 dark:text-amber-400">4. PLB Segment (Provider-Level Adjustments):</span>
                  <p className="mt-1 text-stone-800 dark:text-stone-200 font-sans">
                    <code>PLB*1234567890*20261231*WO:-250.00~</code><br />
                    Payer clawbacks, previous overpayment recoupments, or interest payments applied at the provider tax ID level rather than individual claims.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crossover' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Automated Secondary Payer Crossover Billing
              </h4>
              <p className="leading-relaxed">
                When a patient has Medicare Part B and a supplemental Medigap policy (e.g., AARP Plan G), Medicare's Coordination of Benefits Agreement (COBA) automatically forwards the adjudicated 835 claim to the secondary insurer without practice intervention.
              </p>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-800 text-xs">
                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-300">
                  INDICATOR ON 835: "CLAIM HAS BEEN TRANSFERRED TO CROSSOVER CARRIER"
                </span>
                <p className="mt-1 text-stone-700 dark:text-stone-300">
                  Payment poster checks the 835 remark code: If Remark <strong>MA18</strong> is present, DO NOT manually bill secondary. Doing so creates duplicate billing denials (CO-18). Only bill secondary if primary EOB indicates crossover failed.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'creditBalances' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded border border-red-300 dark:border-red-800">
                <span className="font-mono font-bold text-red-900 dark:text-red-300 text-xs">
                  ACA § 6402 / 31 U.S.C. § 3729 (FALSE CLAIMS ACT LIABILITY)
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  The Statutory 60-Day Medicare Overpayment Refund Rule
                </h4>
                <p className="mt-2 leading-relaxed">
                  If payment posting discovers that a provider received duplicate payment from both primary and secondary insurance, or received payment exceeding allowable charges, the provider has a <strong>strict statutory window of 60 days</strong> from identification to return the overpayment to CMS.
                </p>
                <div className="mt-2 font-bold text-red-900 dark:text-red-200">
                  Failing to refund an identified overpayment within 60 days transforms the credit into an intentional "reverse false claim," subjecting the practice to treble damages ($11,000+ per claim) under the federal False Claims Act!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'carcRarc' && (
            <div>
              <CarcRarcDictionaryDesk />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('claim-submission')}
            className="text-xs font-serif font-bold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
          >
            ← Previous: Stage 8 Claim Submission
          </button>

          <button
            onClick={() => setActiveModule('ar-followup')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 10: AR Follow-Up & Denials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

