import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldCheck, 
  UserCheck, 
  Copy, 
  Check, 
  HelpCircle, 
  AlertTriangle, 
  FileText, 
  Hospital, 
  Volume2, 
  Search, 
  Clock, 
  ChevronRight,
  BookOpen,
  Send,
  Zap,
  Activity,
  Calendar
} from 'lucide-react';
import { 
  NATO_ALPHABET_MASTER, 
  MASTER_CALL_SCRIPTS, 
  INPATIENT_ER_AUTH_WORKFLOW_STEPS,
  CallScriptDossier 
} from '../../data/callScriptsMasteryData';

export const CallScriptsMasteryDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scripts' | 'nato' | 'er-auth' | 'checklist'>('scripts');
  const [selectedScriptId, setSelectedScriptId] = useState<string>('gpd-eligibility-benefits');
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);

  // Interactive NATO Speller state
  const [spellerInput, setSpellerInput] = useState<string>('W98214470Z');

  const currentScript: CallScriptDossier = 
    MASTER_CALL_SCRIPTS.find(s => s.id === selectedScriptId) || MASTER_CALL_SCRIPTS[0];

  const handleCopyDialogue = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionIndex(index);
    setTimeout(() => setCopiedSectionIndex(null), 2500);
  };

  const handleCopyNote = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2500);
  };

  // Convert spellerInput to NATO tokens
  const spelledTokens = spellerInput.toUpperCase().split('').map(char => {
    const natoItem = NATO_ALPHABET_MASTER.find(n => n.letter === char);
    if (natoItem) {
      return { char, word: natoItem.word, phonetic: natoItem.phonetic, isLetter: true };
    }
    if (/\d/.test(char)) {
      return { char, word: `Digit ${char}`, phonetic: char, isLetter: false };
    }
    return { char, word: char, phonetic: char, isLetter: false };
  });

  return (
    <div className="skeuo-manila p-5 sm:p-7 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
        <div>
          <div className="flex items-center gap-2">
            <span className="skeuo-badge bg-rose-800 text-white font-mono text-xs px-2.5 py-1 rounded">
              COMMUNICATIONS MASTERCLASS
            </span>
            <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold">
              VERIFIED FIELD-TESTED PHONE SCRIPTS & NATO PHONETICS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <span>📞 Call Scripts & NATO Phonetic Alphabet</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 max-w-3xl leading-relaxed">
            Directly curated from real-world healthcare provider experience: comprehensive GPD verification script by Smriti (callback 251-260-8237), fast-paced short intake script by John, Haywood Regional Medical Centre ER Inpatient Auth by SAM_P, and the complete 26-letter NATO phonetic alphabet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-2deg]">
            5 DIALOGUE SCRIPTS
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
        <button
          onClick={() => setActiveTab('scripts')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'scripts'
              ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <PhoneCall className={`w-4 h-4 ${activeTab === 'scripts' ? 'text-white' : 'text-rose-700 dark:text-rose-400'}`} />
          <span>Interactive Call Scripts</span>
          <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">5</span>
        </button>

        <button
          onClick={() => setActiveTab('nato')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'nato'
              ? 'bg-amber-900 text-white border-amber-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${activeTab === 'nato' ? 'text-white' : 'text-amber-700 dark:text-amber-400'}`} />
          <span>NATO Alphabet & Speller</span>
          <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">A–Z</span>
        </button>

        <button
          onClick={() => setActiveTab('er-auth')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'er-auth'
              ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Hospital className={`w-4 h-4 ${activeTab === 'er-auth' ? 'text-white' : 'text-blue-700 dark:text-blue-400'}`} />
          <span>ER Inpatient Auth Deep-Dive</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'checklist'
              ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeTab === 'checklist' ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`} />
          <span>Mandatory Questions Checklist</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE CALL SCRIPTS */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          {/* Script Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {MASTER_CALL_SCRIPTS.map(script => {
              const isSelected = selectedScriptId === script.id;
              return (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-900 text-white border-rose-950 shadow-md ring-2 ring-rose-500/50'
                      : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-rose-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-rose-800 text-rose-100' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}>
                        {script.targetDuration}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-xs mt-1.5 line-clamp-2">
                      {script.title}
                    </h4>
                    <p className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? 'text-rose-100' : 'text-stone-800 dark:text-stone-200'}`}>
                      Persona: {script.callerPersona}
                    </p>
                  </div>
                  <div className={`mt-2 pt-1 border-t text-[10px] font-mono font-bold flex items-center justify-between ${
                    isSelected ? 'border-rose-800 text-rose-200' : 'border-stone-200 dark:border-stone-800 text-rose-700 dark:text-rose-400'
                  }`}>
                    <span>{isSelected ? 'Active Script' : 'Select'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Script Dossier Card */}
          <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 space-y-6">
            {/* Script Metadata Banner */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-900/80 rounded-xl border border-amber-300 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-900 dark:text-amber-400 uppercase">
                  ACTIVE SCENARIO DOSSIER
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mt-0.5">
                  {currentScript.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-700 dark:text-stone-300 font-sans mt-1">
                  <span><strong>Caller:</strong> {currentScript.callerPersona}</span>
                  <span><strong>Facility:</strong> {currentScript.facility}</span>
                  <span><strong>Duration:</strong> {currentScript.targetDuration}</span>
                </div>
              </div>

              <div className="shrink-0 p-2.5 bg-white dark:bg-stone-800 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-mono">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Standard Objective</span>
                <span className="text-stone-800 dark:text-stone-200 font-semibold">{currentScript.purpose}</span>
              </div>
            </div>

            {/* Verbatim Dialogue Flow Sections */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Step-by-Step Verbatim Dialogue Flow</span>
                <span className="text-xs font-mono font-normal text-stone-500">
                  ({currentScript.sections.length} sequential steps)
                </span>
              </h4>

              {currentScript.sections.map((section, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-800 text-white text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                        {section.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="skeuo-badge bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-[10px] px-2 py-0.5 rounded">
                        {section.badge}
                      </span>
                      <button
                        onClick={() => handleCopyDialogue(section.callerDialogue, idx)}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 flex items-center gap-1"
                        title="Copy caller dialogue to clipboard"
                      >
                        {copiedSectionIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Caller Dialogue Box */}
                  <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/60">
                    <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 uppercase block mb-1">
                      🗣️ What You Say (Caller Dialogue):
                    </span>
                    <p className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-sans leading-relaxed whitespace-pre-line font-medium">
                      {section.callerDialogue}
                    </p>
                  </div>

                  {/* Expected Rep Response Box */}
                  {section.repExpectedResponse && (
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                      <span className="text-[10px] font-mono font-bold text-blue-900 dark:text-blue-300 uppercase block mb-1">
                        🎧 Expected Payer Representative Response:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-sans leading-relaxed italic">
                        {section.repExpectedResponse}
                      </p>
                    </div>
                  )}

                  {/* Action Items & Key Rules */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <strong className="text-emerald-800 dark:text-emerald-400 font-serif block mb-1">
                        ✓ Action Checklist:
                      </strong>
                      <ul className="space-y-1 text-stone-700 dark:text-stone-300 font-sans">
                        {section.actionItems.map((act, aIdx) => (
                          <li key={aIdx}>• {act}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <strong className="text-rose-800 dark:text-rose-400 font-serif block mb-1">
                        ⚠ Field Rules & Pitfalls:
                      </strong>
                      <ul className="space-y-1 text-stone-700 dark:text-stone-300 font-sans">
                        {section.keyRules.map((rule, rIdx) => (
                          <li key={rIdx}>• {rule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Post-Call Ledger Documentation Dossier */}
            <div className="p-5 bg-stone-100 dark:bg-stone-900 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>📋 Standard Post-Call Ledger Documentation</span>
                  </h4>
                  <p className="text-xs text-stone-800 dark:text-stone-200">
                    Never end a phone call without logging this exact audit entry into your PMS / billing software.
                  </p>
                </div>

                <button
                  onClick={() => handleCopyNote(currentScript.postCallDocumentation.sampleLedgerNote)}
                  className="px-3 py-1.5 text-xs font-serif font-bold rounded bg-amber-800 text-white hover:bg-amber-900 flex items-center gap-1.5 shadow-sm"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Note Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Note</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample Note Box */}
              <div className="p-3 bg-white dark:bg-stone-950 rounded-lg border border-stone-300 dark:border-stone-800 font-mono text-xs text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                {currentScript.postCallDocumentation.sampleLedgerNote}
              </div>

              <div className="text-xs text-stone-800 dark:text-stone-200 font-sans flex items-start gap-1.5 pt-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Escalation Trigger: </strong>
                  {currentScript.postCallDocumentation.escalationTrigger}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NATO PHONETIC ALPHABET & REAL-TIME SPELLER */}
      {activeTab === 'nato' && (
        <div className="space-y-6">
          {/* Interactive Speller Widget */}
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                INTERACTIVE INSTRUMENT
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-0.5">
                Real-Time NATO Phonetic Speller for Member IDs & ICNs
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                Type any patient Member ID, Payer Reference #, or Provider Taxonomy below to generate the exact phonetics to read aloud to the insurance representative.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                type="text"
                value={spellerInput}
                onChange={(e) => setSpellerInput(e.target.value)}
                placeholder="Enter Member ID (e.g. U42Z9981 or ICN 2026101899)..."
                className="flex-1 p-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 font-mono text-sm uppercase text-stone-900 dark:text-stone-100 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() => setSpellerInput('W98214470Z')}
                className="px-3 py-2 text-xs font-mono rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300"
              >
                Sample 1 (W98214470Z)
              </button>
              <button
                onClick={() => setSpellerInput('1Z2A3B4CD5')}
                className="px-3 py-2 text-xs font-mono rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300"
              >
                Sample 2 (MBI 1Z2A3B4CD5)
              </button>
            </div>

            {/* Spelled Out Result Chips */}
            <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700">
              <span className="text-[11px] font-mono text-stone-500 uppercase block mb-2 font-bold">
                Spoken Representation:
              </span>
              <div className="flex flex-wrap gap-2">
                {spelledTokens.map((t, i) => (
                  <div 
                    key={i}
                    className={`p-2 rounded-lg border text-center min-w-[70px] ${
                      t.isLetter
                        ? 'bg-amber-100/80 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                        : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    <span className="text-lg font-mono font-bold block">{t.char}</span>
                    <span className="text-[11px] font-serif font-semibold block">{t.word}</span>
                    <span className="text-[9px] font-mono text-stone-500 block">({t.phonetic})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full 26-Letter NATO Master Grid */}
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Full 26-Letter NATO Phonetic Alphabet Master Directory
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  Official ICAO / NATO phonetic code words used across healthcare call centers to eliminate communication errors.
                </p>
              </div>
              <span className="skeuo-badge bg-amber-800 text-white font-mono text-xs px-2.5 py-1 rounded">
                26 OFFICIAL LETTERS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NATO_ALPHABET_MASTER.map(item => (
                <div 
                  key={item.letter}
                  className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 flex flex-col justify-between hover:border-amber-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-amber-800 text-white font-mono font-bold text-base flex items-center justify-center">
                        {item.letter}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                          {item.word}
                        </h4>
                        <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
                          {item.phonetic}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-stone-500">Letter {item.letter}</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] space-y-1">
                    <div className="text-stone-800 dark:text-stone-200 font-sans">
                      <strong className="text-stone-800 dark:text-stone-200">Rule: </strong>{item.tip}
                    </div>
                    <div className="p-1.5 bg-stone-50 dark:bg-stone-950/50 rounded text-[10px] font-mono text-stone-700 dark:text-stone-300">
                      {item.medicalExample}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ER INPATIENT AUTH DEEP-DIVE */}
      {activeTab === 'er-auth' && (
        <div className="space-y-6">
          <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-400 uppercase">
                HAYWOOD REGIONAL MEDICAL CENTRE PROTOCOL
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mt-0.5">
                Emergency Inpatient Admission Pre-Certification Workflow
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
                When a patient is admitted to an acute inpatient hospital bed through the Emergency Department, the hospital must initiate pre-certification within 24 to 48 hours to avoid catastrophic CO-197 timely notification denials.
              </p>
            </div>

            {/* Verbatim Script Callout */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800">
              <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-300 uppercase block mb-1">
                Verbatim Opening Script Line (SAM_P):
              </span>
              <p className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 leading-relaxed italic">
                "HI MY NAME IS SAM_P, I'M CALLING FROM FACILITY Haywood Regional Medical Centre, Please note that this call may be recorded for quality assurance and training purposes.”, TODAY I WANT TO START A NEW INPT AUTH THROUGH ER VISIT, COULD YOU PLEASE HELP ME...."
              </p>
            </div>

            {/* 5 Operational Steps */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                The 5 Hospital Utilization Review Steps for ER Inpatient Admissions:
              </h4>

              {INPATIENT_ER_AUTH_WORKFLOW_STEPS.map(item => (
                <div 
                  key={item.step}
                  className="p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-950/60 rounded border text-xs font-mono text-stone-800 dark:text-stone-200">
                    <strong className="text-blue-900 dark:text-blue-300">Clinical Records Required: </strong>
                    {item.clinicalDocsNeeded.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MANDATORY QUESTIONS CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                A/R CALL AUDIT PROTOCOL
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-0.5">
                The 7 Mandatory Questions Before Hanging Up Any Insurance Call
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                Field rule: Never hang up with an insurance representative until every single one of these 7 questions is answered and recorded in your call notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  number: 1,
                  question: 'Representative Full Name & Operator ID',
                  whyItMatters: 'If the payer gives false or contradictory information, having the representative\'s name and ID allows you to hold them accountable during formal appeals.',
                  exactPhrase: '"May I please have your full first and last name, along with your direct representative operator ID?"'
                },
                {
                  number: 2,
                  question: 'Call Reference Number (Golden Ticket)',
                  whyItMatters: 'Mandatory proof in appeal packets. Proves the clinic verified benefits or followed up within the statutory timely filing window.',
                  exactPhrase: '"Can you provide the Call Reference Number for today\'s call for our audit documentation?"'
                },
                {
                  number: 3,
                  question: 'Policy Active Status on exact Date of Service (DOS)',
                  whyItMatters: 'A policy may be active today but terminated on the DOS, or vice-versa. Never accept a blanket "yes, active" without tying it to the DOS.',
                  exactPhrase: '"Can you confirm the policy was fully active with no gaps on [DOS], and provide the exact effective and termination dates?"'
                },
                {
                  number: 4,
                  question: 'Coordination of Benefits (COB) & Secondary Coverage',
                  whyItMatters: 'If the patient has other primary coverage, the claim will deny CO-22. Confirming COB upfront prevents 60–90 days of revenue delays.',
                  exactPhrase: '"Is there any other active primary or secondary coverage on file for this member, and when was COB last updated?"'
                },
                {
                  number: 5,
                  question: 'Deductible (Met vs Unmet) & Out-of-Pocket Max',
                  whyItMatters: 'Allows front desk to collect patient deductible at check-in instead of sending costly paper statements after the fact.',
                  exactPhrase: '"What is the annual individual deductible, how much has been satisfied to date, and what is the remaining out-of-pocket maximum?"'
                },
                {
                  number: 6,
                  question: 'Prior Authorization & Referral Requirements',
                  whyItMatters: 'Prevents unappealable CO-197 denials. Some commercial HMOs require both a PCP referral AND a prior authorization.',
                  exactPhrase: '"Does CPT [Code] require prior authorization or pre-certification, and does this plan require a PCP specialist referral?"'
                },
                {
                  number: 7,
                  question: 'Timely Filing Limit & Dedicated Appeal Fax Number',
                  whyItMatters: 'Different payers enforce 90, 180, or 365 day timely filing limits. Knowing the appeal fax number speeds up recovery.',
                  exactPhrase: '"What is your exact timely filing limit from DOS, and what is your dedicated claims intake or appeal fax number?"'
                }
              ].map(item => (
                <div 
                  key={item.number}
                  className="p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {item.number}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {item.question}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-800 dark:text-stone-200 font-sans">
                    <strong>Why It Matters: </strong>{item.whyItMatters}
                  </p>
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-900 text-xs font-mono text-emerald-950 dark:text-emerald-200 italic">
                    {item.exactPhrase}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
