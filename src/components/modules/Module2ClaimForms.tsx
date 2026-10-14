import React, { useState } from 'react';
import { 
  FileCheck2, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Search, 
  ExternalLink,
  Table,
  Sparkles
} from 'lucide-react';
import { CMS_1500_BOXES, FORM_COMPARISONS, UB_04_CODES } from '../../data/claimForms';
import { ClaimBoxDetail, Ub04CodeItem } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module2ClaimForms: React.FC = () => {
  const { progress, markModuleCompleted } = useAcademy();
  const [activeTab, setActiveTab] = useState<'cms1500' | 'comparison' | 'ub04'>('cms1500');
  const [selectedBox, setSelectedBox] = useState<ClaimBoxDetail>(CMS_1500_BOXES[0]);
  const [ub04Filter, setUb04Filter] = useState<'all' | 'revenue' | 'value' | 'occurrence'>('all');
  const [ub04Search, setUb04Search] = useState('');

  const isCompleted = progress.completedModules.includes('claim-forms');

  const filteredUb04 = UB_04_CODES.filter(item => {
    const matchesType = ub04Filter === 'all' || item.type === ub04Filter;
    const matchesSearch = ub04Search === '' ||
      item.code.includes(ub04Search) ||
      item.title.toLowerCase().includes(ub04Search.toLowerCase()) ||
      item.description.toLowerCase().includes(ub04Search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleMarkComplete = () => {
    markModuleCompleted('claim-forms');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-health-darkCard to-health-darkCard border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Module 2 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Claim Forms Explorer (CMS-1500 vs. UB-04)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Explore professional (837P) vs facility hospital (837I) claim mechanics. Click interactive form hotspots to reveal billing guidelines, clearinghouse traps, and audit validation rules.
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
            onClick={() => setActiveTab('cms1500')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'cms1500'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Interactive CMS-1500 Map (33 Boxes)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'comparison'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Professional vs. Facility Billing Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ub04')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'ub04'
                ? 'bg-health-electric text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>UB-04 Codes (Revenue, Value, Occurrence)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CMS-1500 HOTSPOT MAP */}
      {activeTab === 'cms1500' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Form Blueprint & Hotspot Grid */}
            <div className="lg:col-span-7 bg-white dark:bg-health-darkCard rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Standard Red CMS-1500 Form Map (EDI 837P)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-health-electric">
                    Click any highlighted box
                  </span>
                </div>

                {/* Form Diagram Box Grid */}
                <div className="border-2 border-dashed border-rose-500/40 rounded-2xl p-4 bg-rose-500/5 space-y-3 font-mono text-xs">
                  <div className="text-center font-bold text-rose-600 dark:text-rose-400 pb-2 border-b border-rose-500/20 text-xs">
                    HEALTH INSURANCE CLAIM FORM (APPROVED BY OMB-0938-1197 FORM CMS-1500 02/12)
                  </div>

                  {/* Patient Info Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '12')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '12'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 12</div>
                      <div className="font-semibold text-xs truncate">Release of Info (ROI)</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Signature on File</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '13')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '13'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 13</div>
                      <div className="font-semibold text-xs truncate">Assignment of Benefits</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Direct Payer Check</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '17')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '17'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 17 / 17B</div>
                      <div className="font-semibold text-xs truncate">Referring Provider</div>
                      <div className="text-[10px] opacity-80 mt-0.5">DN Qualifier & NPI</div>
                    </button>
                  </div>

                  {/* Clinical & Resubmission Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '19')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '19'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 19</div>
                      <div className="font-semibold text-xs truncate">Claim Narrative</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Unlisted CPT / Notes</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '22')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '22'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 22</div>
                      <div className="font-semibold text-xs truncate">Resubmission Code</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Code 7 & Original ICN</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '23')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '23'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 23</div>
                      <div className="font-semibold text-xs truncate">Prior Auth / CLIA</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Pre-Cert / Lab ID</div>
                    </button>
                  </div>

                  {/* Diagnosis & Lines Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '21')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '21'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 21</div>
                      <div className="font-semibold text-xs truncate">Diagnosis Codes (ICD-10-CM)</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Lines A through L (Pointers)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '24D')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '24D'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 24D & 24G</div>
                      <div className="font-semibold text-xs truncate">CPT / HCPCS & Modifiers</div>
                      <div className="text-[10px] opacity-80 mt-0.5">5-digit code + Units</div>
                    </button>
                  </div>

                  {/* Provider Billing Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '25')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '25'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 25</div>
                      <div className="font-semibold text-xs truncate">Federal Tax ID (EIN)</div>
                      <div className="text-[10px] opacity-80 mt-0.5">IRS 9-Digit Number</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '32')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '32'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 32</div>
                      <div className="font-semibold text-xs truncate">Service Facility Location</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Physical Address (NO PO Box!)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedBox(CMS_1500_BOXES.find(b => b.boxNumber === '33')!)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedBox.boxNumber === '33'
                          ? 'bg-health-electric text-white border-health-electric shadow-md ring-2 ring-health-electric/40'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-health-electric'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-400">BOX 33 / 33A</div>
                      <div className="font-semibold text-xs truncate">Billing Provider & NPI</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Type 2 Organization NPI</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Select any box above to inspect strict billing guidelines</span>
                <span className="text-emerald-500 font-bold">12 Key Boxes Indexed</span>
              </div>
            </div>

            {/* Right: Selected Box Deep-Dive Pane */}
            <div className="lg:col-span-5 bg-white dark:bg-health-darkCard rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-health-electric/10 text-health-electric border border-health-electric/20">
                    BOX {selectedBox.boxNumber} BREAKDOWN
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400">
                    {selectedBox.category} Domain
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedBox.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedBox.description}
                </p>

                {/* Sample Value */}
                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs border border-slate-800">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">
                    Sample Compliant Entry:
                  </div>
                  <div>{selectedBox.sampleValue}</div>
                </div>

                {/* Rules List */}
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-health-electric" />
                    Mandatory Operational Rules:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                    {selectedBox.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Common Rejections */}
                <div className="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
                  <div className="text-xs font-bold text-rose-500 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Clearinghouse & Audit Failure Triggers:
                  </div>
                  <ul className="space-y-1 text-[11px] text-rose-700 dark:text-rose-300 list-disc list-inside">
                    {selectedBox.rejectionCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>CMS-1500 Claim Standard</span>
                <span className="font-mono text-health-electric">NUCC Compliant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPARISON TABLE */}
      {activeTab === 'comparison' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Professional Billing vs. Institutional Facility Billing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed comparison between physician claims (CMS-1500 / 837P) and hospital facility claims (UB-04 / 837I)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 w-1/4">Comparison Dimension</th>
                  <th className="py-3.5 px-4 w-3/8 text-health-electric">
                    Professional Billing (CMS-1500 / 837P)
                  </th>
                  <th className="py-3.5 px-4 w-3/8 text-purple-400">
                    Facility / Hospital (UB-04 / 837I)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {FORM_COMPARISONS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-health-darkSubtle/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {row.professional}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {row.facility}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: UB-04 CODES EXPLORER */}
      {activeTab === 'ub04' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                UB-04 Institutional Code Sets
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Search 4-digit Revenue Codes, Value Codes ("How Much"), and Occurrence Codes ("When")
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ub04Search}
                  onChange={e => setUb04Search(e.target.value)}
                  placeholder="Search code or department..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All UB-04 Codes' },
              { id: 'revenue', label: 'Revenue Codes (FL 42 - Department)' },
              { id: 'value', label: 'Value Codes (FL 39-41 - Monetary/Units)' },
              { id: 'occurrence', label: 'Occurrence Codes (FL 31-34 - Dates)' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setUb04Filter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  ub04Filter === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Codes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUb04.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-bold text-health-electric px-2 py-0.5 rounded bg-health-electric/10 border border-health-electric/20">
                      Code {item.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-purple-400">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Example: </span>
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
