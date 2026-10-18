import React, { useState } from 'react';

export const ArAgingBuckets: React.FC = () => {
  const [selectedBucket, setSelectedBucket] = useState<string>('61-90');

  const buckets = [
    {
      id: '0-30',
      label: '0–30 Days',
      status: 'Current / Adjudication',
      benchmark: '55%–65% of Total AR',
      color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200',
      tag: 'HEALTHY',
      action: 'Verify initial electronic 999 and 277CA acceptance from clearinghouse. Most clean claims adjudicate within 14–21 days via ERA 835.',
      risk: 'Very Low. No manual calling needed unless front-end clearinghouse rejection noted.'
    },
    {
      id: '31-60',
      label: '31–60 Days',
      status: 'First Follow-Up Window',
      benchmark: '20%–25% of Total AR',
      color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200',
      tag: 'ACTIVE MONITOR',
      action: 'Run bulk web portal eligibility & claim status checks (Availity, Change Healthcare). Check for requests for additional records (ADR / CO-16).',
      risk: 'Low-Moderate. Identify if claim was received by payer or lost in transit.'
    },
    {
      id: '61-90',
      label: '61–90 Days',
      status: 'Collector Action Window',
      benchmark: '10%–15% of Total AR',
      color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200',
      tag: 'CALL PRIORITY',
      action: 'Direct telephonic AR representative inquiry. Document call reference number, representative name, claim ICN, and re-fax missing operative notes.',
      risk: 'Moderate. High risk of missing short 90-day timely filing limits for regional commercial payers (Aetna/UHC).'
    },
    {
      id: '91-120',
      label: '91–120 Days',
      status: 'Critical Urgent Recovery',
      benchmark: '< 8% of Total AR',
      color: 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200',
      tag: 'URGENT RED',
      action: 'Escalate to supervisor queue. Submit formal written Level 1 Appeal with proof of timely filing. Review claim for contract violations.',
      risk: 'High. Timely filing deadline imminent. Revenue loss imminent without prompt written dispute.'
    },
    {
      id: '120+',
      label: '120+ Days',
      status: 'Severe Bad Debt / Audit',
      benchmark: '< 5% of Total AR',
      color: 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-200',
      tag: 'WRITE-OFF THREAT',
      action: 'Final demand letter or external collections review. For Medicare, prepare Level 2 Reconsideration (QIC). Final financial write-off sign-off.',
      risk: 'Severe. Probability of collection drops below 30% after 120 days uncollected.'
    }
  ];

  const current = buckets.find(b => b.id === selectedBucket) || buckets[2];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-rose-800 dark:text-rose-400 font-bold bg-rose-100 dark:bg-rose-950/60 px-2.5 py-1 rounded border border-rose-300 dark:border-rose-700">
              MGMA Benchmark Analytics
            </span>
            <span className="text-xs font-mono text-stone-500">AGING-CYCLE-MATRIX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Accounts Receivable (A/R) Aging Buckets & Collector Matrix
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Claims age like fresh fruit. The longer an unadjudicated claim sits in aging, the higher the mathematical probability of unrecoverable write-off.
          </p>
        </div>

        <div className="skeuo-stamp-pending text-xs px-2.5 py-1 font-mono uppercase">
          BENCHMARK: &lt; 40 DAYS
        </div>
      </div>

      {/* Visual Buckets Container */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-6">
        {buckets.map(b => {
          const isSelected = b.id === selectedBucket;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBucket(b.id)}
              className={`p-3 rounded-lg text-left transition-all border-2 flex flex-col justify-between h-32 ${
                isSelected
                  ? `${b.color} shadow-skeuo-raised scale-[1.03] ring-2 ring-stone-500/30`
                  : 'bg-white/80 dark:bg-stone-800/80 border-stone-300 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold">{b.label}</span>
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 uppercase">
                    {b.tag}
                  </span>
                </div>
                <div className="text-[11px] font-serif font-bold mt-1 line-clamp-1">
                  {b.status}
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-stone-300 dark:border-stone-600 text-[10px] font-mono">
                <span>Target: {b.benchmark}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bucket Strategy Inspector */}
      <div className="skeuo-inset p-4 sm:p-5 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-700">
          <div>
            <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
              COLLECTION ACTION SPECIFICATION:
            </span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Bucket {current.label} ({current.status})
            </h4>
          </div>
          <span className="text-xs font-mono bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded border border-stone-300 dark:border-stone-600 font-bold">
            Industry Standard: {current.benchmark}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="bg-white dark:bg-stone-800 p-3 rounded border border-stone-200 dark:border-stone-700">
            <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
              📋 RECOMMENDED WORKFLOW:
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {current.action}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-3 rounded border border-stone-200 dark:border-stone-700">
            <span className="font-mono font-bold text-red-800 dark:text-red-400 block mb-1">
              ⚠️ RISK PROFILE & WRITE-OFF THREAT:
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {current.risk}
            </p>
          </div>
        </div>

        {/* Days in AR KPI Calculation Box */}
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200">
          <strong>The Golden RCM Health Formula: Days in AR</strong><br />
          <code>Days in AR = (Total Outstanding Accounts Receivable) ÷ (Average Daily Gross Charges)</code><br />
          <em>Example:</em> If practice has $450,000 in AR and bills $10,000/day, Days in AR = <strong>45 days</strong>. Healthy practices maintain Days in AR under 35–45 days. Anything over 55 days indicates severe back-end billing failure.
        </div>
      </div>
    </div>
  );
};

