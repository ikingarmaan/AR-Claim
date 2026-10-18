import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const Stage1Appointment: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('appointment');

  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'checklist' | 'traps'>('overview');

  const handleNext = () => {
    setActiveModule('eligibility');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Conveyor Pipeline Diagram Banner */}
      <RcmPipelineFlow />

      {/* Main Manila Dossier */}
      <div className="skeuo-manila p-6 sm:p-8 rounded-xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Binder Clip */}
        <div className="absolute -top-4 left-10 w-16 h-8 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-md shadow-md border border-stone-500 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-blue-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 1 OF 10: FRONT-END
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                PRACTICE MANAGEMENT SYSTEM (PMS)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 1: Appointment Scheduling & Patient Intake
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              The revenue cycle begins the instant a patient calls or books an encounter. Over 40% of billing denials stem from clerical or insurance errors recorded during this initial phone call or online portal request.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              FRONT-END GATE
            </div>
            <button
              onClick={() => markModuleCompleted('appointment')}
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

        {/* Folder Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            📋 Core Principles & Intake Protocol
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'workflow'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            🔄 Step-by-Step Scheduling Flow
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'checklist'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            ✅ Mandatory Front-Desk Checklist
          </button>
          <button
            onClick={() => setActiveTab('traps')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'traps'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            ⚠️ High-Risk Denial Traps Originating Here
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                    Patient Identification
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    Capture legal name exactly as shown on the government-issued photo ID and current insurance card. Nicknames (e.g., "Bob" instead of "Robert") cause 100% clearinghouse rejections.
                  </p>
                </div>

                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                    Insurance Demographics
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    Record Payer ID, Policy/Member ID, Group Number, Subscriber DOB, and relationship to subscriber (Self, Spouse, Child, Other).
                  </p>
                </div>

                <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                    3
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                    Chief Complaint & Urgency
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    Determine reason for visit: Preventive Wellness, Acute Illness, Chronic Disease follow-up, Workers' Comp, or Auto Accident. Crucial for Box 10 on CMS-1500.
                  </p>
                </div>
              </div>

              {/* In-depth Training Paper */}
              <div className="skeuo-inset p-5 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-300 dark:border-stone-700 space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  Live Patient Intake Dialogue Standards (RCM Script)
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  When a patient schedules, the intake coordinator must ask 4 clarifying legal questions:
                </p>
                <ul className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2 list-disc pl-5">
                  <li>
                    <strong>"Is this visit related to an employment injury or a motor vehicle accident?"</strong> If yes, commercial medical insurance is NOT primary. Billing health insurance first results in CO-22 (Coordination of Benefits / Third Party Liability).
                  </li>
                  <li>
                    <strong>"Do you have more than one active health insurance policy?"</strong> Triggers Coordination of Benefits (COB) inquiry to determine Primary vs Secondary payer order.
                  </li>
                  <li>
                    <strong>"Do you have a required Primary Care Physician (PCP) referral or prior authorization?"</strong> HMO policies (e.g. Kaiser, Blue Cross HMO) will flatly deny specialist claims without a prior electronic referral loop.
                  </li>
                  <li>
                    <strong>"Are you the primary subscriber or a dependent?"</strong> Essential for filling CMS-1500 Boxes 4 (Insured's Name) and 7 (Insured's Address).
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="border-l-2 border-amber-600 pl-4 space-y-4">
                <div>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-400">STEP 1: INTAKE REQUEST</span>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Capture Identity & Chief Complaint</h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1">
                    Collect patient's legal name, date of birth, social security number (or Medicare MBI), contact address, phone number, and brief description of medical symptoms.
                  </p>
                </div>

                <div>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-400">STEP 2: PROVIDER MATCHING & TIME SLOT</span>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Template Scheduling & Appointment Duration</h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1">
                    Match patient with credentialed provider. New patient visits typically require 30–45 minute template slots (CPT 99203/99204), while established patients receive 15–20 minutes (CPT 99213/99214).
                  </p>
                </div>

                <div>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-400">STEP 3: PRE-REGISTRATION PACKET TRANSMISSION</span>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Digital Portal Onboarding</h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1">
                    Send HIPAA Notice of Privacy Practices, Medical History questionnaire, and Photo ID/Card upload link via SMS/Email 48 hours prior to encounter.
                  </p>
                </div>

                <div>
                  <span className="font-mono font-bold text-amber-800 dark:text-amber-400">STEP 4: HANDOFF TO STAGE 2</span>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">Automated 270 Eligibility Queue Trigger</h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1">
                    The PMS automatically transmits an EDI 270 Inquiry transaction to the payer's gateway 48 hours before the scheduled appointment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                Mandatory Fields Required Before Scheduling Confirmation:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Patient Legal Last Name, First Name, Middle Initial',
                  'Date of Birth (MM/DD/YYYY)',
                  'Residential Physical Address with 9-digit ZIP+4',
                  'Primary Contact Mobile Phone & Email',
                  'Emergency Contact Name, Relationship & Phone',
                  'Primary Health Plan Name & 5-Digit Payer ID',
                  'Member ID (Include alpha prefixes, e.g., "XYZ123456")',
                  'Group Number (From face of insurance card)',
                  'Subscriber / Policyholder Details (if patient is dependent)',
                  'Accident / Third-Party Liability Indicator (Auto/Workers Comp)',
                  'Referring Physician Name & NPI (if HMO policy)',
                  'Special Needs / Language Interpreter Requirements'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="text-stone-800 dark:text-stone-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'traps' && (
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 text-xs">
                <span className="font-bold text-red-900 dark:text-red-300 font-mono">DENIAL CODE CO-16 / REJECTION: Missing / Incorrect DOB</span>
                <p className="text-red-800 dark:text-red-300 mt-1">
                  Transposing digits in the date of birth (e.g. 05/12/1982 instead of 12/05/1982) causes the payer's EDI gateway to return "Member not found" on 100% of claims.
                </p>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 text-xs">
                <span className="font-bold text-red-900 dark:text-red-300 font-mono">DENIAL CODE CO-22: Coordination of Benefits (COB) Mismatch</span>
                <p className="text-red-800 dark:text-red-300 mt-1">
                  Failing to ask about auto accidents or secondary coverage results in claims being submitted to the wrong payer first. The primary payer will demand proof of prior payer denial.
                </p>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 text-xs">
                <span className="font-bold text-red-900 dark:text-red-300 font-mono">DENIAL CODE CO-27: Coverage Terminated Prior to Date of Service</span>
                <p className="text-red-800 dark:text-red-300 mt-1">
                  Accepting an old card on file without confirming active status at appointment scheduling means the practice provides services to an uninsured patient without cash-pay consent.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <div className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold">
            COMPLETED: 1 / 10 STAGES
          </div>

          <button
            onClick={handleNext}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 2: Eligibility Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

