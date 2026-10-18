import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  FileText, 
  UserCheck, 
  ShieldAlert, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Stamp,
  AlertTriangle
} from 'lucide-react';

export const Stage3Registration: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('registration');

  const [activeTab, setActiveTab] = useState<'consents' | 'abn' | 'pos' | 'redflags'>('consents');

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
              <span className="skeuo-badge bg-violet-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 3 OF 10: FRONT-END
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                PATIENT CHECK-IN & LEGAL COMPLIANCE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 3: Patient Registration & Legal Consents
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              When the patient arrives at the front desk, legal and financial custody is established. Obtain signed Assignment of Benefits (Box 13), HIPAA releases (Box 12), photo ID verification, and Medicare ABNs.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              LEGAL CONSENT ON FILE
            </div>
            <button
              onClick={() => markModuleCompleted('registration')}
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

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('consents')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'consents'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📜 The Big 3 Legal Consents (AOB & ROI)
          </button>
          <button
            onClick={() => setActiveTab('abn')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'abn'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ⚠️ Advance Beneficiary Notice (ABN / CMS-R-131)
          </button>
          <button
            onClick={() => setActiveTab('pos')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'pos'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            💳 Point-of-Service (POS) Collections
          </button>
          <button
            onClick={() => setActiveTab('redflags')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'redflags'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🛡️ FTC Red Flags Rule & Identity Check
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'consents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Consent 1: AOB */}
                <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                      LEGAL FORM 1: CMS-1500 BOX 13
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      "SIGNATURE ON FILE" (SOF)
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-2">
                    Assignment of Benefits (AOB)
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Legally directs the health insurance company to pay insurance reimbursement directly to the healthcare provider rather than sending the check to the patient.
                  </p>
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/40 rounded border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200">
                    <strong>Critical Warning:</strong> If Box 13 is blank, the payer will mail a check payable directly to the patient. The practice must then chase the patient for payment, with bad debt rates exceeding 75%!
                  </div>
                </div>

                {/* Consent 2: ROI */}
                <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-400">
                      LEGAL FORM 2: CMS-1500 BOX 12
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      "SIGNATURE ON FILE" (SOF)
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-2">
                    Release of Information (ROI / HIPAA)
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Authorizes the provider to disclose necessary medical history, clinical notes, and diagnostic test results to the payer or clearinghouse to adjudicate the claim.
                  </p>
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                    <strong>HIPAA Compliance:</strong> Without a valid signed ROI, transmitting electronic claims containing Protected Health Information (PHI) constitutes an unauthorized disclosure punishable by HHS Office for Civil Rights (OCR) fines.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'abn' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700">
                <span className="font-mono font-bold text-amber-900 dark:text-amber-300 text-xs uppercase">
                  CMS STATUTORY REQUIREMENT: FORM CMS-R-131
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  Advance Beneficiary Notice of Noncoverage (ABN)
                </h4>
                <p className="mt-2 leading-relaxed">
                  Required when a Medicare Part B service is expected to be denied as "not medically reasonable and necessary" under Section 1862(a)(1) of the Social Security Act. The ABN informs the Medicare beneficiary of expected costs ($) and allows them to make an informed choice.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-800 text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300 font-mono text-sm mb-1">
                    ✅ ABN SIGNED → APPEND MODIFIER "GA"
                  </div>
                  <p className="text-stone-700 dark:text-stone-300">
                    When the patient selects Option 1 on the ABN, sign it, and you submit the claim:
                  </p>
                  <ul className="mt-2 space-y-1 list-disc pl-4 text-stone-700 dark:text-stone-300">
                    <li>Append <strong>Modifier GA</strong> (Waiver of liability on file)</li>
                    <li>Medicare denies with <strong>PR-204</strong> (Patient Responsibility)</li>
                    <li>The provider is legally permitted to bill the patient the full allowed amount!</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded border border-red-300 dark:border-red-800 text-xs">
                  <div className="font-bold text-red-900 dark:text-red-300 font-mono text-sm mb-1">
                    🛑 NO ABN ON FILE → APPEND MODIFIER "GZ"
                  </div>
                  <p className="text-stone-700 dark:text-stone-300">
                    If the provider expected a denial but forgot to give the patient an ABN before service:
                  </p>
                  <ul className="mt-2 space-y-1 list-disc pl-4 text-stone-700 dark:text-stone-300">
                    <li>Must append <strong>Modifier GZ</strong> (No ABN signed)</li>
                    <li>Medicare denies with <strong>CO-50</strong> (Contractual Obligation)</li>
                    <li>The provider MUST write off the balance. Billing the patient is a federal crime under Medicare assignment rules!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pos' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Point-of-Service (POS) Collections Strategy
              </h4>
              <p className="leading-relaxed">
                Collecting patient balances at check-in costs <strong>$0.20 per dollar</strong>. Waiting to bill via mailed statements post-adjudication costs <strong>$0.85 per dollar</strong> in administrative overhead, stamps, and collection fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-3">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">1. Mandatory Copayments</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Collect 100% of the copayment (from EDI 271) before the patient is escorted to the exam room.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">2. Outstanding Prior Balances</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Prompt the check-in coordinator if patient owes a prior balance from a previous service date.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">3. Deductible Pre-Estimates</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    If EDI 271 indicates unmet deductible, collect an estimated deposit ($75–$150) toward the encounter.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'redflags' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-300 dark:border-purple-800">
                <span className="font-mono font-bold text-purple-900 dark:text-purple-300 text-xs">
                  FEDERAL TRADE COMMISSION (FTC) RED FLAGS RULE: 16 CFR § 681.1
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  Medical Identity Theft Prevention Protocol
                </h4>
                <p className="mt-1 leading-relaxed">
                  Healthcare providers are classified as "creditors" because they defer payment for services. Practices must verify physical photo ID at every visit to detect stolen insurance cards or identity theft.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-red-700">🚨 Red Flag 1:</span> Photo on ID does not match physical appearance of patient presenting at window.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-red-700">🚨 Red Flag 2:</span> Insurance card member ID does not validate or has altered text/lamination.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-red-700">🚨 Red Flag 3:</span> Patient unable to recite social security number or date of birth on file.
                </div>
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-red-700">🚨 Red Flag 4:</span> Medical records show previous history of bilateral nephrectomy, but patient is seeking care for kidney stones.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('eligibility')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 2 Eligibility
          </button>

          <button
            onClick={() => setActiveModule('encounter')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 4: Doctor Encounter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
