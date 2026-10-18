import React, { useState, useMemo } from 'react';
import { 
  PhoneCall, 
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
  Send,
  Building2,
  UserCheck
} from 'lucide-react';
import { AR_CALL_SCENARIOS, ArCallScenario } from '../../data/jobNotesData';

interface ArCallScenariosDeskProps {
  onLoadIntoSimulator?: (scenario: ArCallScenario) => void;
}

export const ArCallScenariosDesk: React.FC<ArCallScenariosDeskProps> = ({ onLoadIntoSimulator }) => {
  const [selectedScenario, setSelectedScenario] = useState<ArCallScenario>(AR_CALL_SCENARIOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const categories = [
    { id: 'all', label: `All Scenarios (${AR_CALL_SCENARIOS.length})` },
    { id: 'intake-status', label: 'Submission & Intake (1, 3, 4)' },
    { id: 'eligibility', label: 'Eligibility & Limits (2, 8, 10)' },
    { id: 'denials', label: 'Denials & Pre-Auth (5, 6, 7, 9, 11, 12)' },
    { id: 'billing-rules', label: 'Bundling & Secondary (13, 14)' },
  ];

  const filteredScenarios = useMemo(() => {
    return AR_CALL_SCENARIOS.filter(scen => {
      const matchCat = selectedCategory === 'all' || scen.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        scen.title.toLowerCase().includes(q) ||
        scen.definition.toLowerCase().includes(q) ||
        scen.repQuestions.some(rq => rq.toLowerCase().includes(q)) ||
        scen.stepsToFollow.some(st => st.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'intake-status':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'eligibility':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'denials':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700';
      case 'billing-rules':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      default:
        return 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-300 border-stone-300 dark:border-stone-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="skeuo-paper p-5 sm:p-6 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-rose-800 text-white font-mono text-xs px-2.5 py-0.5 rounded">
                FIELD PLAYBOOK ARCHIVE
              </span>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wide">
                14 MASTER AR CALL SCENARIOS & PAYER PROTOCOLS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              Official Payer Phone Call Scenarios & Representative Question Scripts
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Every single field-tested scenario — from Claim Not On File to Member Ineligible on DOS, Timely Filing, Missing Auth, 3-Letter COB Questionnaires, and Secondary Non-Duplication Write-Offs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-2deg]">
              14 VERIFIED PROTOCOLS
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-300 dark:border-stone-700">
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search scenarios or questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Switcher Tab (Visible on small screens) */}
      <div className="lg:hidden flex rounded-xl border border-stone-400 bg-stone-200 dark:bg-stone-800 p-1 font-serif text-xs font-bold">
        <button
          onClick={() => setMobileView('list')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileView === 'list' ? 'bg-amber-800 text-white shadow' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          📋 Scenario Index ({filteredScenarios.length})
        </button>
        <button
          onClick={() => setMobileView('detail')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileView === 'detail' ? 'bg-amber-800 text-white shadow' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          📞 Active Script (#{selectedScenario.number})
        </button>
      </div>

      {/* Main Split-Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 14 Scenarios Index (40% width on desktop) */}
        <div className={`lg:col-span-5 space-y-2.5 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
            <span>SELECT A CALL SCENARIO:</span>
            <span>{filteredScenarios.length} SCENARIOS</span>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredScenarios.map(scen => {
              const isSelected = selectedScenario.id === scen.id;

              return (
                <button
                  key={scen.id}
                  onClick={() => {
                    setSelectedScenario(scen);
                    setMobileView('detail');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all relative flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-600 dark:border-amber-400 ring-2 ring-amber-500 shadow-md scale-[1.01]'
                      : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-700 text-white shrink-0">
                      Scenario #{scen.number}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getCategoryBadgeClass(scen.category)}`}>
                      {scen.categoryLabel}
                    </span>
                  </div>

                  <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-1 mt-0.5">
                    {scen.title}
                  </div>

                  <p className="text-xs text-stone-800 dark:text-stone-200 line-clamp-2 leading-relaxed">
                    {scen.definition}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-800 dark:text-stone-200 mt-1 pt-1.5 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-amber-800 dark:text-amber-400 font-semibold">
                      {scen.repQuestions.length} Questions for Rep
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span>View Playbook</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Scenario Dossier (60% width on desktop) */}
        <div className={`lg:col-span-7 lg:sticky lg:top-20 space-y-4 ${mobileView === 'detail' ? 'block' : 'hidden lg:block'}`}>
          <div className="skeuo-manila p-5 sm:p-7 rounded-2xl border-2 border-amber-600/80 dark:border-amber-700 shadow-skeuo-raised space-y-5">
            {/* Top Identity Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-rose-800 text-white uppercase tracking-wider">
                    SCENARIO #{selectedScenario.number}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getCategoryBadgeClass(selectedScenario.category)}`}>
                    {selectedScenario.categoryLabel}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mt-2">
                  {selectedScenario.title}
                </h3>
              </div>

              {/* Load into Simulator Action Button */}
              {onLoadIntoSimulator && (
                <button
                  onClick={() => onLoadIntoSimulator(selectedScenario)}
                  className="skeuo-btn-primary px-3.5 py-2 rounded-xl text-xs font-serif font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-md"
                  title="Populate Live Call Simulator with this scenario's data"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Simulate This Call</span>
                </button>
              )}
            </div>

            {/* Official Definition Box */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide block">
                Official RCM Definition:
              </span>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans font-medium">
                {selectedScenario.definition}
              </p>
            </div>

            {/* Step-by-Step Approach */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wide block flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>Step-by-Step Action Protocol:</span>
              </span>
              <ol className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200 pl-5 list-decimal font-sans">
                {selectedScenario.stepsToFollow.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Golden Rule / Pro-Tip Sticky Note */}
            {selectedScenario.goldenRuleOrTip && (
              <div className="skeuo-postit rounded-xl border space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-950 dark:text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>INSIDER REVENUE CYCLE GOLDEN RULE:</span>
                </div>
                <p className="text-xs leading-relaxed text-stone-900 dark:text-amber-100 font-sans font-semibold">
                  {selectedScenario.goldenRuleOrTip}
                </p>
              </div>
            )}

            {/* Questions to the Insurance Representative (The Call Script) */}
            <div className="p-4 bg-stone-50 dark:bg-stone-950/80 rounded-xl border-2 border-amber-600/70 dark:border-amber-600/60 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-300 dark:border-stone-700">
                <span className="text-xs font-mono font-bold text-rose-900 dark:text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                  <span>Questions to the Insurance Representative (Call Script Checklist):</span>
                </span>
                <span className="text-[10px] font-mono text-stone-800 dark:text-stone-200 hidden sm:inline">
                  Click icon to copy
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {selectedScenario.repQuestions.map((q, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 flex items-start justify-between gap-3 group hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-amber-700 dark:text-amber-400 font-bold shrink-0 mt-0.5">➢</span>
                      <span className="text-stone-900 dark:text-stone-100 leading-relaxed font-sans font-medium">
                        {q}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyQuestion(q, idx)}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 shrink-0"
                      title="Copy question text"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action & Resolution Outcome */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-300 dark:border-emerald-800/60 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Standard Resolution & Ledger Adjustment:</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {selectedScenario.actionResolution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

