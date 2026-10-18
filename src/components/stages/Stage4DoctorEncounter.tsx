import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { EmLevelTree } from '../diagrams/EmLevelTree';
import { 
  Stethoscope, 
  FileEdit, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList,
  Activity
} from 'lucide-react';

export const Stage4DoctorEncounter: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('encounter');

  const [activeTab, setActiveTab] = useState<'soap' | 'emTree' | 'incidentTo' | 'audit'>('soap');

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
              <span className="skeuo-badge bg-teal-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 4 OF 10: MID-CYCLE
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                CLINICAL DOCUMENTATION & SOAP ENCOUNTER
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 4: Doctor Encounter & Clinical Documentation
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              The clinical encounter is the legal origin of every reimbursable dollar. The physician's SOAP note, Medical Decision Making (MDM), and time documentation form the sole evidence to withstand payer audits.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              CLINICAL VALIDITY
            </div>
            <button
              onClick={() => markModuleCompleted('encounter')}
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
            onClick={() => setActiveTab('soap')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'soap'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🩺 The Anatomy of a SOAP Note
          </button>
          <button
            onClick={() => setActiveTab('emTree')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'emTree'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📊 E/M Level Decision Tree & MDM Matrix
          </button>
          <button
            onClick={() => setActiveTab('incidentTo')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'incidentTo'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ⚖️ Incident-To Billing Rules (NP / PA 100% vs 85%)
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'audit'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ⚠️ OIG Audit Defense & Medical Necessity
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'soap' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* S */}
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">S</span>
                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">Subjective (Patient's Words)</h4>
                  </div>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4">
                    <li><strong>Chief Complaint (CC):</strong> The concise statement describing symptom, problem, condition, diagnosis or reason for encounter.</li>
                    <li><strong>HPI (8 Elements):</strong> Location, Quality, Severity, Duration, Timing, Context, Modifying factors, Associated signs & symptoms.</li>
                    <li><strong>Review of Systems (ROS):</strong> Systematic inventory of 14 organ systems.</li>
                  </ul>
                </div>

                {/* O */}
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">O</span>
                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">Objective (Measurable Data)</h4>
                  </div>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4">
                    <li><strong>Vital Signs:</strong> Blood pressure, heart rate, respiratory rate, temperature, SpO2, BMI.</li>
                    <li><strong>Physical Examination:</strong> Organ system evaluations (Cardiovascular, Respiratory, Abdominal, Musculoskeletal, Neurological).</li>
                    <li><strong>Diagnostic Results:</strong> In-house lab tests, EKG strip interpretation, X-ray findings.</li>
                  </ul>
                </div>

                {/* A */}
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">A</span>
                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">Assessment (Clinical Diagnoses)</h4>
                  </div>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4">
                    <li><strong>Primary Diagnosis:</strong> Condition established after study to be chiefly responsible for occasioning the visit (maps to Box 21A on CMS-1500).</li>
                    <li><strong>Secondary Co-Morbidities:</strong> Chronic diseases affecting treatment (Hypertension, Type 2 Diabetes, CKD Stage 3).</li>
                    <li><strong>Acuity / Progression:</strong> Stable, improving, or acutely worsening.</li>
                  </ul>
                </div>

                {/* P */}
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">P</span>
                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100">Plan (Treatment & Orders)</h4>
                  </div>
                  <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4">
                    <li><strong>Prescription Drug Management:</strong> Starting, titrating, continuing, or stopping Rx medication.</li>
                    <li><strong>Diagnostic Orders:</strong> MRI, blood chemistry panels, referral to specialist.</li>
                    <li><strong>Patient Education & Follow-Up:</strong> Warning signs for ER visit, follow-up timeline (e.g., return in 3 weeks).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emTree' && (
            <div>
              <EmLevelTree />
            </div>
          )}

          {activeTab === 'incidentTo' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-300 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-800 dark:text-amber-400 text-xs">
                  MEDICARE BENEFIT POLICY MANUAL CH. 15 § 60
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  "Incident-To" Non-Physician Practitioner (NPP) Billing Rules
                </h4>
                <p className="mt-2 leading-relaxed">
                  When a Nurse Practitioner (NP) or Physician Assistant (PA) renders care, billing under their own NPI pays at <strong>85% of the Medicare Physician Fee Schedule (MPFS)</strong>. Under strict "incident-to" guidelines, the visit can be billed under the supervising physician's NPI for <strong>100% reimbursement</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-300 dark:border-emerald-800">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 font-mono text-sm block mb-1">
                    ✅ ELIGIBLE FOR 100% INCIDENT-TO:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-stone-700 dark:text-stone-300">
                    <li>Physician previously examined the patient and created the established plan of care.</li>
                    <li>NPP is providing follow-up care for that exact existing diagnosis without changing the course of treatment.</li>
                    <li>The supervising physician is physically present in the office suite (direct supervision) and immediately available.</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded border border-red-300 dark:border-red-800">
                  <span className="font-bold text-red-900 dark:text-red-300 font-mono text-sm block mb-1">
                    🛑 MUST BILL UNDER NPP NPI AT 85%:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-stone-700 dark:text-stone-300">
                    <li>The patient is a NEW patient to the practice.</li>
                    <li>An established patient presents with a NEW medical complaint (e.g., knee pain in a diabetic patient).</li>
                    <li>The supervising physician is off-site (hospital rounds, vacation, working remotely).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                OIG Audit Defense: The 3 Cardinal Rules of Medical Necessity
              </h4>
              <p className="leading-relaxed">
                Medicare Title XVIII § 1862(a)(1)(A) states that no payment may be made for expenses incurred for items or services which are <strong>not reasonable and necessary</strong> for the diagnosis or treatment of illness or injury.
              </p>

              <div className="space-y-3 mt-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-amber-900 dark:text-amber-300 font-serif">1. Avoid "Copy-and-Paste" / Note Bloat:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    EHR cloning (cloning identical physical exam paragraphs from past visits) is the #1 red flag triggering RAC (Recovery Audit Contractor) clawbacks. Notes must show date-specific progress.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-amber-900 dark:text-amber-300 font-serif">2. Chief Complaint Cannot Be "Follow-Up":</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    A chief complaint of simply "Follow-up" or "Recheck" lacks medical necessity. It must specify the condition: "Follow-up of Stage 2 Hypertension and worsening headaches."
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  <strong className="text-amber-900 dark:text-amber-300 font-serif">3. Time-Based Billing Requirements:</strong>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    If billing E/M codes by time rather than MDM, the note must explicitly document: (1) Total exact minutes spent on date of encounter, and (2) itemized activities performed (e.g., 35 minutes spent reviewing outside MRI, counseling patient on chemotherapy risks, coordinating home health care).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('registration')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 3 Registration
          </button>

          <button
            onClick={() => setActiveModule('transcription')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 5: Medical Transcription</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

