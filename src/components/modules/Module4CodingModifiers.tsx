import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Sliders, 
  DollarSign, 
  AlertOctagon, 
  Check, 
  X as XIcon, 
  ChevronDown, 
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { 
  CPT_SECTIONS, 
  POS_CODES, 
  MODIFIER_MASTERCLASS, 
  MODIFIER_BEST_PRACTICES, 
  MODIFIER_FAQS 
} from '../../data/codingAndModifiers';
import { ModifierDeepDive } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module4CodingModifiers: React.FC = () => {
  const { progress, markModuleCompleted, toggleBookmarkModifier } = useAcademy();
  const [activeSectionTab, setActiveSectionTab] = useState<'modifiers' | 'cpt-sections' | 'pos-codes'>('modifiers');
  const [selectedModifier, setSelectedModifier] = useState<ModifierDeepDive>(MODIFIER_MASTERCLASS[0]);
  const [cptSliderVal, setCptSliderVal] = useState<number>(99213);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const isCompleted = progress.completedModules.includes('coding-modifiers');

  // Find corresponding CPT section for the slider
  const currentCptSection = CPT_SECTIONS.find(
    s => cptSliderVal >= s.min && cptSliderVal <= s.max
  ) || CPT_SECTIONS[0];

  const handleMarkComplete = () => {
    markModuleCompleted('coding-modifiers');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  const isBookmarked = progress.bookmarkedModifiers.includes(selectedModifier.code);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-health-darkCard to-health-darkCard border border-purple-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Module 4 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Medical Coding & The Modifier Masterclass
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Between 15% and 25% of all healthcare AR denials stem from modifier misuse. Master Modifier 25, 59, 76, 77, 91, laterality, bilateral rules, and NCCI X{'{EPSU}'} overrides with verified clinical cases.
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
            onClick={() => setActiveSectionTab('modifiers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSectionTab === 'modifiers'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modifier Masterclass (Clinical Cases)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSectionTab('cpt-sections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSectionTab === 'cpt-sections'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>6 Major CPT Sections & Range Slider</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSectionTab('pos-codes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSectionTab === 'pos-codes'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Place of Service (POS) Codes Grid
          </button>
        </div>
      </div>

      {/* TAB 1: MODIFIER MASTERCLASS DEEP-DIVE */}
      {activeSectionTab === 'modifiers' && (
        <div className="space-y-8">
          {/* Modifier Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {MODIFIER_MASTERCLASS.map(mod => (
              <button
                key={mod.code}
                type="button"
                onClick={() => setSelectedModifier(mod)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedModifier.code === mod.code
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-600/30'
                    : 'bg-white dark:bg-health-darkCard text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-400'
                }`}
              >
                <span className="font-mono">Modifier {mod.code}</span>
              </button>
            ))}
          </div>

          {/* Deep-Dive Card */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black font-mono text-purple-500">
                    MODIFIER {selectedModifier.code}
                  </span>
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {selectedModifier.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {selectedModifier.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleBookmarkModifier(selectedModifier.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    isBookmarked
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-amber-500'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>{selectedModifier.dollarImpact}</span>
                </div>
              </div>
            </div>

            {/* Primary Use */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Official Coding Purpose
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedModifier.primaryUse}
              </p>
            </div>

            {/* When to use vs when NOT to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Check className="w-4 h-4" /> When to Use (Legitimate Indications)
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {selectedModifier.whenToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  <XIcon className="w-4 h-4" /> When NOT to Use (Audit Failure Traps)
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {selectedModifier.whenNotToUse.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Clinical Case Studies */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-400" />
                Real Clinical Case Studies & Billing Walkthrough
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {selectedModifier.cases.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {c.clinicalScenario}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 font-mono text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
                        <span className="text-[10px] uppercase font-sans font-bold text-slate-400 block mb-0.5">
                          Correct Billing Submission:
                        </span>
                        {c.correctBilling}
                      </div>

                      <div className="text-[11px] font-sans text-purple-600 dark:text-purple-400 font-semibold">
                        Financial Impact: {c.financialImpact}
                      </div>

                      <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Rationale: </span>
                        {c.rationale}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation Checklist */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Auditor Chart Documentation Checklist:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedModifier.documentationChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Best Practices */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              5 Golden Rules to Prevent Modifier Denials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {MODIFIER_BEST_PRACTICES.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <span className="font-mono text-xl font-black text-purple-500">0{idx + 1}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Interactive Modifier FAQs
            </h3>
            <div className="space-y-3">
              {MODIFIER_FAQS.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 bg-slate-50 dark:bg-health-darkSubtle/20 flex items-center justify-between font-semibold text-xs text-slate-900 dark:text-white hover:text-purple-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CPT SECTIONS & RANGE SLIDER */}
      {activeSectionTab === 'cpt-sections' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Interactive CPT Range Slider & 6 Major Sections
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag the 5-digit CPT slider to explore the American Medical Association’s clinical code classification
            </p>
          </div>

          {/* Slider Widget */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">CPT Code Range Selector:</span>
              <span className="text-lg font-mono font-black text-purple-500">
                CPT {cptSliderVal}
              </span>
            </div>

            <input
              type="range"
              min={100}
              max={99499}
              step={100}
              value={cptSliderVal}
              onChange={e => setCptSliderVal(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />

            {/* Active Section Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">
                  {currentCptSection.range}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Active Range Match
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {currentCptSection.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentCptSection.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                {currentCptSection.highlightCodes}
              </div>
            </div>
          </div>

          {/* All 6 Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {CPT_SECTIONS.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/20 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <span className="font-mono text-xs font-bold text-purple-500 px-2 py-0.5 rounded bg-purple-500/10">
                  {sec.range}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {sec.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLACE OF SERVICE (POS) CODES */}
      {activeSectionTab === 'pos-codes' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              CMS Place of Service (POS) Codes (Box 24B)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Essential POS codes dictating facility vs non-facility fee schedule reimbursement rates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POS_CODES.map(pos => (
              <div
                key={pos.code}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-base font-black px-2.5 py-0.5 rounded-lg bg-health-electric/10 text-health-electric border border-health-electric/20">
                      POS {pos.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Box 24B</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {pos.name}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {pos.setting}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <span className="text-emerald-500 font-bold">Rule: </span>
                  {pos.billingNotes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
