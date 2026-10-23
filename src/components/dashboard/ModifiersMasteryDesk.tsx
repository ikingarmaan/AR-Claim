import React, { useState, useMemo } from 'react';
import { 
  Tag, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Clock,
  Layers,
  Building2,
  Scale,
  BookOpen,
  Filter,
  DollarSign,
  AlertTriangle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb
} from 'lucide-react';
import { 
  INTRO_MODIFIERS_TABLE,
  TEN_COMMON_MODIFIERS_LIST,
  DETAILED_MODIFIER_GUIDES,
  MODIFIER_PREVENTION_PRACTICES,
  MODIFIER_QUICK_REFERENCE_TABLE,
  MODIFIER_FAQS,
  DetailedModifierGuide
} from '../../data/modifiersMasteryData';

export const ModifiersMasteryDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deepdive' | 'summary' | 'prevention' | 'faqs'>('deepdive');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedModifier, setExpandedModifier] = useState<string | null>('25');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filtered Detailed Guides
  const filteredGuides = useMemo(() => {
    return DETAILED_MODIFIER_GUIDES.filter(guide => {
      const matchCat = selectedCategory === 'all' || guide.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        guide.modifier.toLowerCase().includes(q) ||
        guide.title.toLowerCase().includes(q) ||
        guide.primaryUse.toLowerCase().includes(q) ||
        guide.whenToUse.some(w => w.toLowerCase().includes(q)) ||
        guide.whenNotToUse.some(w => w.toLowerCase().includes(q)) ||
        guide.examples.some(ex => 
          ex.title.toLowerCase().includes(q) || 
          ex.scenario.toLowerCase().includes(q) ||
          ex.codeSubmission.some(cs => cs.toLowerCase().includes(q))
        );
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Filtered Summary Table
  const filteredSummaryTable = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return INTRO_MODIFIERS_TABLE.filter(item => 
      item.modifier.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.exampleUsage.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered Reference Table
  const filteredReferenceTable = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return MODIFIER_QUICK_REFERENCE_TABLE.filter(item => 
      item.modifier.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.primaryUse.toLowerCase().includes(q) ||
      item.mostCommonDenialReason.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const categories = [
    { id: 'all', label: `All Modifiers (${DETAILED_MODIFIER_GUIDES.length})` },
    { id: 'e&m', label: 'E/M (Mod 25)' },
    { id: 'procedural', label: 'Distinct (Mod 59)' },
    { id: 'repeat', label: 'Repeats (76, 77, 91)' },
    { id: 'anatomical', label: 'Laterality (LT / RT)' },
    { id: 'ophthalmology', label: 'Eye (Mod OU)' },
    { id: 'bilateral', label: 'Bilateral (Mod 50)' },
    { id: 'ncci', label: 'NCCI (XS / XP / XE / XU)' }
  ];

  return (
    <div id="modifiers-mastery-desk" className="skeuo-manila p-5 sm:p-8 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
        <div>
          <div className="flex items-center gap-2">
            <span className="skeuo-badge bg-rose-900 text-rose-100 font-mono text-xs px-2.5 py-1 rounded">
              CMS-1500 BOX 24D • AAPC / AMA STANDARDS
            </span>
            <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-semibold">
              15%–25% OF ALL CLAIM DENIALS STEM FROM MODIFIERS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <span>🏷️ Professional Modifiers Masterclass & AR Denial Prevention</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 max-w-3xl leading-relaxed">
            The definitive clinical reference on CPT and HCPCS Level II modifiers: Modifiers 25, 59, 76, 77, 91, LT/RT, OU, 50, and NCCI overrides (XS, XP, XE, XU). Includes clinical scenarios, code submissions, documentation checklists, and denial prevention playbooks.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
            100% AUDIT READY
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
        <button
          onClick={() => setActiveTab('deepdive')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'deepdive'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-rose-700 dark:text-rose-400" />
          <span>Core Modifiers Deep-Dive (10 Modifiers)</span>
          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">10</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'summary'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <span>Quick Summary & Reference Matrices</span>
          <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">12+10</span>
        </button>

        <button
          onClick={() => setActiveTab('prevention')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'prevention'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>5 Denial Prevention Best Practices</span>
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'faqs'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Frequently Asked Questions (FAQs)</span>
          <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">7</span>
        </button>
      </div>

      {/* Universal Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-stone-100/90 dark:bg-stone-900/90 p-3 rounded-xl border border-stone-300 dark:border-stone-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search modifier (25, 59, 76, LT, XS), clinical scenario, CPT code (99213, 11200), or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-mono text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: 10 CORE MODIFIERS DEEP-DIVE WITH CLINICAL VIGNETTES */}
      {/* ============================================================== */}
      {activeTab === 'deepdive' && (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif">
            <Filter className="w-3.5 h-3.5 text-stone-800 dark:text-stone-200 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap text-xs font-mono ${
                  selectedCategory === cat.id
                    ? 'bg-rose-800 text-white font-bold shadow-xs'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Modifier Cards Accordion */}
          <div className="space-y-4">
            {filteredGuides.map(guide => {
              const isExpanded = expandedModifier === guide.modifier;
              return (
                <div
                  key={guide.modifier}
                  className="skeuo-paper rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden shadow-xs transition-all"
                >
                  {/* Card Header (Clickable) */}
                  <div
                    onClick={() => setExpandedModifier(isExpanded ? null : guide.modifier)}
                    className="p-4 sm:p-5 cursor-pointer bg-gradient-to-r from-stone-50 to-amber-50/30 dark:from-stone-900 dark:to-stone-950 hover:bg-amber-100/40 dark:hover:bg-stone-800/60 flex items-start justify-between gap-3 border-b border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-sm sm:text-base px-3 py-1 rounded-lg bg-rose-800 text-white shadow-xs shrink-0 mt-0.5">
                        Mod {guide.modifier}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                            {guide.title}
                          </h3>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                            {guide.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1 leading-relaxed line-clamp-2">
                          {guide.primaryUse}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 mt-1">
                      <span className="hidden sm:inline-block text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-800">
                        {guide.typicalReimbursementImpact}
                      </span>
                      <button className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-7 space-y-6 bg-white dark:bg-stone-900 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                      {/* Primary Use Box */}
                      <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-1.5">
                        <span className="font-mono font-bold text-xs uppercase text-amber-900 dark:text-amber-300 block">
                          Primary Clinical & Billing Intent:
                        </span>
                        <p className="leading-relaxed text-stone-900 dark:text-stone-100 font-sans font-medium">
                          {guide.primaryUse}
                        </p>
                      </div>

                      {/* When to Use vs When NOT to Use Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-2">
                          <span className="font-mono font-bold text-xs uppercase text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>When to Use Modifier {guide.modifier}:</span>
                          </span>
                          <ul className="space-y-1.5 pl-4 list-disc text-stone-700 dark:text-stone-300 text-xs sm:text-sm">
                            {guide.whenToUse.map((w, idx) => (
                              <li key={idx} className="leading-relaxed">{w}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-300 dark:border-rose-800 space-y-2">
                          <span className="font-mono font-bold text-xs uppercase text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-700" />
                            <span>When NOT to Use Modifier {guide.modifier}:</span>
                          </span>
                          <ul className="space-y-1.5 pl-4 list-disc text-stone-700 dark:text-stone-300 text-xs sm:text-sm">
                            {guide.whenNotToUse.map((nw, idx) => (
                              <li key={idx} className="leading-relaxed">{nw}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Clinical Vignettes & Code Submissions */}
                      <div className="space-y-4">
                        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                          <span>Real-World Clinical Scenarios & Coding Solutions:</span>
                        </h4>

                        <div className="space-y-4">
                          {guide.examples.map((ex, eIdx) => (
                            <div
                              key={eIdx}
                              className="skeuo-paper p-4 sm:p-5 rounded-xl border-2 border-stone-300 dark:border-stone-700 space-y-3"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-700 pb-2">
                                <h5 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                                  {ex.title}
                                </h5>
                                <span className="font-mono text-xs text-amber-800 dark:text-amber-400 font-semibold">
                                  Case #{eIdx + 1}
                                </span>
                              </div>

                              <div className="p-3 bg-stone-50 dark:bg-stone-900/80 rounded-lg text-xs leading-relaxed text-stone-800 dark:text-stone-200 font-sans">
                                <strong className="text-stone-900 dark:text-stone-100 font-serif">Patient Scenario: </strong>
                                {ex.scenario}
                              </div>

                              {/* Code Submissions */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-1 font-mono">
                                  <span className="font-bold text-rose-800 dark:text-rose-400 block text-[11px] uppercase">
                                    Primary Code Submission:
                                  </span>
                                  {ex.codeSubmission.map((cs, cIdx) => (
                                    <div key={cIdx} className="text-stone-900 dark:text-stone-100 p-1 bg-stone-100 dark:bg-stone-800 rounded">
                                      {cs}
                                    </div>
                                  ))}
                                </div>

                                {ex.alternativeSubmission ? (
                                  <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-1 font-mono">
                                    <span className="font-bold text-blue-800 dark:text-blue-400 block text-[11px] uppercase">
                                      Alternative Submission Format:
                                    </span>
                                    {ex.alternativeSubmission.map((as, aIdx) => (
                                      <div key={aIdx} className="text-stone-900 dark:text-stone-100 p-1 bg-stone-100 dark:bg-stone-800 rounded">
                                        {as}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-1 text-xs">
                                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 block text-[11px] uppercase">
                                      Why Modifier is Justified:
                                    </span>
                                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                                      {ex.whyUsed}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Denial Prevention & Documentation */}
                              <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-lg border border-amber-300 dark:border-amber-800 text-xs space-y-1">
                                <strong className="font-mono font-bold text-amber-900 dark:text-amber-300 block">
                                  🛡️ Denial Prevention Impact:
                                </strong>
                                <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                                  {ex.denialPreventionNote}
                                </p>
                              </div>

                              <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-lg border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                                <strong className="font-mono font-bold text-stone-900 dark:text-stone-100 block">
                                  📋 Clinical Documentation Checklist:
                                </strong>
                                <ul className="list-disc pl-4 space-y-0.5 text-stone-700 dark:text-stone-300">
                                  {ex.documentationRequired.map((doc, dIdx) => (
                                    <li key={dIdx}>{doc}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: QUICK SUMMARY & REFERENCE MATRICES */}
      {/* ============================================================== */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Introductory Modifiers Summary Table */}
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-rose-800 dark:text-rose-400 uppercase">
                ESSENTIAL MODIFIERS CHEAT SHEET
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-1">
                The 12 Core Healthcare Modifiers at a Glance
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                Quick reference guide for common clinical scenarios: E&M separation, technical/professional splits, hospice care, and laterality.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-300 dark:border-stone-700 font-serif font-bold text-stone-900 dark:text-stone-100">
                    <th className="p-3">Modifier</th>
                    <th className="p-3">Official Meaning</th>
                    <th className="p-3">Clinical Example / Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredSummaryTable.map(item => (
                    <tr key={item.modifier} className="hover:bg-amber-50/40 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-rose-900 dark:text-rose-300 whitespace-nowrap align-top">
                        <span className="px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800">
                          {item.modifier}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-stone-900 dark:text-stone-100 align-top">
                        {item.meaning}
                      </td>
                      <td className="p-3 text-stone-700 dark:text-stone-300 align-top">
                        {item.exampleUsage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Modifier Reference Table with Denial Impact */}
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                AR RECOVERY & LOSS PREVENTION
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-1">
                Quick Modifier Reference Matrix: Denial Reasons & Typical Dollar Impact
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                Quantified financial recovery per claim when billing teams correctly identify and append required modifiers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-300 dark:border-stone-700 font-serif font-bold text-stone-900 dark:text-stone-100">
                    <th className="p-3">Modifier</th>
                    <th className="p-3">Modifier Name</th>
                    <th className="p-3">Primary Use</th>
                    <th className="p-3">Most Common Denial Reason</th>
                    <th className="p-3">Typical Reimbursement Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredReferenceTable.map(item => (
                    <tr key={item.modifier} className="hover:bg-amber-50/40 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-rose-900 dark:text-rose-300 whitespace-nowrap align-top">
                        <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800">
                          {item.modifier}
                        </span>
                      </td>
                      <td className="p-3 font-serif font-semibold text-stone-900 dark:text-stone-100 align-top whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="p-3 text-stone-700 dark:text-stone-300 align-top max-w-xs">
                        {item.primaryUse}
                      </td>
                      <td className="p-3 text-stone-700 dark:text-stone-300 align-top max-w-xs">
                        <span className="p-1 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900 text-red-900 dark:text-red-300 font-mono text-xs block">
                          {item.mostCommonDenialReason}
                        </span>
                      </td>
                      <td className="p-3 align-top whitespace-nowrap">
                        <span className="p-1 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-xs block">
                          {item.typicalReimbursementImpact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: HOW TO PREVENT MODIFIER-RELATED DENIALS */}
      {/* ============================================================== */}
      {activeTab === 'prevention' && (
        <div className="space-y-5">
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
              RCM BEST PRACTICES MANIFESTO
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              The 5 Pillars of Modifier Denial Prevention
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Between 15% and 25% of all healthcare claim denials stem directly from modifier errors. By embedding these five organizational controls into your revenue cycle, billing teams achieve first-pass clean claim rates above 98%.
            </p>
          </div>

          <div className="space-y-4">
            {MODIFIER_PREVENTION_PRACTICES.map(bp => (
              <div
                key={bp.number}
                className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-mono text-sm flex items-center justify-center font-bold shrink-0">
                    {bp.number}
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      Practice {bp.number}: {bp.practice}
                    </h4>
                    <p className="text-xs text-stone-800 dark:text-stone-200">
                      {bp.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                  <span className="font-mono font-bold text-xs uppercase text-emerald-900 dark:text-emerald-300 block">
                    Action Steps:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-stone-800 dark:text-stone-200">
                    {bp.actionSteps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: FREQUENTLY ASKED QUESTIONS (FAQS) */}
      {/* ============================================================== */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
              EXPERT CODING INQUIRIES
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Frequently Asked Questions About Modifiers
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-300">
              Clear, authoritative answers to the most common questions encountered in professional coding interviews and AR audits.
            </p>
          </div>

          <div className="space-y-3">
            {MODIFIER_FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="skeuo-paper rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden shadow-xs transition-all"
                >
                  <div
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="p-4 sm:p-5 cursor-pointer bg-gradient-to-r from-stone-50 to-amber-50/20 dark:from-stone-900 dark:to-stone-950 hover:bg-amber-100/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-mono text-xs flex items-center justify-center font-bold shrink-0">
                        Q{idx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                        {faq.question}
                      </h4>
                    </div>

                    <button className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="p-5 border-t border-stone-200 dark:border-stone-800 space-y-3 text-xs sm:text-sm text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900">
                      <p className="leading-relaxed font-sans">
                        {faq.answer}
                      </p>

                      {faq.keyRule && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-300 dark:border-amber-800 font-mono text-xs text-amber-900 dark:text-amber-300 font-semibold flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 shrink-0 text-amber-600" />
                          <span>{faq.keyRule}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

