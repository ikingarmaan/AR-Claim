import React, { useState } from 'react';

export const NcciEditFlow: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<'0' | '1' | 'MUE'>('1');

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-purple-800 dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-950/60 px-2.5 py-1 rounded border border-purple-300 dark:border-purple-700">
              CMS Coding Integrity Rules
            </span>
            <span className="text-xs font-mono text-stone-500">CMS-NCCI-PTP-MUE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            NCCI Edit Decision Flowchart & Modifier Bypass Logic
          </h3>
          <p className="text-sm text-stone-800 dark:text-stone-200">
            How Medicare and commercial scrubbers evaluate unbundling, Column 1 vs Column 2 pairs, and Modifier Indicators 0 vs 1.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="skeuo-stamp-denied text-xs px-2.5 py-1 font-mono uppercase">
            CO-97 UNBUNDLED DEFENSE
          </span>
        </div>
      </div>

      {/* SVG Interactive Decision Flowchart */}
      <div className="my-6 overflow-x-auto">
        <svg viewBox="0 0 860 300" className="w-full min-w-[720px] h-auto font-sans">
          <defs>
            <filter id="ncciShadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
            <marker id="nArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Lines */}
          <line x1="120" y1="80" x2="180" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#nArrow)" />
          <line x1="320" y1="80" x2="380" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#nArrow)" />
          
          {/* Branch lines */}
          <path d="M 480 120 L 480 180 L 560 180" stroke="#dc2626" strokeWidth="2" markerEnd="url(#nArrow)" fill="none" />
          <path d="M 480 80 L 560 80" stroke="#16a34a" strokeWidth="2" markerEnd="url(#nArrow)" fill="none" />

          {/* Node 1: Two Procedures Billed */}
          <g transform="translate(10, 40)" filter="url(#ncciShadow)">
            <rect width="110" height="80" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="55" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">STEP 1</text>
            <text x="55" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">2 CPT Codes</text>
            <text x="55" y="60" textAnchor="middle" fontSize="9" fill="#64748b">Same Patient</text>
            <text x="55" y="72" textAnchor="middle" fontSize="8" fill="#94a3b8">Same DOS & Provider</text>
          </g>

          {/* Node 2: NCCI Table Match */}
          <g transform="translate(180, 40)" filter="url(#ncciShadow)">
            <rect width="140" height="80" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="70" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">STEP 2: LOOKUP</text>
            <text x="70" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">NCCI PTP Table</text>
            <text x="70" y="60" textAnchor="middle" fontSize="9" fill="#334155">Col 1: Comprehensive</text>
            <text x="70" y="72" textAnchor="middle" fontSize="9" fill="#334155">Col 2: Component</text>
          </g>

          {/* Node 3: Modifier Indicator Decision Box */}
          <g transform="translate(380, 35)" filter="url(#ncciShadow)">
            <polygon points="50,0 100,45 50,90 0,45" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="50" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">MODIFIER</text>
            <text x="50" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">INDICATOR?</text>
          </g>

          {/* Branch A: Indicator 1 (Allowed) */}
          <g 
            transform="translate(560, 40)" 
            filter="url(#ncciShadow)"
            className="cursor-pointer"
            onClick={() => setSelectedIndicator('1')}
          >
            <rect width="260" height="80" rx="8" fill={selectedIndicator === '1' ? '#f0fdf4' : '#fafaf9'} stroke={selectedIndicator === '1' ? '#16a34a' : '#d6d3d1'} strokeWidth={selectedIndicator === '1' ? '2.5' : '1.5'} />
            <text x="15" y="24" fontSize="11" fontWeight="bold" fill="#166534">INDICATOR "1" (BYPASS ALLOWED)</text>
            <text x="15" y="42" fontSize="9" fill="#15803d">Modifier 59, XE, XP, XS, XU or 25 permitted</text>
            <text x="15" y="58" fontSize="8" fill="#334155">Criteria: Separate site, different session, separate incision</text>
            <text x="15" y="72" fontSize="8" fontWeight="bold" fill="#166534">Outcome: BOTH procedures reimbursed</text>
          </g>

          {/* Branch B: Indicator 0 (Not Allowed) */}
          <g 
            transform="translate(560, 140)" 
            filter="url(#ncciShadow)"
            className="cursor-pointer"
            onClick={() => setSelectedIndicator('0')}
          >
            <rect width="260" height="80" rx="8" fill={selectedIndicator === '0' ? '#fef2f2' : '#fafaf9'} stroke={selectedIndicator === '0' ? '#dc2626' : '#d6d3d1'} strokeWidth={selectedIndicator === '0' ? '2.5' : '1.5'} />
            <text x="15" y="24" fontSize="11" fontWeight="bold" fill="#991b1b">INDICATOR "0" (NO BYPASS EVER)</text>
            <text x="15" y="42" fontSize="9" fill="#b91c1c">Modifier will NOT override the bundling edit</text>
            <text x="15" y="58" fontSize="8" fill="#334155">Inherent part of the primary procedure</text>
            <text x="15" y="72" fontSize="8" fontWeight="bold" fill="#991b1b">Outcome: Col 2 denied (CO-97: Bundled)</text>
          </g>

          {/* MUE Callout in SVG */}
          <g 
            transform="translate(180, 150)" 
            filter="url(#ncciShadow)"
            className="cursor-pointer"
            onClick={() => setSelectedIndicator('MUE')}
          >
            <rect width="220" height="70" rx="8" fill={selectedIndicator === 'MUE' ? '#faf5ff' : '#f8fafc'} stroke={selectedIndicator === 'MUE' ? '#9333ea' : '#cbd5e1'} strokeWidth={selectedIndicator === 'MUE' ? '2' : '1'} />
            <text x="15" y="22" fontSize="10" fontWeight="bold" fill="#7e22ce">MUE (Medically Unlikely Edits):</text>
            <text x="15" y="40" fontSize="8" fill="#475569">Max allowable units of service (UOS) on 1 DOS.</text>
            <text x="15" y="54" fontSize="8" fill="#475569">Exceeding MUE produces unappealable line denials.</text>
          </g>
        </svg>
      </div>

      {/* Inspector Details Box */}
      <div className="skeuo-inset p-4 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        {selectedIndicator === '1' && (
          <div>
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm mb-1">
              <span>✅ INDICATOR 1: MODIFIER BYPASS ALLOWED</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              When an NCCI PTP edit pair has an indicator of <strong>1</strong>, you may append an appropriate modifier to the <strong>Column 2 code</strong> (or modifier 25 to the E/M code) IF and ONLY IF the clinical documentation establishes that the services were distinct and independent.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-white dark:bg-stone-800 p-2 rounded border border-stone-200 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-700">Mod 59</span>: Distinct procedural service (traditional)
              </div>
              <div className="bg-white dark:bg-stone-800 p-2 rounded border border-stone-200 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-700">Mod XE</span>: Separate encounter on same date
              </div>
              <div className="bg-white dark:bg-stone-800 p-2 rounded border border-stone-200 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-700">Mod XS</span>: Separate organ / distinct structure
              </div>
              <div className="bg-white dark:bg-stone-800 p-2 rounded border border-stone-200 dark:border-stone-700">
                <span className="font-mono font-bold text-amber-700">Mod XP</span>: Distinct practitioner on same group
              </div>
            </div>
          </div>
        )}

        {selectedIndicator === '0' && (
          <div>
            <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-bold text-sm mb-1">
              <span>🛑 INDICATOR 0: STRICT NO-BYPASS BUNDLING</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              CMS has determined that under no clinical circumstances can these two procedures be performed independently during the same operative session. Appending Modifier 59 to an indicator 0 edit is considered fraudulent unbundling and will be automatically denied with <strong>CARC CO-97</strong>.
            </p>
            <div className="mt-2 text-xs bg-red-50 dark:bg-red-950/40 p-2 rounded border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200">
              <strong>Example:</strong> CPT 45385 (Colonoscopy with lesion removal by snare) Column 1 and CPT 45378 (Diagnostic colonoscopy) Column 2. A diagnostic colonoscopy is always inherent in a surgical colonoscopy. Indicator is 0.
            </div>
          </div>
        )}

        {selectedIndicator === 'MUE' && (
          <div>
            <div className="flex items-center gap-2 text-purple-800 dark:text-purple-400 font-bold text-sm mb-1">
              <span>🔢 MEDICALLY UNLIKELY EDITS (MUE)</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              MUE units represent the maximum number of times a single code can be billed on a single calendar day by the same provider. Examples: Appendectomy (CPT 44950) has an MUE of 1 because humans only have one appendix. Bilateral cataract surgery has an MUE of 2.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

