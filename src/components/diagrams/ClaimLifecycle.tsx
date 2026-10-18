import React, { useState } from 'react';

export const ClaimLifecycle: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState<'scrubber' | 'clearinghouse' | 'payer' | 'adjudication'>('clearinghouse');

  const gateDetails = {
    scrubber: {
      title: 'Practice Scrubber (Internal Pre-Billing Rules)',
      ack: 'Local Engine (Pre-EDI)',
      desc: 'Validates claim against NCCI edits, medically unlikely edits (MUE), gender/diagnosis mismatches, and LCD/NCD policies before generation of ANSI X12 837.',
      errors: ['Invalid ICD-10 7th character', 'Missing NPI in Box 24J/33A', 'Primary payer missing member ID', 'Modifier 25 without separate E/M']
    },
    clearinghouse: {
      title: 'Clearinghouse Gateway (EDI 837 Translation & Validation)',
      ack: '999 Functional Ack + 277CA Claim Ack',
      desc: 'Clearinghouse acts as post office. Issues 999 acknowledgement within minutes (syntactic X12 validity). Issues 277CA claim status within 24 hours (payer-level field acceptance).',
      errors: ['Payer ID invalid or out of network', 'Dependent DOB does not match enrollment', 'Invalid taxonomy code', 'Line charge math mismatch']
    },
    payer: {
      title: 'Payer Front-End Gateway (Payer Acceptance)',
      ack: 'Payer 277 Claim Acknowledgement',
      desc: 'The payer ingests accepted clearinghouse batch. Checks patient enrollment on Date of Service (DOS) and whether provider is credentialed/contracted.',
      errors: ['Member not found on DOS', 'Prior authorization number not on file', 'Coverage terminated prior to DOS', 'Timely filing limit passed']
    },
    adjudication: {
      title: 'Payer Adjudication Engine & Remittance',
      ack: 'EDI 835 (Electronic Remittance Advice) / Paper EOB',
      desc: 'Applies allowable fee schedule, contractual discount (CO-45), calculates deductible (PR-1) and coinsurance (PR-2), releases EFT payment or denial codes.',
      errors: ['CO-50: Non-covered service (not medically necessary)', 'CO-97: Bundled procedure', 'CO-16: Missing clinical records/operative report', 'CO-197: Precertification absent']
    }
  };

  const current = gateDetails[selectedGate];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-700">
              Interactive Workflow Architecture
            </span>
            <span className="text-xs font-mono text-stone-500">ANSI-X12-837-TO-835</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            US Medical Claim Lifecycle & EDI Clearinghouse Gates
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Understand how an encounter transforms from Superbill into EDI 837, passes two levels of acknowledgments, and terminates in an 835 Remittance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="skeuo-stamp-pending text-xs px-2.5 py-1 font-mono uppercase">
            999 & 277CA AUDITED
          </span>
        </div>
      </div>

      {/* Visual SVG Flow Diagram */}
      <div className="my-6 overflow-x-auto">
        <svg viewBox="0 0 920 340" className="w-full min-w-[760px] h-auto font-sans">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
            <filter id="skeuoShadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodOpacity="0.25" />
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#78716c" />
            </marker>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a" />
            </marker>
            <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626" />
            </marker>
          </defs>

          {/* Connectors */}
          <line x1="120" y1="90" x2="170" y2="90" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <line x1="310" y1="90" x2="360" y2="90" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <line x1="500" y1="90" x2="550" y2="90" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <line x1="690" y1="90" x2="740" y2="90" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#arrow)" />

          {/* Fork Lines after Payer Adjudication */}
          <path d="M 810 130 L 810 190 L 810 240" stroke="#78716c" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <path d="M 810 190 L 730 190" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowRed)" fill="none" />
          <path d="M 810 250 L 730 250" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowGreen)" fill="none" />

          {/* Node 1: Clinical Encounter */}
          <g transform="translate(10, 45)" filter="url(#skeuoShadow)">
            <rect width="110" height="90" rx="8" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />
            <rect x="0" y="0" width="110" height="24" rx="8" fill="#e7e5e4" />
            <text x="55" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#44403c">STEP 1: VISIT</text>
            <text x="55" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1c1917">Encounter</text>
            <text x="55" y="64" textAnchor="middle" fontSize="9" fill="#78716c">SOAP & Charges</text>
            <text x="55" y="80" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#a8a29e">Superbill created</text>
          </g>

          {/* Node 2: Practice Scrubber */}
          <g 
            transform="translate(170, 45)" 
            filter="url(#skeuoShadow)" 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGate('scrubber')}
          >
            <rect width="140" height="90" rx="8" fill={selectedGate === 'scrubber' ? '#fef3c7' : '#fafaf9'} stroke={selectedGate === 'scrubber' ? '#d97706' : '#d6d3d1'} strokeWidth={selectedGate === 'scrubber' ? '2.5' : '1.5'} />
            <rect x="0" y="0" width="140" height="24" rx="8" fill={selectedGate === 'scrubber' ? '#fde68a' : '#e7e5e4'} />
            <text x="70" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={selectedGate === 'scrubber' ? '#92400e' : '#44403c'}>GATE 1: SCRUBBER</text>
            <text x="70" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1c1917">Pre-Bill Engine</text>
            <text x="70" y="64" textAnchor="middle" fontSize="9" fill="#78716c">NCCI & LCD Check</text>
            <text x="70" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0284c7">Generates 837P/I</text>
          </g>

          {/* Node 3: Clearinghouse */}
          <g 
            transform="translate(360, 45)" 
            filter="url(#skeuoShadow)" 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGate('clearinghouse')}
          >
            <rect width="140" height="90" rx="8" fill={selectedGate === 'clearinghouse' ? '#fef3c7' : '#fafaf9'} stroke={selectedGate === 'clearinghouse' ? '#d97706' : '#d6d3d1'} strokeWidth={selectedGate === 'clearinghouse' ? '2.5' : '1.5'} />
            <rect x="0" y="0" width="140" height="24" rx="8" fill={selectedGate === 'clearinghouse' ? '#fde68a' : '#e7e5e4'} />
            <text x="70" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={selectedGate === 'clearinghouse' ? '#92400e' : '#44403c'}>GATE 2: CLEARINGHOUSE</text>
            <text x="70" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1c1917">EDI Translation</text>
            <text x="70" y="64" textAnchor="middle" fontSize="9" fill="#78716c">999 Ack & 277CA</text>
            <text x="70" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309">Front-End Guard</text>
          </g>

          {/* Node 4: Payer Gateway */}
          <g 
            transform="translate(550, 45)" 
            filter="url(#skeuoShadow)" 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGate('payer')}
          >
            <rect width="140" height="90" rx="8" fill={selectedGate === 'payer' ? '#fef3c7' : '#fafaf9'} stroke={selectedGate === 'payer' ? '#d97706' : '#d6d3d1'} strokeWidth={selectedGate === 'payer' ? '2.5' : '1.5'} />
            <rect x="0" y="0" width="140" height="24" rx="8" fill={selectedGate === 'payer' ? '#fde68a' : '#e7e5e4'} />
            <text x="70" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={selectedGate === 'payer' ? '#92400e' : '#44403c'}>GATE 3: PAYER INGEST</text>
            <text x="70" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1c1917">Eligibility & Coverage</text>
            <text x="70" y="64" textAnchor="middle" fontSize="9" fill="#78716c">Payer 277 Receipt</text>
            <text x="70" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4338ca">Enters Adjudication</text>
          </g>

          {/* Node 5: Payer Adjudication Engine */}
          <g 
            transform="translate(740, 45)" 
            filter="url(#skeuoShadow)" 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGate('adjudication')}
          >
            <rect width="140" height="90" rx="8" fill={selectedGate === 'adjudication' ? '#fef3c7' : '#fafaf9'} stroke={selectedGate === 'adjudication' ? '#d97706' : '#d6d3d1'} strokeWidth={selectedGate === 'adjudication' ? '2.5' : '1.5'} />
            <rect x="0" y="0" width="140" height="24" rx="8" fill={selectedGate === 'adjudication' ? '#fde68a' : '#e7e5e4'} />
            <text x="70" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={selectedGate === 'adjudication' ? '#92400e' : '#44403c'}>GATE 4: ADJUDICATION</text>
            <text x="70" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1c1917">Pricing & Policy</text>
            <text x="70" y="64" textAnchor="middle" fontSize="9" fill="#78716c">CO / PR Split</text>
            <text x="70" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">Releases 835 ERA</text>
          </g>

          {/* Result Branch A: Denied Claim */}
          <g transform="translate(560, 160)" filter="url(#skeuoShadow)">
            <rect width="160" height="58" rx="6" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
            <text x="12" y="22" fontSize="11" fontWeight="bold" fill="#991b1b">⚠️ BACK-END DENIAL</text>
            <text x="12" y="38" fontSize="9" fill="#7f1d1d">CARC / RARC Reason Codes</text>
            <text x="12" y="50" fontSize="8" fontWeight="bold" fill="#b91c1c">Routes to Stage 10 (AR Appeals)</text>
          </g>

          {/* Result Branch B: Paid Claim */}
          <g transform="translate(560, 225)" filter="url(#skeuoShadow)">
            <rect width="160" height="58" rx="6" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
            <text x="12" y="22" fontSize="11" fontWeight="bold" fill="#166534">✅ CLEAN CLAIM PAID</text>
            <text x="12" y="38" fontSize="9" fill="#14532d">EFT Payment & ERA (835)</text>
            <text x="12" y="50" fontSize="8" fontWeight="bold" fill="#15803d">Routes to Stage 9 (Payment Posting)</text>
          </g>

          {/* Rejection Note (Front-end vs Back-end distinction) */}
          <g transform="translate(170, 165)" filter="url(#skeuoShadow)">
            <rect width="330" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="15" y="24" fontSize="11" fontWeight="bold" fill="#0f172a">CRITICAL REVENUE CYCLE DISTINCTION:</text>
            <text x="15" y="44" fontSize="9" fontWeight="bold" fill="#c2410c">1. Rejection (Front-End Gate 1 & 2):</text>
            <text x="25" y="60" fontSize="9" fill="#334155">Never entered payer adjudication engine. Not a legal denial.</text>
            <text x="25" y="74" fontSize="9" fill="#334155">Fix syntax/demographics and re-transmit immediately.</text>
            <text x="15" y="94" fontSize="9" fontWeight="bold" fill="#b91c1c">2. Denial (Back-End Gate 4):</text>
            <text x="25" y="110" fontSize="9" fill="#334155">Adjudicated by payer. CARC issued on 835 ERA. Requires formal appeal.</text>
          </g>
        </svg>
      </div>

      {/* Selected Gate Deep-Dive Inspector */}
      <div className="skeuo-inset p-4 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-300 dark:border-stone-700">
          <div>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">GATE INSPECTOR:</span>
            <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              {current.title}
            </h4>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded border border-stone-300 dark:border-stone-600">
            Signal: {current.ack}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
          {current.desc}
        </p>

        <div className="mt-3">
          <div className="text-xs font-bold font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
            Common Traps Caught at this Gate:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.errors.map((err, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs bg-white dark:bg-stone-800 p-2 rounded border border-stone-200 dark:border-stone-700">
                <span className="text-red-600 dark:text-red-400 font-bold">✕</span>
                <span className="text-stone-800 dark:text-stone-200">{err}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

