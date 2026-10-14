import React, { useState } from 'react';
import { 
  PhoneForwarded, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  MessageSquare, 
  ArrowRight, 
  Search, 
  ShieldAlert, 
  FileCheck, 
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  GitFork
} from 'lucide-react';
import { 
  AR_SCENARIOS, 
  CARC_RARC_DICTIONARY, 
  FOUR_TIER_APPEAL_PROCESS 
} from '../../data/arScenarios';
import { ArScenario, CarcRarcDetail } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module6ArPlaybook: React.FC = () => {
  const { progress, markModuleCompleted, toggleBookmarkDenial } = useAcademy();
  const [activeTab, setActiveTab] = useState<'scenarios' | 'carc-dict' | 'appeals'>('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<ArScenario>(AR_SCENARIOS[0]);
  const [scenarioSearch, setScenarioSearch] = useState('');
  const [carcSearch, setCarcSearch] = useState('');

  const isCompleted = progress.completedModules.includes('ar-playbook');

  const filteredScenarios = AR_SCENARIOS.filter(s => {
    const q = scenarioSearch.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.definition.toLowerCase().includes(q) ||
      (s.carcCode && s.carcCode.toLowerCase().includes(q))
    );
  });

  const filteredCarcs = CARC_RARC_DICTIONARY.filter(c => {
    const q = carcSearch.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  const handleMarkComplete = () => {
    markModuleCompleted('ar-playbook');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  const isBookmarked = selectedScenario.carcCode 
    ? progress.bookmarkedDenials.includes(selectedScenario.carcCode)
    : false;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-health-darkCard to-health-darkCard border border-rose-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Module 6 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              The 14-Scenario AR Call & Denial Resolution Playbook
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Step-by-step interactive decision trees and verbatim call scripts for all 14 major healthcare claim scenarios, complete CARC/RARC dictionary, and the 4-tier appeal process.
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
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'scenarios'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>The 14 AR Call Scenarios & Decision Trees</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('carc-dict')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'carc-dict'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>CARC & RARC Quick-Lookup Dictionary</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appeals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'appeals'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>The 4-Tier Appeal Process</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 14 AR CALL SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: 14 Scenario List */}
            <div className="lg:col-span-5 bg-white dark:bg-health-darkCard rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Select AR Scenario (1 to 14)
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-rose-500">
                    Live Call Playbooks
                  </span>
                </div>

                <div className="relative mb-3">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={scenarioSearch}
                    onChange={e => setScenarioSearch(e.target.value)}
                    placeholder="Filter scenarios or CARC..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
                  {filteredScenarios.map(s => {
                    const isSelected = selectedScenario.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedScenario(s)}
                        className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/40 shadow-xs'
                            : 'bg-slate-50/50 dark:bg-health-darkSubtle/20 text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-bold truncate">{s.title}</div>
                          {s.carcCode && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {s.carcCode}
                            </span>
                          )}
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-rose-500' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>14 Scenarios cover &gt; 92% of everyday AR call volume</span>
              </div>
            </div>

            {/* Right: Selected Scenario Workflow & Call Script */}
            <div className="lg:col-span-7 bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black font-mono text-rose-500">
                      SCENARIO #{selectedScenario.id}
                    </span>
                    {selectedScenario.carcCode && (
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        {selectedScenario.carcCode}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedScenario.title}
                  </h2>
                </div>

                {selectedScenario.carcCode && (
                  <button
                    type="button"
                    onClick={() => toggleBookmarkDenial(selectedScenario.carcCode!)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors shrink-0 ${
                      isBookmarked
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-amber-500'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{isBookmarked ? 'Saved' : 'Bookmark Code'}</span>
                  </button>
                )}
              </div>

              {/* Definition */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Clinical & Adjudicative Definition:
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedScenario.definition}
                </p>
              </div>

              {/* Common Causes */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Common Root Causes:
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {selectedScenario.commonCauses.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Resolution Workflow */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Step-by-Step Resolution Workflow:
                </div>
                <div className="space-y-2">
                  {selectedScenario.stepByStepWorkflow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verbatim Questions to Ask the Rep */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  Verbatim Questions to Ask the Insurance Representative:
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-200 leading-relaxed">
                  {selectedScenario.questionsForRep.map((q, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro-Tips */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Pro AR Tips:
                </span>
                {selectedScenario.proTips.map((tip, i) => (
                  <p key={i} className="pl-4 border-l-2 border-amber-500/40">{tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CARC & RARC DICTIONARY */}
      {activeTab === 'carc-dict' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                CARC & RARC Quick-Lookup Dictionary
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Claim Adjustment Reason Codes (CARC) and Remittance Advice Remark Codes (RARC)
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={carcSearch}
                onChange={e => setCarcSearch(e.target.value)}
                placeholder="Search code (e.g. CO-16, CO-29)..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCarcs.map(carc => (
              <div
                key={carc.code}
                id={`carc-${carc.code.toLowerCase().replace('/', '-')}`}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-base font-black px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      {carc.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {carc.type} Code
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {carc.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {carc.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700 dark:text-slate-200">Associated RARCs: </span>
                      {carc.associatedCodes.join(' • ')}
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700 dark:text-slate-200">Root Cause: </span>
                      {carc.rootCause}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-health-electric">Resolution Strategy: </span>
                  <span className="text-slate-600 dark:text-slate-300">{carc.resolutionStrategy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 4-TIER APPEAL PROCESS */}
      {activeTab === 'appeals' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              The 4-Tier Healthcare Claim Appeal Hierarchy
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When an insurance company wrongfully denies a claim, exhaust these four sequential legal and clinical levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {FOUR_TIER_APPEAL_PROCESS.map((tier, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black font-mono text-rose-500 mb-1">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {tier.tier}
                  </h3>

                  <div className="text-[11px] font-mono text-emerald-500 font-semibold mt-1">
                    Timeline: {tier.timeline}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Reviewer Target: </span>
                  {tier.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
