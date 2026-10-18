import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { ClaimLifecycle } from '../diagrams/ClaimLifecycle';
import { ModernSkeuoClaimStudio } from './claim-forms/ModernSkeuoClaimStudio';
import { 
  FileCheck2, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Building2,
  Table,
  Layers
} from 'lucide-react';

export const Stage8ClaimSubmission: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('claim-submission') || progress.completedModules.includes('claim-forms');

  const [activeSection, setActiveSection] = useState<'forms' | 'edi' | 'clearinghouse'>('forms');

  return (
    <div className="space-y-8 animate-fadeIn">
      <RcmPipelineFlow />

      {/* Top Header */}
      <div className="skeuo-manila p-6 sm:p-8 rounded-xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Binder Clip */}
        <div className="absolute -top-4 left-10 w-16 h-8 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-md shadow-md border border-stone-500 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-emerald-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 8 OF 10: BACK-END
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                OFFICIAL CLAIM FORMS & ANSI X12 837 TRANSMISSION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 8: Claim Submission (CMS-1500 & UB-04 Forms)
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Explore the official CMS-1500 (Professional 02/12) and UB-04 (CMS-1450 Institutional) claim forms with real PDF backdrops and comprehensive side-by-side box explanations for all 33 boxes and 81 locators.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              837P / 837I CERTIFIED
            </div>
            <button
              onClick={() => markModuleCompleted('claim-submission')}
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

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveSection('forms')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeSection === 'forms'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📑 Interactive Claim Forms Studio (CMS-1500 & UB-04)
          </button>
          <button
            onClick={() => setActiveSection('edi')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeSection === 'edi'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🔄 Claim Lifecycle & Clearinghouse Gates
          </button>
          <button
            onClick={() => setActiveSection('clearinghouse')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeSection === 'clearinghouse'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📡 EDI 837P vs 837I Loop Architecture
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-3 sm:p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeSection === 'forms' && (
            <div>
              {/* Brand New Modern Side-by-Side Claim Studio */}
              <ModernSkeuoClaimStudio />
            </div>
          )}

          {activeSection === 'edi' && (
            <div>
              <ClaimLifecycle />
            </div>
          )}

          {activeSection === 'clearinghouse' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    PROFESSIONAL BILLING: ANSI X12 837P
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                    CMS-1500 Electronic Equivalent
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Used by physicians, non-physician practitioners, group practices, ambulatory surgical centers (ASCs), and independent diagnostic testing facilities (IDTFs).
                  </p>
                  <ul className="mt-3 space-y-1.5 font-mono text-xs">
                    <li>• <code>Loop 2000A</code>: Billing Provider Hierarchical Level</li>
                    <li>• <code>Loop 2010AA</code>: Billing Provider Name & NPI</li>
                    <li>• <code>Loop 2000B</code>: Subscriber Hierarchical Level</li>
                    <li>• <code>Loop 2300</code>: Claim Information (CLM segment)</li>
                    <li>• <code>Loop 2400</code>: Service Line (SV1 segment - CPT & Modifiers)</li>
                  </ul>
                </div>

                <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                  <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                    INSTITUTIONAL BILLING: ANSI X12 837I
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                    UB-04 (CMS-1450) Electronic Equivalent
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Used by hospitals, skilled nursing facilities (SNFs), home health agencies, hospices, and end-stage renal disease (ESRD) facilities.
                  </p>
                  <ul className="mt-3 space-y-1.5 font-mono text-xs">
                    <li>• <code>CLM05-01</code>: Type of Bill (TOB, e.g., 111 Inpatient Hospital)</li>
                    <li>• <code>Loop 2400 SV2</code>: Institutional Service Line (Revenue Code)</li>
                    <li>• <code>Loop 2300 HI</code>: Occurrence Codes & Value Codes</li>
                    <li>• <code>Loop 2310A</code>: Attending Physician NPI & Taxonomy</li>
                    <li>• <code>Loop 2310B</code>: Operating Physician (for surgical admissions)</li>
                  </ul>
                </div>
              </div>

              {/* Clearinghouse 999 vs 277CA Table */}
              <div className="skeuo-inset p-4 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-300 dark:border-stone-700 text-xs">
                <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm mb-2">
                  The Dual-Stage Electronic Acknowledgement Protocol
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-stone-800 rounded border">
                    <strong className="text-amber-800 font-mono">1. EDI 999 Implementation Acknowledgment</strong>
                    <p className="mt-1 text-stone-600 dark:text-stone-400">
                      Returned within 15–30 minutes of batch transmission. Confirms that the ANSI X12 syntax is valid, segment counts match, and mandatory envelopes (ISA/GS) are intact.
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-stone-800 rounded border">
                    <strong className="text-amber-800 font-mono">2. EDI 277CA Claim Acknowledgment</strong>
                    <p className="mt-1 text-stone-600 dark:text-stone-400">
                      Returned within 2–24 hours. Evaluates claim-level acceptance. Identifies if the payer accepted the claim into their processing system (STC*A1) or rejected it (STC*A3).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('charge-capture')}
            className="text-xs font-serif font-bold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
          >
            ← Previous: Stage 7 Charge Capturing
          </button>

          <button
            onClick={() => setActiveModule('payment-posting')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 9: Payment Posting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

