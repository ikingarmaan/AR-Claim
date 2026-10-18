import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  FileCheck2,
  Clock,
  Layers,
  Building2,
  Scale,
  FileText,
  BookOpen,
  Filter,
  DollarSign,
  AlertTriangle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { 
  CO_DENIAL_CODES, 
  PR_PATIENT_CODES, 
  RARC_REMARK_CODES,
  CoDenialCode,
  PrCodeItem,
  RarcRemarkCodeItem
} from '../../data/carcRarcData';

interface CarcRarcDictionaryDeskProps {
  initialCode?: string;
}

export const CarcRarcDictionaryDesk: React.FC<CarcRarcDictionaryDeskProps> = ({ initialCode }) => {
  const [activeTab, setActiveTab] = useState<'co' | 'pr' | 'rarc' | 'ncd-lcd'>('co');
  const [searchQuery, setSearchQuery] = useState(initialCode || '');
  const [selectedCoCategory, setSelectedCoCategory] = useState<string>('all');
  const [selectedPrCategory, setSelectedPrCategory] = useState<string>('all');
  const [selectedRarcSeries, setSelectedRarcSeries] = useState<string>('all');
  const [expandedCoCode, setExpandedCoCode] = useState<string | null>(initialCode || 'CO-16');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filtered CO Codes
  const filteredCoCodes = useMemo(() => {
    return CO_DENIAL_CODES.filter(co => {
      const matchCat = selectedCoCategory === 'all' || co.category === selectedCoCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        co.code.toLowerCase().includes(q) ||
        co.title.toLowerCase().includes(q) ||
        co.definition.toLowerCase().includes(q) ||
        co.commonRemarks.some(r => r.toLowerCase().includes(q)) ||
        co.examples.some(ex => ex.toLowerCase().includes(q)) ||
        co.rxWorkflow.some(rx => rx.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCoCategory]);

  // Filtered PR Codes
  const filteredPrCodes = useMemo(() => {
    return PR_PATIENT_CODES.filter(pr => {
      const matchCat = selectedPrCategory === 'all' || pr.category === selectedPrCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        pr.code.toLowerCase().includes(q) ||
        pr.name.toLowerCase().includes(q) ||
        pr.definition.toLowerCase().includes(q) ||
        pr.example.toLowerCase().includes(q) ||
        pr.resolution.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedPrCategory]);

  // Filtered RARC Codes
  const filteredRarcCodes = useMemo(() => {
    return RARC_REMARK_CODES.filter(rarc => {
      const matchSeries = selectedRarcSeries === 'all' || rarc.series.startsWith(selectedRarcSeries);
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        rarc.code.toLowerCase().includes(q) ||
        rarc.meaning.toLowerCase().includes(q) ||
        rarc.relatedCarcs.some(rc => rc.toLowerCase().includes(q)) ||
        rarc.practicalGuidance.toLowerCase().includes(q);
      return matchSeries && matchSearch;
    });
  }, [searchQuery, selectedRarcSeries]);

  const coCategories = [
    { id: 'all', label: `All CO Codes (${CO_DENIAL_CODES.length})` },
    { id: 'data-entry', label: 'Data Entry (CO-16)' },
    { id: 'duplicates', label: 'Duplicates (CO-18)' },
    { id: 'cob', label: 'COB (CO-22)' },
    { id: 'timely-filing', label: 'Timely Filing (CO-29)' },
    { id: 'contractual', label: 'Contractual (CO-45)' },
    { id: 'medical-necessity', label: 'Medical Necessity (CO-50)' },
    { id: 'non-covered', label: 'Non-Covered (CO-96)' },
    { id: 'bundling', label: 'Bundling / NCCI (CO-97)' },
    { id: 'benefit-limits', label: 'Benefit Limits (CO-119)' },
    { id: 'authorization', label: 'Pre-Auth (CO-197)' },
    { id: 'coverage-lapse', label: 'Coverage Lapse (CO-200)' }
  ];

  const prCategories = [
    { id: 'all', label: `All PR Codes (${PR_PATIENT_CODES.length})` },
    { id: 'cost-sharing', label: 'Cost-Sharing (PR-1, 2, 3, 4, 122, 243)' },
    { id: 'liability', label: 'Third-Party Liability (PR-5, 6, 7, 8)' },
    { id: 'non-covered', label: 'Non-Covered (PR-26, 123, 204, W2)' },
    { id: 'eligibility', label: 'Eligibility Issues (PR-27, 28)' },
    { id: 'benefit-limits', label: 'Limits & Rules (PR-119, 125, B9)' }
  ];

  return (
    <div className="skeuo-manila p-5 sm:p-8 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
        <div>
          <div className="flex items-center gap-2">
            <span className="skeuo-badge bg-rose-900 text-rose-100 font-mono text-xs px-2.5 py-1 rounded">
              OFFICIAL CARC / PR / RARC MASTER CODES
            </span>
            <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-semibold">
              X12 835 REMITTANCE • CMS & WPC STANDARDS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <span>🛡️ CARC, PR & RARC Master Denial Codes Dictionary</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 max-w-3xl leading-relaxed">
            Every major Claim Adjustment Reason Code (CO-16 through CO-200), Patient Responsibility code (PR-1 through PR-W2), and Remittance Advice Remark Code (RARC) with full definitions, root-cause analyses, step-by-step resolution playbooks, and CMS NCD vs MAC LCD guidelines.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
            49+ VERIFIED CODES
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
        <button
          onClick={() => setActiveTab('co')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'co'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-700 dark:text-rose-400" />
          <span>CO Denial Codes (CO-16 to CO-200)</span>
          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">11</span>
        </button>

        <button
          onClick={() => setActiveTab('pr')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'pr'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <DollarSign className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <span>Important PR Codes (Patient Responsibility)</span>
          <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">19</span>
        </button>

        <button
          onClick={() => setActiveTab('rarc')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'rarc'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Tag className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Remark Codes (RARC Directory)</span>
          <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">19</span>
        </button>

        <button
          onClick={() => setActiveTab('ncd-lcd')}
          className={`px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'ncd-lcd'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>CMS NCD vs MAC LCD Deep-Dive</span>
        </button>
      </div>

      {/* Universal Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-stone-100/90 dark:bg-stone-900/90 p-3 rounded-xl border border-stone-300 dark:border-stone-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search code (CO-16, PR-1, M51, N20), description, keyword (NCD, LCD, bundle, deductible)..."
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
      {/* TAB 1: CO CODES (CONTRACTUAL OBLIGATIONS & DENIALS) */}
      {/* ============================================================== */}
      {activeTab === 'co' && (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif">
            <Filter className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 shrink-0" />
            {coCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCoCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap text-xs font-mono ${
                  selectedCoCategory === cat.id
                    ? 'bg-rose-800 text-white font-bold shadow-xs'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredCoCodes.map(co => {
              const isExpanded = expandedCoCode === co.code;
              return (
                <div
                  key={co.code}
                  className="skeuo-paper rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden shadow-xs transition-all"
                >
                  {/* Card Header (Clickable Accordion) */}
                  <div
                    onClick={() => setExpandedCoCode(isExpanded ? null : co.code)}
                    className="p-4 sm:p-5 cursor-pointer bg-gradient-to-r from-stone-50 to-amber-50/30 dark:from-stone-900 dark:to-stone-850 hover:bg-amber-100/40 dark:hover:bg-stone-800/60 flex items-start justify-between gap-3 border-b border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-sm px-3 py-1 rounded-lg bg-rose-800 text-white shadow-xs shrink-0 mt-0.5">
                        {co.code}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                            {co.title}
                          </h3>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {co.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1 leading-relaxed line-clamp-2">
                          {co.definition}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-amber-800 dark:text-amber-400 font-semibold bg-amber-100/70 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                        <span>Remarks:</span>
                        <span>{co.commonRemarks.join(', ')}</span>
                      </div>
                      <button className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Dossier Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-5 bg-white dark:bg-stone-900/90 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                      {/* Common Remarks Banner */}
                      <div className="flex flex-wrap items-center gap-2 p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                        <span className="font-mono font-bold text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wide flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Associated Remark Codes (RARC):</span>
                        </span>
                        {co.commonRemarks.map(rm => (
                          <button
                            key={rm}
                            onClick={() => {
                              setActiveTab('rarc');
                              setSearchQuery(rm);
                            }}
                            className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition-colors"
                            title="Click to view this RARC definition in Remark Codes tab"
                          >
                            {rm} ↗
                          </button>
                        ))}
                      </div>

                      {/* Examples Grid */}
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                          <span>Real-World Clinical & Administrative Scenarios:</span>
                        </h4>
                        <ul className="space-y-1.5 pl-5 list-disc text-stone-700 dark:text-stone-300 text-xs sm:text-sm">
                          {co.examples.map((ex, idx) => (
                            <li key={idx} className="leading-relaxed">{ex}</li>
                          ))}
                        </ul>
                      </div>

                      {/* SPECIAL CALLOUT: CO-18 DUPLICATE SCENARIOS */}
                      {co.scenarios && (
                        <div className="p-4 bg-stone-100 dark:bg-stone-850 rounded-xl border-2 border-stone-300 dark:border-stone-700 space-y-3">
                          <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                            <span>🔄 The 2 Scenarios in Duplicate Denials (Critical Rule):</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {co.scenarios.map((sc, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-1.5"
                              >
                                <span className="font-mono font-bold text-xs text-rose-800 dark:text-rose-400 block">
                                  {sc.title}
                                </span>
                                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                                  {sc.description}
                                </p>
                                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-900 dark:text-emerald-300">
                                  <strong>Resolution:</strong> {sc.action}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SPECIAL CALLOUT: CO-97 MEAL & BREAD ANALOGY */}
                      {co.analogy && (
                        <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-300 dark:border-amber-800 space-y-2">
                          <span className="font-mono font-bold text-xs uppercase text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-700" />
                            <span>Memorable Mental Model:</span>
                          </span>
                          <p className="text-xs sm:text-sm font-serif italic text-stone-900 dark:text-stone-100 leading-relaxed font-semibold">
                            {co.analogy}
                          </p>
                        </div>
                      )}

                      {/* SPECIAL CALLOUT: CO-50 CMS NCD vs MAC LCD GUIDE */}
                      {co.ncdLcdGuide && (
                        <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-300 dark:border-blue-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                              <Scale className="w-4 h-4 text-blue-700" />
                              <span>Clinical Guidelines: NCDs vs LCDs Hierarchy</span>
                            </h4>
                            <button
                              onClick={() => setActiveTab('ncd-lcd')}
                              className="text-xs font-mono font-bold text-blue-800 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <span>View Full Comparison Guide</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-blue-200 dark:border-blue-900 space-y-1">
                              <span className="font-mono font-bold text-blue-900 dark:text-blue-300 block">
                                ✅ NCDs — National Coverage
                              </span>
                              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                                <strong>Issued By:</strong> {co.ncdLcdGuide.ncdIssuedBy}
                              </p>
                              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                                <strong>Scope:</strong> {co.ncdLcdGuide.ncdAppliesTo}
                              </p>
                              <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                                {co.ncdLcdGuide.ncdPurpose}
                              </p>
                            </div>

                            <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-blue-200 dark:border-blue-900 space-y-1">
                              <span className="font-mono font-bold text-indigo-900 dark:text-indigo-300 block">
                                ✅ LCDs — Local Coverage
                              </span>
                              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                                <strong>Issued By:</strong> {co.ncdLcdGuide.lcdIssuedBy}
                              </p>
                              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                                <strong>Scope:</strong> {co.ncdLcdGuide.lcdAppliesTo}
                              </p>
                              <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                                {co.ncdLcdGuide.lcdPurpose}
                              </p>
                            </div>
                          </div>

                          <div className="p-2.5 bg-blue-100/70 dark:bg-blue-950/50 rounded font-mono text-xs text-blue-900 dark:text-blue-300 font-semibold">
                            ⚖️ <strong>Precedence Rule:</strong> {co.ncdLcdGuide.lcdRule}
                          </div>
                        </div>
                      )}

                      {/* RX Step-by-Step Action Protocol */}
                      <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs uppercase text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Step-by-Step RX Resolution Workflow:</span>
                          </span>
                          <button
                            onClick={() => handleCopy(co.rxWorkflow.join('\n'), `rx-${co.code}`)}
                            className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                            title="Copy RX steps"
                          >
                            {copiedKey === `rx-${co.code}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        <ol className="space-y-1.5 pl-5 list-decimal text-stone-800 dark:text-stone-200 text-xs sm:text-sm">
                          {co.rxWorkflow.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Pro Tip Banner */}
                      <div className="p-3 bg-amber-100/60 dark:bg-amber-950/30 rounded-lg border border-amber-300 dark:border-amber-800 text-xs leading-relaxed font-sans text-stone-900 dark:text-stone-100">
                        <strong className="font-mono text-amber-900 dark:text-amber-300 uppercase">💡 Pro Tip: </strong>
                        {co.proTip}
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
      {/* TAB 2: PR CODES (PATIENT RESPONSIBILITY - ALL 19 CODES) */}
      {/* ============================================================== */}
      {activeTab === 'pr' && (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif">
            <Filter className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 shrink-0" />
            {prCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedPrCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap text-xs font-mono ${
                  selectedPrCategory === cat.id
                    ? 'bg-blue-800 text-white font-bold shadow-xs'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* PR Codes Table & Cards */}
          <div className="skeuo-paper rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-300 dark:border-stone-700 font-serif font-bold text-stone-900 dark:text-stone-100">
                    <th className="p-3 sm:p-4">PR Code</th>
                    <th className="p-3 sm:p-4">Classification</th>
                    <th className="p-3 sm:p-4">Definition & Example</th>
                    <th className="p-3 sm:p-4">Ledger Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredPrCodes.map(pr => (
                    <tr
                      key={pr.code}
                      className="hover:bg-amber-50/40 dark:hover:bg-stone-800/40 transition-colors"
                    >
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-900 dark:text-blue-300 whitespace-nowrap align-top">
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800">
                          {pr.code}
                        </span>
                      </td>

                      <td className="p-3 sm:p-4 font-serif font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap align-top">
                        {pr.name}
                        <span className="block text-[11px] font-mono font-normal text-stone-600 dark:text-stone-400 mt-0.5">
                          {pr.categoryLabel}
                        </span>
                      </td>

                      <td className="p-3 sm:p-4 text-stone-700 dark:text-stone-300 align-top max-w-md">
                        <p className="leading-relaxed">{pr.definition}</p>
                        <div className="mt-1.5 p-2 bg-stone-50 dark:bg-stone-900/80 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs">
                          <strong className="text-stone-900 dark:text-stone-100 font-mono">Example:</strong> {pr.example}
                        </div>
                      </td>

                      <td className="p-3 sm:p-4 align-top">
                        <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-900 dark:text-emerald-300 leading-relaxed">
                          {pr.resolution}
                        </div>
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
      {/* TAB 3: RARC REMARK CODES (DIRECTORY & MEANINGS) */}
      {/* ============================================================== */}
      {activeTab === 'rarc' && (
        <div className="space-y-5">
          {/* Conceptual Anchor Callout */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/50 dark:from-stone-900 dark:to-stone-850 rounded-xl border-2 border-amber-300 dark:border-amber-700 space-y-2">
            <span className="font-mono font-bold text-xs uppercase text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>The Golden Rule of Medical Remittance Codes:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm">
              <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-amber-200 dark:border-amber-800">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block mb-1">
                  1. CARC / CO Code = Primary Reason
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Identifies <strong>why</strong> the claim or service line was adjusted or denied (e.g. CO-16 Missing Info, CO-50 Medical Necessity, CO-97 Bundled).
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-amber-200 dark:border-amber-800">
                <span className="font-mono font-bold text-amber-800 dark:text-amber-400 block mb-1">
                  2. RARC / Remark Code = Detailed Explanation
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Provides <strong>specific instruction or context</strong> for what was wrong and how to fix it (e.g. M51 invalid CPT, N382 missing NPI, N89 COB update).
                </p>
              </div>
            </div>
          </div>

          {/* Series Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif">
            <Filter className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 shrink-0" />
            <button
              onClick={() => setSelectedRarcSeries('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                selectedRarcSeries === 'all'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              All Series ({RARC_REMARK_CODES.length})
            </button>
            <button
              onClick={() => setSelectedRarcSeries('M-series')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                selectedRarcSeries === 'M-series'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              M-Series (CMS / General)
            </button>
            <button
              onClick={() => setSelectedRarcSeries('N-series')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                selectedRarcSeries === 'N-series'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              N-Series (National Standard)
            </button>
            <button
              onClick={() => setSelectedRarcSeries('MA-series')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono ${
                selectedRarcSeries === 'MA-series'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              MA-Series (Medicare Admin)
            </button>
          </div>

          {/* RARC Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRarcCodes.map(rarc => (
              <div
                key={rarc.code}
                className="skeuo-paper p-4 rounded-xl border border-stone-300 dark:border-stone-700 space-y-2 hover:border-amber-500 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    {rarc.code}
                  </span>
                  <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400">
                    {rarc.series}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm leading-snug">
                  {rarc.meaning}
                </h4>

                <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                  <span className="font-mono text-stone-500 dark:text-stone-400 text-[11px]">Paired with:</span>
                  {rarc.relatedCarcs.map(rc => (
                    <button
                      key={rc}
                      onClick={() => {
                        setActiveTab('co');
                        setSearchQuery(rc);
                        setExpandedCoCode(rc);
                      }}
                      className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 hover:bg-rose-200"
                    >
                      {rc} ↗
                    </button>
                  ))}
                </div>

                <div className="p-2.5 bg-stone-50 dark:bg-stone-900/80 rounded border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                  <strong>Practical Action:</strong> {rarc.practicalGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: CMS NCD vs MAC LCD DEEP-DIVE */}
      {/* ============================================================== */}
      {activeTab === 'ncd-lcd' && (
        <div className="space-y-6">
          {/* Header Overview */}
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
              CMS STATUTORY GUIDELINES
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              National Coverage Determinations (NCDs) vs Local Coverage Determinations (LCDs)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              When a claim denies for <strong>CO-50 (Not a Medical Necessity)</strong> or <strong>CO-96 (Non-Covered Service)</strong>, the decision is dictated by clinical guidelines established at either the federal level (NCD) or regional contractor level (LCD). Understanding this distinction is essential for crafting winning appeal battlecards.
            </p>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NCD Card */}
            <div className="skeuo-paper p-5 rounded-xl border-2 border-blue-400 dark:border-blue-700 space-y-4 bg-gradient-to-b from-blue-50/40 to-transparent dark:from-blue-950/20">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-700 text-white font-mono text-sm flex items-center justify-center font-bold">
                  NCD
                </span>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    National Coverage Determinations
                  </h4>
                  <span className="text-xs font-mono text-blue-800 dark:text-blue-300">
                    Issued by CMS (Centers for Medicare & Medicaid Services)
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-blue-200 dark:border-blue-900">
                  <strong className="text-blue-900 dark:text-blue-300 font-mono block">Geographic Scope:</strong>
                  <span>Applies to <strong>all Medicare beneficiaries nationwide</strong> across all 50 states without exception.</span>
                </div>

                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-blue-200 dark:border-blue-900">
                  <strong className="text-blue-900 dark:text-blue-300 font-mono block">Core Purpose:</strong>
                  <span>Sets uniform coverage criteria, clinical staging requirements, and frequency limits for specific medical technologies, diagnostics, and surgical interventions.</span>
                </div>

                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-blue-200 dark:border-blue-900">
                  <strong className="text-blue-900 dark:text-blue-300 font-mono block">Realistic Example:</strong>
                  <span>Medicare covers a specialized PET scan or cardiac MRI only when the patient satisfies specific nationwide oncologic or cardiology staging criteria.</span>
                </div>

                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-300 font-mono text-xs">
                  <strong>Denial Impact:</strong> If the clinical documentation does not satisfy NCD criteria, the claim will be denied nationwide under CO-50.
                </div>
              </div>
            </div>

            {/* LCD Card */}
            <div className="skeuo-paper p-5 rounded-xl border-2 border-emerald-400 dark:border-emerald-700 space-y-4 bg-gradient-to-b from-emerald-50/40 to-transparent dark:from-emerald-950/20">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-mono text-sm flex items-center justify-center font-bold">
                  LCD
                </span>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Local Coverage Determinations
                  </h4>
                  <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
                    Issued by MACs (Medicare Administrative Contractors)
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-900">
                  <strong className="text-emerald-900 dark:text-emerald-300 font-mono block">Geographic Scope:</strong>
                  <span>Applies only within the specific <strong>regional MAC jurisdiction</strong> (e.g., Novitas, Noridian, Palmetto GBA, NGS, First Coast).</span>
                </div>

                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-900">
                  <strong className="text-emerald-900 dark:text-emerald-300 font-mono block">Core Purpose:</strong>
                  <span>Provides detailed coverage rules, list of payable ICD-10-CM diagnosis codes, and conservative treatment prerequisites when <em>no national NCD exists</em>.</span>
                </div>

                <div className="p-2.5 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-900">
                  <strong className="text-emerald-900 dark:text-emerald-300 font-mono block">Realistic Example:</strong>
                  <span>One regional Medicare contractor may cover allergy immunotherapy under a specific rhinitis diagnosis, while an adjacent state contractor may require prior trial of antihistamines.</span>
                </div>

                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-300 dark:border-amber-900 text-amber-900 dark:text-amber-300 font-mono text-xs">
                  <strong>Denial Impact:</strong> If a secondary diagnosis code billed is omitted from the MAC's local LCD crosswalk, the line item denies under CO-50/M40.
                </div>
              </div>
            </div>
          </div>

          {/* Precedence Law Banner */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border-2 border-amber-400 dark:border-amber-700 flex items-start gap-3">
            <Scale className="w-5 h-5 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                The Statutory Hierarchy: LCDs MUST Follow NCDs
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                By federal statute under the Social Security Act § 1862(a)(1)(A), an <strong>LCD can NEVER contradict or restrict a national NCD mandate</strong>. If CMS issues an NCD authorizing coverage under designated criteria, a regional MAC cannot enforce a more restrictive local rule.
              </p>
            </div>
          </div>

          {/* CO-50 Medical Necessity Appeal Battlecard */}
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-rose-700 dark:text-rose-400" />
              <span>CO-50 Medical Necessity 5-Step Appeal Battlecard</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block">Step 1: Pull Records</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                  Obtain complete physician encounter note, MDM scoring, lab values, and diagnostic imaging.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block">Step 2: LCD Crosswalk</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                  Look up MAC LCD policy. Verify if billed ICD-10 is on the payable list; check for missing secondary comorbidities.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block">Step 3: MD Addendum</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                  Have treating provider write a clinical rationale explaining failed conservative treatments.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block">Step 4: Peer-to-Peer</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                  Request formal Peer-to-Peer (P2P) clinical review between treating physician and payer Medical Director.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="font-mono font-bold text-rose-800 dark:text-rose-400 block">Step 5: File Redetermination</span>
                <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                  Transmit formal CMS Level 1 Redetermination within 120 days with highlighted chart evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

