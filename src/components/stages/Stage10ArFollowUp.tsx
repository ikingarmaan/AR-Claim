import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { ArAgingBuckets } from '../diagrams/ArAgingBuckets';
import { DenialResolution } from '../diagrams/DenialResolution';
import { 
  PhoneCall, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Bookmark,
  Send,
  FileCheck2,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { AR_SCENARIOS } from '../../data/arScenarios';
import { NATO_ALPHABET } from '../../data/natoAndScripts';
import { JobNotesStudyDesk } from '../dashboard/JobNotesStudyDesk';

export const Stage10ArFollowUp: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress, toggleBookmarkDenial, saveArNote } = useAcademy();
  const isCompleted = progress.completedModules.includes('ar-followup') || progress.completedModules.includes('ar-playbook');

  const [activeTab, setActiveTab] = useState<'aging' | 'denials' | 'scripts' | 'simulator' | 'jobs-notes'>('aging');

  // Phone Call Simulator State
  const [repName, setRepName] = useState('Jennifer Brooks');
  const [callRef, setCallRef] = useState('REF-99214-BCBS');
  const [claimNum, setClaimNum] = useState('ICN-2026101899');
  const [patientName, setPatientName] = useState('Eleanor Vance');
  const [dos, setDos] = useState('2026-08-12');
  const [billedAmt, setBilledAmt] = useState('450.00');
  const [status, setStatus] = useState('In Process / Check Issued');
  const [actionTaken, setActionTaken] = useState('Rep confirmed claim finalized on 10/16. Check #ACH-88912 issued for $280.00 allowable. $100 assigned to PR-1 deductible.');
  const [followUpDate, setFollowUpDate] = useState('2026-11-01');
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveSimNote = () => {
    saveArNote({
      date: new Date().toISOString().split('T')[0],
      repName,
      callRef,
      claimNumber: claimNum,
      patientName,
      dos,
      billedAmount: billedAmt,
      status,
      actionTaken,
      nextFollowUpDate: followUpDate
    });
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  };

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
              <span className="skeuo-badge bg-rose-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 10 OF 10: BACK-END PINNACLE
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                A/R AGING • DENIAL MANAGEMENT • CALL SIMULATOR • APPEALS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 10: Accounts Receivable (A/R) Follow-Up & Appeals
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              This is where revenue cycle professionals prove their value. Learn how to manage aging buckets, overturn unjust claim denials, navigate the 5-level Medicare appeal process, and execute professional payer phone inquiries.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              FULL PIPELINE MASTERED
            </div>
            <button
              onClick={() => markModuleCompleted('ar-followup')}
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
            onClick={() => setActiveTab('aging')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'aging'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📊 A/R Aging Buckets & KPIs
          </button>
          <button
            onClick={() => setActiveTab('denials')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'denials'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🛡️ Denial Management & Appeal Ladder
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'scripts'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📞 NATO Phonetic & Representative Scripts
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'simulator'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📝 Live Call Documentation Simulator
          </button>
          <button
            onClick={() => setActiveTab('jobs-notes')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
              activeTab === 'jobs-notes'
                ? 'bg-amber-900 text-white border-amber-950 -mb-[1px] shadow-sm'
                : 'bg-amber-100/70 dark:bg-amber-950/40 border-transparent text-amber-950 dark:text-amber-200 hover:text-amber-900'
            }`}
          >
            <span>💼 Jobs Notes & Interview Q&A (44+)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'aging' && (
            <div>
              <ArAgingBuckets />
            </div>
          )}

          {activeTab === 'denials' && (
            <div>
              <DenialResolution />

              {/* Denial Scenarios Interactive Library */}
              <div className="mt-8">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base mb-3">
                  Top 5 High-Impact Denial Action Playbooks:
                </h4>
                <div className="space-y-3">
                  {AR_SCENARIOS.slice(0, 5).map(scen => {
                    const code = scen.carcCode || 'CO-16';
                    const isBookmarked = progress.bookmarkedDenials.includes(code);
                    return (
                      <div key={scen.id} className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300 dark:border-red-700">
                              {code}
                            </span>
                            <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                              {scen.title}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleBookmarkDenial(code)}
                            className={`p-1.5 rounded transition-colors ${
                              isBookmarked
                                ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/50'
                                : 'text-stone-400 hover:text-stone-600'
                            }`}
                            title="Bookmark Denial Scenario"
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                          <strong>Root Cause:</strong> {scen.definition}
                        </p>

                        <div className="mt-2.5 p-3 bg-white dark:bg-stone-900/80 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs">
                          <strong className="text-emerald-800 dark:text-emerald-400 font-mono">RESOLUTION PLAYBOOK:</strong>
                          <p className="mt-1 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {scen.stepByStepWorkflow.join(' ')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              {/* NATO Phonetic Alphabet */}
              <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                  MANDATORY CALL CENTER PHONETICS
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  NATO Phonetic Alphabet for ICN & Member IDs
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Never say "B as in Boy" or "P as in Peter". Payer phone audio lines are compressed; professional collectors use standard ICAO/NATO phonetics to avoid costly digit transcription errors.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4 text-xs font-mono">
                  {NATO_ALPHABET.map(item => (
                    <div key={item.letter} className="p-2 bg-stone-50 dark:bg-stone-800 rounded border flex items-center justify-between">
                      <span className="font-bold text-amber-700">{item.letter}</span>
                      <span className="text-stone-700 dark:text-stone-300">{item.word}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Steps */}
              <div className="skeuo-inset p-5 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-300 dark:border-stone-700 space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  The 5 Mandatory Questions for Every Payer Phone Call:
                </h4>
                <ol className="space-y-2 list-decimal pl-5 text-xs text-stone-700 dark:text-stone-300">
                  <li><strong>Representative Identity:</strong> <em>"May I please have your full name and direct Call Reference Number for this call?"</em></li>
                  <li><strong>Claim Intake Verification:</strong> <em>"Can you confirm receipt of claim ICN [Number] for Date of Service [Date] in the billed amount of $[Amount]?"</em></li>
                  <li><strong>Adjudication Outcome:</strong> <em>"What was the check number or EFT trace number, payment date, and CAS reason codes assigned to line items?"</em></li>
                  <li><strong>Denial Specifics:</strong> <em>"If denied for records, what specific clinical documents are required, and what is your dedicated appeal fax number?"</em></li>
                  <li><strong>Timely Filing Window:</strong> <em>"What is the exact timely filing deadline from the initial remittance date to submit a formal Level 1 Redetermination?"</em></li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="skeuo-inset p-5 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-700">
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Live AR Note Documentation Engine
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                    Document every payer interaction. Saved notes appear in your persistent Bookmarks & Notes drawer.
                  </p>
                </div>
                {noteSaved && (
                  <span className="skeuo-stamp-approved text-xs px-2.5 py-1 font-mono uppercase">
                    SAVED TO LEDGER
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-mono font-bold block mb-1">Payer Rep Name:</label>
                  <input
                    type="text"
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Call Reference #:</label>
                  <input
                    type="text"
                    value={callRef}
                    onChange={(e) => setCallRef(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Claim ICN Number:</label>
                  <input
                    type="text"
                    value={claimNum}
                    onChange={(e) => setClaimNum(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Patient Name:</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Date of Service (DOS):</label>
                  <input
                    type="date"
                    value={dos}
                    onChange={(e) => setDos(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Billed Charge ($):</label>
                  <input
                    type="text"
                    value={billedAmt}
                    onChange={(e) => setBilledAmt(e.target.value)}
                    className="w-full p-2 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-xs">Payer Adjudication Status:</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 rounded border text-xs bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-xs">Detailed Call Action & Resolution Protocol:</label>
                <textarea
                  rows={3}
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  className="w-full p-2 rounded border text-xs bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <label className="font-mono font-bold">Next Follow-Up Date:</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="p-1.5 rounded border bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <button
                  onClick={handleSaveSimNote}
                  className="skeuo-btn-primary px-5 py-2 rounded-lg text-xs font-serif font-bold shadow flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Commit Note to Patient Ledger</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jobs-notes' && (
            <div>
              <JobNotesStudyDesk />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('payment-posting')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 9 Payment Posting
          </button>

          <button
            onClick={() => setActiveModule('quiz-engine')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Take Certification Exam (Quiz Engine)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
