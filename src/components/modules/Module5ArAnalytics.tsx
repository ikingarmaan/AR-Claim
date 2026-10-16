import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  FileText, 
  Copy, 
  Check, 
  Save, 
  Clock,
  Sparkles
} from 'lucide-react';
import { AR_KPIS, DENIAL_REDUCTION_CHECKLIST, AGING_BUCKETS } from '../../data/arAnalytics';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module5ArAnalytics: React.FC = () => {
  const { progress, markModuleCompleted, saveArNote } = useAcademy();
  const [activeTab, setActiveTab] = useState<'kpis' | 'aging' | 'checklist' | 'note-builder'>('kpis');

  // KPI Simulator State
  const [totalAr, setTotalAr] = useState<number>(1200000); // $1.2M
  const [dailyCharges, setDailyCharges] = useState<number>(32000); // $32k/day
  const [cleanClaimsPct, setCleanClaimsPct] = useState<number>(94);
  const [denialPct, setDenialPct] = useState<number>(4.8);

  // Note Builder State
  const [nbDate, setNbDate] = useState(new Date().toISOString().split('T')[0]);
  const [nbRepName, setNbRepName] = useState('Karen Davis');
  const [nbCallRef, setNbCallRef] = useState('REF-559120-UHC');
  const [nbStatus, setNbStatus] = useState('Pending Medical Records');
  const [nbAction, setNbAction] = useState('Rep confirmed claim 2025010984 pending for operative notes and pathology report. Faxed records to 800-555-0199 Attn: Clinical Review. Rep quoted 14-day TAT from receipt.');
  const [nbNextDate, setNbNextDate] = useState(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [nbPatient, setNbPatient] = useState('James Wilson');
  const [nbDos, setNbDos] = useState('2025-01-10');
  const [nbClaimNo, setNbClaimNo] = useState('2025010984X');
  const [nbBilled, setNbBilled] = useState('1450.00');

  const [copiedNote, setCopiedNote] = useState(false);
  const [savedNote, setSavedNote] = useState(false);

  const isCompleted = progress.completedModules.includes('ar-analytics');

  // Days in AR calculation
  const daysInAr = Math.round((totalAr / (dailyCharges || 1)) * 10) / 10;
  
  let darStatus = 'Healthy Benchmark';
  let darColor = 'text-emerald-500';
  if (daysInAr > 50) {
    darStatus = 'Critical AR Distress';
    darColor = 'text-rose-500';
  } else if (daysInAr > 40) {
    darStatus = 'Moderate Warning (Slow Collections)';
    darColor = 'text-amber-500';
  }

  const generatedNote = `[AR CALL AUDIT LOG]
DATE: ${nbDate}
PATIENT: ${nbPatient} | DOS: ${nbDos} | CLAIM: ${nbClaimNo} | BILLED: $${nbBilled}
INSURANCE REP: ${nbRepName}
CALL REF #: ${nbCallRef}
STATUS: ${nbStatus}
ACTION / OUTCOME: ${nbAction}
NEXT FOLLOW-UP DATE: ${nbNextDate}
AUDIT COMPLIANCE: 6-Point Standard Verified`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(generatedNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleSaveNote = () => {
    saveArNote({
      date: nbDate,
      repName: nbRepName,
      callRef: nbCallRef,
      claimNumber: nbClaimNo,
      patientName: nbPatient,
      dos: nbDos,
      billedAmount: nbBilled,
      status: nbStatus,
      actionTaken: nbAction,
      nextFollowUpDate: nbNextDate
    });
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  const handleMarkComplete = () => {
    markModuleCompleted('ar-analytics');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-health-darkCard to-health-darkCard border border-cyan-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Module 5 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              AR Analytics, KPIs, Aging & Note Documentation
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Track Days in AR benchmarks (&lt; 40 days), Clean Claim Rates (&gt;= 95%), aging bucket triage (0–120+ days), and draft audit-proof AR notes containing all 6 mandatory compliance elements.
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
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'kpis'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>KPI Simulator & Formulas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('aging')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'aging'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>AR Aging Buckets (0–120+ Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>8-Point Denial Reduction Checklist</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('note-builder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'note-builder'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive AR Note Builder</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KPI SIMULATOR */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Executive AR Dashboard & KPI Simulator
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Adjust total outstanding AR and daily billings to calculate Days in AR and gauge practice financial health
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sliders */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Total Outstanding AR Balance:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        ${(totalAr / 1000).toFixed(0)}k (${totalAr.toLocaleString()})
                      </span>
                    </div>
                    <input
                      type="range"
                      min={300000}
                      max={3000000}
                      step={50000}
                      value={totalAr}
                      onChange={e => setTotalAr(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Average Daily Gross Charges:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        ${dailyCharges.toLocaleString()} / day
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={80000}
                      step={2000}
                      value={dailyCharges}
                      onChange={e => setDailyCharges(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Clean Claim Rate (CCR):</span>
                      <span className="font-mono font-bold text-emerald-500">{cleanClaimsPct}%</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={99}
                      value={cleanClaimsPct}
                      onChange={e => setCleanClaimsPct(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Initial Denial Rate:</span>
                      <span className={`font-mono font-bold ${denialPct > 5 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {denialPct}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={15}
                      step={0.2}
                      value={denialPct}
                      onChange={e => setDenialPct(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Readout Gauges */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">DAYS IN AR (DAR) GAUGE</span>
                    <span className={`font-bold ${darColor}`}>{darStatus}</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black font-mono ${darColor}`}>
                      {daysInAr}
                    </span>
                    <span className="text-slate-400 text-sm">Days to Collect Cash</span>
                  </div>

                  {/* Visual Benchmark Bar */}
                  <div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="w-1/3 bg-emerald-500" title="< 35 Days (Healthy)" />
                      <div className="w-1/4 bg-amber-500" title="35-45 Days (Warning)" />
                      <div className="flex-1 bg-rose-500" title="> 45 Days (Critical)" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                      <span>0 Days</span>
                      <span>Target: &lt; 40 Days</span>
                      <span>60+ Days</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400">Clean Claim Rate:</span>
                      <div className="text-base font-bold font-mono text-emerald-400">{cleanClaimsPct}% (Target: &gt;= 95%)</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Initial Denial Rate:</span>
                      <div className={`text-base font-bold font-mono ${denialPct > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {denialPct}% (Target: &lt; 5%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AR_KPIS.map(kpi => (
              <div 
                key={kpi.id}
                className="bg-white dark:bg-health-darkCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {kpi.name}
                  </h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500">
                    {kpi.benchmark}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-health-electric">
                  {kpi.formula}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {kpi.description}
                </p>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Financial Impact: </span>
                  {kpi.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AGING BUCKETS */}
      {activeTab === 'aging' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                AR Aging Buckets & Prioritization Strategy
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Prioritize collections by High-Dollar + Near Timely Filing Limit (TFL) + Stratified Sampling
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {AGING_BUCKETS.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 md:w-1/4">
                    <div className="font-mono text-base font-black text-slate-900 dark:text-white">
                      {b.bucket}
                    </div>
                    <div className="text-xs font-bold text-health-electric">
                      {b.status}
                    </div>
                  </div>

                  <div className="md:w-1/2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Action Required: </span>
                    {b.actionRequired}
                  </div>

                  <div className="md:w-1/4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="text-[10px] uppercase font-bold text-rose-500">TFL Urgency:</div>
                    <div className="text-slate-700 dark:text-slate-300 font-medium text-[11px] mt-0.5">{b.tflRisk}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              The 8-Point Denial Reduction Operational Checklist
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Implement these 8 operational controls to drive claim denial rates below the 5% industry threshold
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {DENIAL_REDUCTION_CHECKLIST.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 space-y-2 flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.step}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE NOTE BUILDER SANDBOX */}
      {activeTab === 'note-builder' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Interactive AR Note Builder Sandbox
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Practice drafting standardized 6-point AR follow-up audit notes for practice management systems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Date of Follow-up *</label>
                  <input
                    type="date"
                    value={nbDate}
                    onChange={e => setNbDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Insurance Rep Name *</label>
                  <input
                    type="text"
                    value={nbRepName}
                    onChange={e => setNbRepName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Call Reference # *</label>
                  <input
                    type="text"
                    value={nbCallRef}
                    onChange={e => setNbCallRef(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Current Claim Status *</label>
                  <input
                    type="text"
                    value={nbStatus}
                    onChange={e => setNbStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Action Taken & Financial Rationale *</label>
                <textarea
                  rows={3}
                  value={nbAction}
                  onChange={e => setNbAction(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Next Follow-up Date *</label>
                  <input
                    type="date"
                    value={nbNextDate}
                    onChange={e => setNbNextDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Billed Charge ($)</label>
                  <input
                    type="text"
                    value={nbBilled}
                    onChange={e => setNbBilled(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-slate-400 text-[10px]">Patient Name</label>
                  <input
                    type="text"
                    value={nbPatient}
                    onChange={e => setNbPatient(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px]">Date of Service</label>
                  <input
                    type="date"
                    value={nbDos}
                    onChange={e => setNbDos(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px]">Claim #</label>
                  <input
                    type="text"
                    value={nbClaimNo}
                    onChange={e => setNbClaimNo(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Formatted Output & Copy */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Live Formatted Note Preview
                  </span>
                  <span className="text-[10px] text-cyan-500 font-mono">Ready to Paste</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800 h-64 overflow-y-auto whitespace-pre-wrap select-all">
                  {generatedNote}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCopyNote}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 transition-colors shadow-sm"
                >
                  {copiedNote ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedNote ? 'Copied to Clipboard!' : 'Copy Formatted Note'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {savedNote ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                  <span>{savedNote ? 'Saved!' : 'Save to History'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
