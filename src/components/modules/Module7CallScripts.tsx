import React, { useState } from 'react';
import { 
  Headphones, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  UserCheck, 
  PhoneCall, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { 
  NATO_ALPHABET, 
  NUMBER_PHONETICS, 
  CALL_SCRIPTS 
} from '../../data/natoAndScripts';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module7CallScripts: React.FC = () => {
  const { progress, markModuleCompleted } = useAcademy();
  const [activeTab, setActiveTab] = useState<'nato' | 'scripts'>('nato');

  // NATO Converter State
  const [inputPolicyId, setInputPolicyId] = useState('W1298X4B');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Script Dynamic Inputs
  const [selectedScriptId, setSelectedScriptId] = useState(CALL_SCRIPTS[0].id);
  const [mockCallerName, setMockCallerName] = useState('Alex Rivera');
  const [mockProviderName, setMockProviderName] = useState('Metro Health Specialists');
  const [mockBillingNpi, setMockBillingNpi] = useState('1982736450');
  const [mockTaxId, setMockTaxId] = useState('12-3456789');
  const [mockPatientFirst, setMockPatientFirst] = useState('Arthur');
  const [mockPatientLast, setMockPatientLast] = useState('Dent');
  const [mockPatientDob, setMockPatientDob] = useState('1984-07-21');
  const [mockMemberId, setMockMemberId] = useState('UHC98234190');
  const [mockDos, setMockDos] = useState('2025-02-10');
  const [mockCpt, setMockCpt] = useState('73721'); // Knee MRI

  const isCompleted = progress.completedModules.includes('call-scripts');

  // Convert string to NATO words
  const convertToNato = (str: string): string[] => {
    const chars = str.toUpperCase().replace(/[^A-Z0-9]/g, '').split('');
    return chars.map(char => {
      if (char >= '0' && char <= '9') {
        return NUMBER_PHONETICS[char] || char;
      }
      const match = NATO_ALPHABET.find(item => item.letter === char);
      return match ? match.word : char;
    });
  };

  const natoWords = convertToNato(inputPolicyId);
  const natoPhoneticString = natoWords.join(' - ');

  // Web Speech API text-to-speech for NATO words
  const speakNato = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = natoWords.join(', ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.85; // Slightly slower for clear telephone cadence
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  // Find active script
  const activeScript = CALL_SCRIPTS.find(s => s.id === selectedScriptId) || CALL_SCRIPTS[0];

  // Helper to replace placeholders dynamically
  const formatDialogue = (text: string) => {
    const memberIdNato = convertToNato(mockMemberId).join(' - ');
    const patientNameNato = `${mockPatientFirst} ${mockPatientLast} (${convertToNato(mockPatientLast).join('-')})`;

    return text
      .replace(/\[Caller Name\]/g, mockCallerName)
      .replace(/\[Provider Name\]/g, mockProviderName)
      .replace(/\[Hospital Name\]/g, mockProviderName)
      .replace(/\[Billing NPI\]/g, mockBillingNpi)
      .replace(/\[Tax ID\]/g, mockTaxId)
      .replace(/\[Provider Address\]/g, '450 Medical Pkwy, Austin TX')
      .replace(/\[Rendering Doctor Name\]/g, 'Michael Scott MD')
      .replace(/\[Rendering NPI\]/g, '1457896321')
      .replace(/\[Patient First Name\]/g, mockPatientFirst)
      .replace(/\[Patient Last Name\]/g, mockPatientLast)
      .replace(/\[Patient Name Phonetic\]/g, patientNameNato)
      .replace(/\[Patient DOB\]/g, mockPatientDob)
      .replace(/\[Member ID\]/g, mockMemberId)
      .replace(/\[Member ID Phonetic\]/g, `${mockMemberId} (${memberIdNato})`)
      .replace(/\[DOS\]/g, mockDos)
      .replace(/\[Procedure Code\]/g, mockCpt)
      .replace(/\[Billed Amount\]/g, '1,450.00');
  };

  const handleMarkComplete = () => {
    markModuleCompleted('call-scripts');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-health-darkCard to-health-darkCard border border-indigo-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Module 7 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Live Call Scripts & NATO Phonetic Trainer
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Eliminate audio miscommunication on insurance follow-up calls. Convert Policy IDs and NPIs into NATO military phonetics with real speech pronunciation, and practice dynamic call roleplay scripts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkComplete}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 self-start sm:self-auto ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{isCompleted ? 'Module Completed!' : 'Mark Module Done'}</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('nato')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'nato'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>NATO Phonetic Alphabet & Policy ID Audio Converter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scripts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'scripts'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dynamic Telephonic Roleplay Scripts</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NATO PHONETIC ALPHABET & LIVE AUDIO CONVERTER */}
      {activeTab === 'nato' && (
        <div className="space-y-8">
          {/* Live Converter Card */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Live Member ID & NPI Phonetic Audio Converter
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Type any alphanumeric Policy Number, NPI, or Claim ICN to hear and read the standard NATO phone script
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Input Area */}
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Type Alphanumeric ID:
                </label>
                <input
                  type="text"
                  value={inputPolicyId}
                  onChange={e => setInputPolicyId(e.target.value.toUpperCase())}
                  placeholder="e.g. W1298X4B"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 self-center mr-1">Quick Presets:</span>
                  {['W1298X4B', 'K8920194A', 'Z1094827X', 'BCBS77610'].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setInputPolicyId(preset)}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 border border-slate-200 dark:border-slate-700"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output & Speech Player */}
              <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>CALL SCRIPT VERBATIM PRONUNCIATION:</span>
                    <span className="text-emerald-400 font-bold">{natoWords.length} Characters</span>
                  </div>

                  <div className="font-mono text-base sm:text-lg font-bold text-indigo-300 leading-relaxed min-h-[3rem] p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {natoPhoneticString || 'Enter characters above'}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={isPlayingAudio ? stopSpeaking : speakNato}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm ${
                      isPlayingAudio
                        ? 'bg-rose-600 text-white hover:bg-rose-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Speech</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Phone Pronunciation</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-slate-400">
                    Cadenced audio output for clear telephonic transcription
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full A-Z NATO Reference Grid */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Standard Military / Aviation NATO Alphabet (A – Z)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Never use confusing informal names like "Mary", "Nancy", or "Zebra"; use standard words to eliminate claim number errors
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 pt-2">
              {NATO_ALPHABET.map(item => (
                <div
                  key={item.letter}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-2xl font-black text-indigo-500">
                      {item.letter}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.phonetic}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    {item.word}
                  </div>

                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {item.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DYNAMIC CALL SCRIPTS */}
      {activeTab === 'scripts' && (
        <div className="space-y-8">
          {/* Mock Input Sandbox Drawer */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Dynamic Caller & Patient Profile Variables
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update mock details below to dynamically populate all dialogue bubbles in real time
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">Caller Name</label>
                <input
                  type="text"
                  value={mockCallerName}
                  onChange={e => setMockCallerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">Provider Entity</label>
                <input
                  type="text"
                  value={mockProviderName}
                  onChange={e => setMockProviderName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">Billing NPI</label>
                <input
                  type="text"
                  value={mockBillingNpi}
                  onChange={e => setMockBillingNpi(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">Patient Name</label>
                <input
                  type="text"
                  value={`${mockPatientFirst} ${mockPatientLast}`}
                  onChange={e => {
                    const parts = e.target.value.split(' ');
                    setMockPatientFirst(parts[0] || '');
                    setMockPatientLast(parts.slice(1).join(' ') || '');
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">Member ID</label>
                <input
                  type="text"
                  value={mockMemberId}
                  onChange={e => setMockMemberId(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-0.5">CPT Procedure</label>
                <input
                  type="text"
                  value={mockCpt}
                  onChange={e => setMockCpt(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Script Selection Bar */}
          <div className="flex flex-wrap gap-2">
            {CALL_SCRIPTS.map(sc => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedScriptId(sc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedScriptId === sc.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-health-darkCard text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {sc.name} ({sc.duration})
              </button>
            ))}
          </div>

          {/* Active Script Dialogue Waterfall */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500">
                TELEPHONIC CALL SIMULATION
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {activeScript.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Target Objective: {activeScript.targetObjective} • Estimated Call Time: {activeScript.duration}
              </p>
            </div>

            <div className="space-y-6">
              {activeScript.sections.map((sec, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/20 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono font-bold">
                        {idx + 1}
                      </span>
                      {sec.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 italic">
                      Tip: {sec.notes}
                    </span>
                  </div>

                  {/* Caller Dialogue */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                      You (AR Specialist / Caller):
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                      {formatDialogue(sec.callerDialogue)}
                    </p>
                  </div>

                  {/* Representative Expected Reply */}
                  <div className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Payer Representative (Expected Response):
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      {sec.repExpectedDialogue}
                    </p>
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
