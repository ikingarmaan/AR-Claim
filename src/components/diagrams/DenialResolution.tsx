import React, { useState } from 'react';

export const DenialResolution: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<'CO' | 'PR' | 'OA'>('CO');

  const groups = {
    CO: {
      title: 'CO — Contractual Obligation',
      rule: 'PROVIDER WRITE-OFF / DEFENSE ONLY. You CANNOT bill the patient unless a valid Advance Beneficiary Notice (ABN) was executed prior to service.',
      examples: [
        { code: 'CO-45', reason: 'Charge exceeds fee schedule / contracted maximum allowed amount.', action: 'Legitimate contractual discount. Post write-off to zero out ledger balance.' },
        { code: 'CO-16', reason: 'Claim lacks info or has submission/billing errors (NPI, NDC, modifier, attachments).', action: 'Correct missing data field and resubmit as replacement claim (Type of Bill xx7).' },
        { code: 'CO-29', reason: 'Time limit for filing has expired (Timely filing denial).', action: 'Provide clearinghouse electronic 999/277CA acceptance proof showing initial submission within window.' },
        { code: 'CO-50', reason: 'Non-covered service; not deemed medically necessary by payer policy.', action: 'Compile operative note, physician encounter documentation, and published LCD/NCD policy for Level 1 Appeal.' },
        { code: 'CO-197', reason: 'Precertification/authorization/notification absent.', action: 'Check whether retro-auth is permitted or submit clinical records showing emergent urgency.' }
      ]
    },
    PR: {
      title: 'PR — Patient Responsibility',
      rule: 'BILL TO PATIENT. Legally enforceable patient out-of-pocket obligation determined by member health benefit plan.',
      examples: [
        { code: 'PR-1', reason: 'Deductible Amount: Patient has not yet satisfied their annual calendar-year deductible.', action: 'Bill patient via monthly statement. Offer payment plan or portal collection.' },
        { code: 'PR-2', reason: 'Coinsurance Amount: Cost-sharing percentage (e.g., 20% Medicare Part B coinsurance).', action: 'Bill patient or submit secondary supplemental/Medigap claim for crossover payment.' },
        { code: 'PR-3', reason: 'Copayment Amount: Fixed fee agreed upon by subscriber for specific office/specialty visit.', action: 'Cross-reference POS front-desk receipt; bill patient if copay was uncollected at intake.' },
        { code: 'PR-204', reason: 'This service/equipment/drug is not covered under the patient\'s current benefit plan.', action: 'Service is excluded from policy; bill patient with itemized explanation of benefits.' }
      ]
    },
    OA: {
      title: 'OA — Other Adjustment',
      rule: 'COORDINATION OF BENEFITS (COB). Indicates secondary payer adjustments or third-party liability reductions.',
      examples: [
        { code: 'OA-23', reason: 'The impact of prior payer(s) adjudication including payments and/or adjustments.', action: 'Normal crossover remark. Verifies secondary carrier received primary 835 voucher.' },
        { code: 'OA-100', reason: 'Payment made to patient/insured instead of provider.', action: 'Contact patient for payment recovery or verify whether Assignment of Benefits (Box 13) was checked "YES".' }
      ]
    }
  };

  const selected = groups[activeGroup];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-rose-800 dark:text-rose-400 font-bold bg-rose-100 dark:bg-rose-950/60 px-2.5 py-1 rounded border border-rose-300 dark:border-rose-700">
              Denial Management Architecture
            </span>
            <span className="text-xs font-mono text-stone-500">CARC-RARC-ACTION-PLAYBOOK</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Claim Adjustment Group Codes & Denial Appeal Ladder
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Never accept a denial blindly. Learn how Group Codes govern legal responsibility and how to navigate the 5-level Medicare appeal ladder.
          </p>
        </div>

        <div className="skeuo-stamp-denied text-xs px-2.5 py-1 font-mono uppercase">
          RECOVERY PLAYBOOK
        </div>
      </div>

      {/* Group Code Tabs */}
      <div className="flex flex-wrap gap-2 my-5">
        <button
          onClick={() => setActiveGroup('CO')}
          className={`px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all border ${
            activeGroup === 'CO'
              ? 'bg-red-100 dark:bg-red-950/60 border-red-600 text-red-950 dark:text-red-200 shadow-skeuo-raised ring-2 ring-red-500/50'
              : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          CO: Contractual Obligation (Provider Write-Off / Appeal)
        </button>

        <button
          onClick={() => setActiveGroup('PR')}
          className={`px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all border ${
            activeGroup === 'PR'
              ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-600 text-amber-950 dark:text-amber-200 shadow-skeuo-raised ring-2 ring-amber-500/50'
              : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          PR: Patient Responsibility (Bill Patient)
        </button>

        <button
          onClick={() => setActiveGroup('OA')}
          className={`px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all border ${
            activeGroup === 'OA'
              ? 'bg-blue-100 dark:bg-blue-950/60 border-blue-600 text-blue-950 dark:text-blue-200 shadow-skeuo-raised ring-2 ring-blue-500/50'
              : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          OA: Other Adjustment (Secondary / COB)
        </button>
      </div>

      {/* Active Group Rule Banner */}
      <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 mb-5 text-xs">
        <span className="font-mono font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">
          Legal Binding Rule:
        </span>
        <span className="text-stone-700 dark:text-stone-300 ml-2 font-medium">
          {selected.rule}
        </span>
      </div>

      {/* CARC Table */}
      <div className="space-y-2.5 mb-6">
        {selected.examples.map(item => (
          <div 
            key={item.code}
            className="p-3 sm:p-4 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="md:w-1/4">
              <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-700 border border-stone-300 dark:border-stone-600">
                {item.code}
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5">
                {item.reason}
              </p>
            </div>

            <div className="md:w-3/4 bg-stone-50 dark:bg-stone-900/60 p-2.5 rounded border border-dashed border-stone-300 dark:border-stone-700 text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-400 font-mono">
                ACTION PROTOCOL:
              </span>
              <span className="text-stone-700 dark:text-stone-300 ml-2">
                {item.action}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5-Level Medicare Appeal Escalation Ladder */}
      <div className="skeuo-inset p-4 sm:p-5 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-700">
          <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
            Medicare 5-Level Formal Appeal Escalation Ladder
          </h4>
          <span className="text-xs font-mono text-stone-500">CMS Title XVIII § 1869</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4 text-xs">
          <div className="bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-300 dark:border-stone-700">
            <div className="font-mono font-bold text-stone-500 mb-1">LEVEL 1</div>
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100">Redetermination</div>
            <div className="text-[10px] text-amber-700 font-mono mt-1">120 Days from EOB</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
              Handled by Medicare Administrative Contractor (MAC). Decision within 60 days.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-300 dark:border-stone-700">
            <div className="font-mono font-bold text-stone-500 mb-1">LEVEL 2</div>
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100">Reconsideration</div>
            <div className="text-[10px] text-amber-700 font-mono mt-1">180 Days from L1</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
              Handled by Qualified Independent Contractor (QIC). Independent panel review.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-300 dark:border-stone-700">
            <div className="font-mono font-bold text-stone-500 mb-1">LEVEL 3</div>
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100">ALJ Hearing</div>
            <div className="text-[10px] text-amber-700 font-mono mt-1">60 Days from L2</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
              Administrative Law Judge hearing. Formal video/telephonic legal proceeding.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-300 dark:border-stone-700">
            <div className="font-mono font-bold text-stone-500 mb-1">LEVEL 4</div>
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100">Appeals Council</div>
            <div className="text-[10px] text-amber-700 font-mono mt-1">60 Days from L3</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
              Medicare Appeals Council (MAC) review. Legal error assessment.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-300 dark:border-stone-700">
            <div className="font-mono font-bold text-stone-500 mb-1">LEVEL 5</div>
            <div className="font-serif font-bold text-stone-900 dark:text-stone-100">Federal Court</div>
            <div className="text-[10px] text-amber-700 font-mono mt-1">60 Days from L4</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
              U.S. District Court lawsuit. Requires minimum jurisdictional amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
