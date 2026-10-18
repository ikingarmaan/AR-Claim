import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  FileText, 
  Mic, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export const Stage5Transcription: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('transcription');

  const [activeTab, setActiveTab] = useState<'records' | 'cdi' | 'queries' | 'speechAi'>('records');

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
              <span className="skeuo-badge bg-cyan-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 5 OF 10: MID-CYCLE
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                VOICE-TO-EHR & CLINICAL DOCUMENTATION IMPROVEMENT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 5: Medical Transcription & CDI Programs
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Transform clinical dictations, ambient voice recordings, and EHR templates into airtight, legally compliant medical records ready for professional coding and billing.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              CDI COMPLIANT
            </div>
            <button
              onClick={() => markModuleCompleted('transcription')}
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
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'records'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📑 The 4 Primary Medical Record Documents
          </button>
          <button
            onClick={() => setActiveTab('cdi')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'cdi'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📈 CDI Programs & Specificity Impact (HCC / DRG)
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'queries'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ❓ Physician Query Compliance (AHIMA / ACDIS)
          </button>
          <button
            onClick={() => setActiveTab('speechAi')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'speechAi'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🎙️ Ambient AI Scribes & Dictation Guidelines
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'records' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-blue-700 dark:text-blue-400">DOCUMENT 1</span>
                    <span className="text-[10px] font-mono text-stone-700 dark:text-stone-300 font-bold">CMS 482.24(c)(4)(viii)</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                    History & Physical (H&P) Exam
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                    Must be completed within <strong>24 hours of inpatient hospital admission</strong> or within 30 days prior to elective surgery. Establishes baseline medical necessity for admission.
                  </p>
                </div>

                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-red-700 dark:text-red-400">DOCUMENT 2</span>
                    <span className="text-[10px] font-mono text-stone-700 dark:text-stone-300 font-bold">MANDATORY POST-OP</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                    Operative / Procedure Report
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                    Dictated immediately after surgery before patient is transferred from PACU. Contains: pre/post-op diagnoses, primary surgeon, assistants, anesthesia type, surgical approach, hardware implanted, blood loss, and tissue specimens sent to pathology.
                  </p>
                </div>

                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">DOCUMENT 3</span>
                    <span className="text-[10px] font-mono text-stone-700 dark:text-stone-300 font-bold">INPATIENT CULMINATION</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                    Discharge Summary
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                    Comprehensive synopsis of hospital stay: admitting diagnosis, discharge diagnosis, procedures performed, hospital course, discharge medications, and follow-up plan. Dictated within 30 days of discharge.
                  </p>
                </div>

                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-purple-700 dark:text-purple-400">DOCUMENT 4</span>
                    <span className="text-[10px] font-mono text-stone-700 dark:text-stone-300 font-bold">REFERRAL COMMUNICATION</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                    Consultation Report
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                    Written opinion returned from specialist (e.g., Cardiology, Endocrinology) to requesting primary care physician. Required to validate HMO referral loops.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cdi' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                How Clinical Documentation Improvement (CDI) Powers Reimbursement:
              </h4>

              <div className="space-y-3">
                <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100">Scenario A: Vague Documentation</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">LOW REIMBURSEMENT</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Physician documents: <em>"Congestive heart failure, patient stable."</em><br />
                    • Coded as: <code>I50.9</code> (Heart failure, unspecified)<br />
                    • Reimbursement Impact: Lowest tier MS-DRG weight. Excluded from Hierarchical Condition Categories (HCC) risk adjustment.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 dark:text-emerald-200">Scenario B: CDI-Clarified Documentation</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">MAX REVENUE & ACCURACY</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                    CDI Specialist queries; physician updates note: <em>"Acute on chronic systolic heart failure, ejection fraction 30%."</em><br />
                    • Coded as: <code>I50.23</code> (Acute on chronic systolic heart failure)<br />
                    • Reimbursement Impact: Qualifies as a Major Complication/Comorbidity (MCC), elevating the hospital MS-DRG reimbursement by up to <strong>+$4,800</strong> legitimately reflecting clinical acuity!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'queries' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-800 dark:text-amber-400 text-xs">
                  AHIMA / ACDIS COMPLIANT QUERY PRACTICE BRIEF
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  Physician Query Rules: Non-Leading Standards
                </h4>
                <p className="mt-1 leading-relaxed">
                  A query is a communication tool used by CDI specialists and coders to ask the attending physician for clinical clarification. Under federal OIG compliance guidelines, queries must <strong>NEVER be leading</strong> (i.e., you cannot tell the doctor what code to pick for higher revenue).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded border border-red-300 dark:border-red-800">
                  <strong className="text-red-900 dark:text-red-300 block mb-1">❌ ILLEGAL LEADING QUERY:</strong>
                  <em>"Doctor, your patient has low sodium and received hypertonic saline. Can you please document 'Severe Hyponatremia' so we can capture an MCC?"</em>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-800">
                  <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">✅ COMPLIANT MULTIPLE-CHOICE QUERY:</strong>
                  <em>"Lab indicates serum sodium of 124 mEq/L treated with 3% saline infusion. Based on your clinical judgment, please clarify the condition: (a) Mild hyponatremia, (b) Severe acute hyponatremia, (c) Pseudohyponatremia, (d) Other condition, (e) Unable to determine."</em>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'speechAi' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Ambient AI Scribing & Voice Recognition QA Protocol
              </h4>
              <p className="leading-relaxed">
                Modern clinical transcription relies heavily on ambient AI models listening in the background to summarize conversations into SOAP notes. However, human medical transcriptionists (MTs) and coders must perform QA for critical "sounds-like" clinical errors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mt-3">
                <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-mono font-bold text-red-700">Ablation vs Avulsion</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Heart catheter tissue burning vs traumatic tearing of a ligament.
                  </p>
                </div>

                <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-mono font-bold text-red-700">Dysphagia vs Dysphasia</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Difficulty swallowing (digestive) vs difficulty speaking (neurological).
                  </p>
                </div>

                <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <span className="font-mono font-bold text-red-700">Ileum vs Ilium</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Small intestine (digestive) vs pelvic bone (skeletal anatomy).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('encounter')}
            className="text-xs font-serif font-bold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
          >
            ← Previous: Stage 4 Doctor Encounter
          </button>

          <button
            onClick={() => setActiveModule('coding')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 6: Medical Coding</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

