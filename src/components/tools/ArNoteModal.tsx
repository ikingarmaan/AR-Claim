import React, { useState } from 'react';
import { X, FileText, Copy, Check, Save, Trash2, History } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

interface ArNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArNoteModal: React.FC<ArNoteModalProps> = ({ isOpen, onClose }) => {
  const { progress, saveArNote, deleteArNote } = useAcademy();
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  
  // 6 mandatory audit fields + claim info
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [repName, setRepName] = useState('Jessica Miller');
  const [callRef, setCallRef] = useState('REF-984012-AETNA');
  const [claimStatus, setClaimStatus] = useState('Paid - Check Dispatched');
  const [actionTaken, setActionTaken] = useState('Verified claim adjudicated on 02/14/2025. Allowed $180.00, Paid $140.00 via check #88901 mailed 02/18/2025 to lockbox. $40 assigned to PR-3 copay. Billed patient statement.');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  const [patientName, setPatientName] = useState('Robert Chen');
  const [dos, setDos] = useState('2025-01-20');
  const [claimNumber, setClaimNumber] = useState('202501209941X');
  const [billedAmount, setBilledAmount] = useState('290.00');

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const generatedNoteText = `[AR CALL AUDIT LOG]
DATE OF CALL: ${date}
PATIENT: ${patientName} | DOS: ${dos} | CLAIM/ICN: ${claimNumber} | BILLED: $${billedAmount}
INSURANCE REP: ${repName}
CALL REFERENCE #: ${callRef}
CURRENT CLAIM STATUS: ${claimStatus}
ACTION TAKEN / SUMMARY: ${actionTaken}
NEXT FOLLOW-UP DATE: ${nextFollowUpDate}
AUDIT TRAIL: Compliant 6-Point Documentation Verified`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    saveArNote({
      date,
      repName,
      callRef,
      claimNumber,
      patientName,
      dos,
      billedAmount,
      status: claimStatus,
      actionTaken,
      nextFollowUpDate
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-health-darkCard rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-health-darkSubtle/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-health-electric/10 text-health-electric border border-health-electric/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Interactive AR Note Builder
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Generate compliant 6-point audit notes for PM / EHR systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'create'
                    ? 'bg-white dark:bg-health-darkCard text-health-electric shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Builder
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-health-darkCard text-health-electric shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Saved ({progress.savedNotes.length})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'create' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Form Fields */}
              <div className="space-y-4 text-xs">
                <div className="font-semibold text-slate-700 dark:text-slate-300 pb-1 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span>6 Mandatory Audit Trail Fields</span>
                  <span className="text-[10px] text-emerald-500 font-bold">100% Required</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">1. Date of Follow-up *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">2. Insurance Rep Name *</label>
                    <input
                      type="text"
                      value={repName}
                      onChange={e => setRepName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">3. Call Reference # *</label>
                    <input
                      type="text"
                      value={callRef}
                      onChange={e => setCallRef(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">4. Current Claim Status *</label>
                    <input
                      type="text"
                      value={claimStatus}
                      onChange={e => setClaimStatus(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">5. Action Taken & Financial Summary *</label>
                  <textarea
                    rows={3}
                    value={actionTaken}
                    onChange={e => setActionTaken(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">6. Next Follow-up Date *</label>
                    <input
                      type="date"
                      value={nextFollowUpDate}
                      onChange={e => setNextFollowUpDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Billed Charge ($)</label>
                    <input
                      type="text"
                      value={billedAmount}
                      onChange={e => setBilledAmount(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-0.5">Patient Name</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-0.5">Date of Service</label>
                    <input
                      type="date"
                      value={dos}
                      onChange={e => setDos(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-0.5">Claim / ICN #</label>
                    <input
                      type="text"
                      value={claimNumber}
                      onChange={e => setClaimNumber(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Live Formatted Output */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Live Output (EHR Ready)
                    </span>
                    <span className="text-[10px] text-health-electric font-mono">
                      Standardized Format
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800 h-64 overflow-y-auto whitespace-pre-wrap select-all">
                    {generatedNoteText}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-health-electric text-white text-xs font-semibold hover:bg-health-electricDark transition-colors shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Note'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    {savedSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                    <span>{savedSuccess ? 'Saved!' : 'Save Note'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* History Tab */
            <div className="space-y-3">
              {progress.savedNotes.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No saved AR notes yet. Create and save notes to keep a practice history.
                </div>
              ) : (
                progress.savedNotes.map(item => (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-health-darkSubtle/20 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{item.patientName}</span>
                        <span className="text-slate-400">• DOS: {item.dos}</span>
                        <span className="text-health-electric font-mono font-medium">Claim #{item.claimNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">{item.date}</span>
                        <button
                          type="button"
                          onClick={() => deleteArNote(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Rep: </span>{item.repName} (Ref #{item.callRef}) | <span className="font-semibold">Status: </span>{item.status}
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                      {item.actionTaken}
                    </p>

                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Next Follow-up Date: {item.nextFollowUpDate}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
