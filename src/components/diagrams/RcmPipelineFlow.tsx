import React, { useState } from 'react';
import { RCM_STAGES, StageId } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';

export const RcmPipelineFlow: React.FC = () => {
  const { setActiveModule, activeModule } = useAcademy();
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const phaseGroups = [
    { name: 'Front-End (Patient Intake & Scheduling)', range: [1, 3], color: 'from-amber-700 to-amber-900', bg: 'bg-amber-50/70 dark:bg-amber-950/20' },
    { name: 'Mid-Cycle (Clinical Encounter & Medical Coding)', range: [4, 7], color: 'from-stone-700 to-stone-900', bg: 'bg-stone-50/70 dark:bg-stone-900/30' },
    { name: 'Back-End (Billing, Payment Posting & AR Follow-Up)', range: [8, 10], color: 'from-red-900 to-stone-900', bg: 'bg-red-50/70 dark:bg-red-950/20' }
  ];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header Stamp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-900/50 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-700">
              Interactive Blueprint
            </span>
            <span className="text-xs font-mono text-stone-500">REF: US-RCM-10-STAGES</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Complete End-to-End US Revenue Cycle Pipeline
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Click any station to open that stage file. Every medical dollar passes sequentially through these 10 gates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-2deg]">
            10 STAGES CERTIFIED
          </div>
        </div>
      </div>

      {/* SVG Pipeline Visualization */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="min-w-[860px]">
          {/* Phase Banners */}
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-3 text-center py-1.5 px-2 bg-blue-100/70 dark:bg-blue-950/40 rounded border border-blue-300/60 dark:border-blue-800 text-xs font-serif font-bold text-blue-900 dark:text-blue-300">
              GATE 1–3: FRONT-END INTAKE
            </div>
            <div className="col-span-5 text-center py-1.5 px-2 bg-amber-100/70 dark:bg-amber-950/40 rounded border border-amber-300/60 dark:border-amber-800 text-xs font-serif font-bold text-amber-900 dark:text-amber-300">
              GATE 4–7: MID-CYCLE CLINICAL & CODING
            </div>
            <div className="col-span-4 text-center py-1.5 px-2 bg-emerald-100/70 dark:bg-emerald-950/40 rounded border border-emerald-300/60 dark:border-emerald-800 text-xs font-serif font-bold text-emerald-900 dark:text-emerald-300">
              GATE 8–10: BACK-END CLAIMS & AR
            </div>
          </div>

          {/* Connected Stations Grid */}
          <div className="relative">
            {/* Connecting Brass Wire line */}
            <div className="absolute top-1/2 left-6 right-6 h-1.5 bg-gradient-to-r from-stone-400 via-amber-600 to-emerald-600 -translate-y-1/2 z-0 rounded-full shadow-inner opacity-70" />

            <div className="grid grid-cols-10 gap-2 relative z-10">
              {RCM_STAGES.map((stage) => {
                const isActive = activeModule === stage.id;
                const isHovered = hoveredStage === stage.number;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveModule(stage.id as StageId)}
                    onMouseEnter={() => setHoveredStage(stage.number)}
                    onMouseLeave={() => setHoveredStage(null)}
                    className={`group relative text-left p-2.5 rounded-lg transition-all duration-200 flex flex-col justify-between h-36 border ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-600 shadow-skeuo-raised ring-2 ring-amber-500/50 scale-[1.03]'
                        : isHovered
                        ? 'bg-stone-50 dark:bg-stone-800/80 border-stone-400 dark:border-stone-500 shadow-md scale-[1.02]'
                        : 'bg-white/90 dark:bg-stone-900/90 border-stone-300 dark:border-stone-700 shadow-sm hover:shadow'
                    }`}
                  >
                    {/* Brass Pin on top */}
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 shadow-xs mx-auto mb-1 border border-amber-800/60" />

                    {/* Stage Number Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}>
                        #{stage.number}
                      </span>
                      <span className="text-base">{stage.icon}</span>
                    </div>

                    {/* Title */}
                    <div className="my-1">
                      <div className="text-[11px] font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight line-clamp-2">
                        {stage.title}
                      </div>
                      <div className="text-[9px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                        {stage.subtitle}
                      </div>
                    </div>

                    {/* Bottom Status Indicator */}
                    <div className="w-full pt-1 border-t border-dashed border-stone-200 dark:border-stone-700 flex items-center justify-between text-[9px] font-mono text-stone-400 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                      <span>OPEN</span>
                      <span>→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Golden Rule Post-it Memo */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="skeuo-postit p-3 rounded shadow text-xs">
          <div className="font-bold text-stone-900 mb-1 flex items-center gap-1">
            📌 Front-End Axiom (Stages 1–3)
          </div>
          <p className="text-stone-800 leading-relaxed">
            Over <strong>70% of claim denials</strong> trace back to errors in appointment scheduling or eligibility verification. Validating coverage prior to the visit prevents CO-27 (coverage terminated) and CO-29.
          </p>
        </div>

        <div className="skeuo-postit-blue p-3 rounded shadow text-xs">
          <div className="font-bold text-blue-950 mb-1 flex items-center gap-1">
            📌 Mid-Cycle Axiom (Stages 4–7)
          </div>
          <p className="text-blue-900 leading-relaxed">
            If it is not documented, it cannot be billed. <strong>Medical necessity</strong> (linking correct ICD-10 to CPT) is the single legal bridge that obligates the payer to reimburse the provider.
          </p>
        </div>

        <div className="skeuo-postit-green p-3 rounded shadow text-xs">
          <div className="font-bold text-emerald-950 mb-1 flex items-center gap-1">
            📌 Back-End Axiom (Stages 8–10)
          </div>
          <p className="text-emerald-900 leading-relaxed">
            Clean claim rate benchmark is <strong>&gt; 95%</strong>. Denials are not final rejections; aggressive AR follow-up and timely appeal submissions recover up to 65% of disputed revenue.
          </p>
        </div>
      </div>
    </div>
  );
};
