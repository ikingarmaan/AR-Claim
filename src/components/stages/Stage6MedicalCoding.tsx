import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { Icd10Structure } from '../diagrams/Icd10Structure';
import { NcciEditFlow } from '../diagrams/NcciEditFlow';
import { 
  Code2, 
  Tag, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Bookmark,
  ShieldCheck,
  Search,
  Layers
} from 'lucide-react';
import { CPT_SECTIONS, MODIFIER_MASTERCLASS } from '../../data/codingAndModifiers';

export const Stage6MedicalCoding: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress, toggleBookmarkModifier } = useAcademy();
  const isCompleted = progress.completedModules.includes('coding');

  const [activeTab, setActiveTab] = useState<'icd10' | 'cpt' | 'modifiers' | 'ncci'>('icd10');
  const [modifierFilter, setModifierFilter] = useState<'all' | 'e&m' | 'surgical'>('all');

  const filteredModifiers = MODIFIER_MASTERCLASS.filter(m => {
    if (modifierFilter === 'all') return true;
    return m.category === modifierFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <RcmPipelineFlow />

      <div className="skeuo-manila p-6 sm:p-8 rounded-xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Binder Clip */}
        <div className="absolute -top-4 left-10 w-16 h-8 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-md shadow-md border border-stone-500 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-amber-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 6 OF 10: MID-CYCLE
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                ICD-10-CM • CPT • HCPCS • MODIFIERS • NCCI
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 6: Professional Medical Coding & Integrity
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Medical coding translates clinical documentation into universal alphanumeric code sets recognized by HIPAA. Master diagnosis coding (ICD-10-CM), procedural coding (CPT), supply coding (HCPCS Level II), modifier mechanics, and NCCI bundling edits.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              AAPC / AHIMA COMPLIANT
            </div>
            <button
              onClick={() => markModuleCompleted('coding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 border transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-white/80 dark:bg-stone-800 border-stone-400 text-stone-700 dark:text-stone-200 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Stage Mastered' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('icd10')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'icd10'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🧬 ICD-10-CM Diagnosis Architecture
          </button>
          <button
            onClick={() => setActiveTab('cpt')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'cpt'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            📋 CPT & HCPCS Level II Categories
          </button>
          <button
            onClick={() => setActiveTab('modifiers')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'modifiers'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🏷️ Essential Modifiers Dictionary (25, 59, 26, TC)
          </button>
          <button
            onClick={() => setActiveTab('ncci')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'ncci'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ⚖️ NCCI Edits & Bundling Bypass Logic
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'icd10' && (
            <div>
              <Icd10Structure />

              {/* Diagnosis Coding Rules Manifesto */}
              <div className="skeuo-inset p-5 rounded-lg bg-stone-50 dark:bg-stone-950/50 border border-stone-300 dark:border-stone-700 mt-6 space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  CMS / Official ICD-10-CM Coding Guidelines Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    <strong className="text-amber-800 font-serif">1. Code to the Highest Level of Specificity:</strong>
                    <p className="mt-1">
                      Never report a 3-character heading code (e.g. <code>E11</code>) if 4th, 5th, 6th, or 7th character extensions exist. A claim with incomplete characters triggers an immediate <strong>front-end clearinghouse rejection</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    <strong className="text-amber-800 font-serif">2. Never Code "Probable" or "Suspected" in Outpatient:</strong>
                    <p className="mt-1">
                      In physician office and outpatient clinics, conditions documented as "rule out", "probable", or "suspected" <strong>cannot be coded as confirmed</strong>. You must code the presenting symptom or sign (e.g., headache, fever) instead.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    <strong className="text-amber-800 font-serif">3. Etiology / Manifestation ("Code First"):</strong>
                    <p className="mt-1">
                      Certain conditions have an underlying etiology and multiple body system manifestations (e.g., Diabetic nephropathy). The underlying condition MUST be sequenced first, followed by the manifestation code in brackets.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    <strong className="text-amber-800 font-serif">4. Acute vs Chronic Sequencing:</strong>
                    <p className="mt-1">
                      If the same condition is described as both acute (subacute) and chronic, and separate subentries exist in the Alphabetic Index at the same indentation level, <strong>code both and sequence the acute code first</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cpt' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                CPT (Current Procedural Terminology) Structure & Categories
              </h4>
              <p className="leading-relaxed">
                Maintained by the American Medical Association (AMA). 5-digit numeric codes describing outpatient diagnostic, medical, surgical, and therapeutic services.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs mt-3">
                {CPT_SECTIONS.map(cat => (
                  <div key={cat.name} className="p-3 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                    <div>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                        {cat.range}
                      </span>
                      <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                        {cat.name}
                      </h5>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HCPCS Level II Section */}
              <div className="skeuo-paper p-4 rounded-lg border border-stone-300 dark:border-stone-700 mt-4">
                <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                  HCPCS LEVEL II (NATIONAL CODES)
                </span>
                <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  Supplies, DME, Injectable Drugs & Ambulance Services
                </h5>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Single letter (A–V) followed by 4 numeric digits. Maintained by CMS:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2 font-mono">
                  <div className="bg-white dark:bg-stone-800 p-2 rounded border"><strong>A-Codes:</strong> Ambulance & medical supplies</div>
                  <div className="bg-white dark:bg-stone-800 p-2 rounded border"><strong>E-Codes:</strong> Durable Medical Equipment (DME)</div>
                  <div className="bg-white dark:bg-stone-800 p-2 rounded border"><strong>J-Codes:</strong> Injectable drugs & chemotherapy</div>
                  <div className="bg-white dark:bg-stone-800 p-2 rounded border"><strong>G-Codes:</strong> CMS temporary clinical procedures</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modifiers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                  Professional Modifiers Library (Box 24D on CMS-1500)
                </h4>
                <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-600 text-xs">
                  <button
                    onClick={() => setModifierFilter('all')}
                    className={`px-2.5 py-1 rounded font-mono ${modifierFilter === 'all' ? 'bg-amber-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    All ({MODIFIER_MASTERCLASS.length})
                  </button>
                  <button
                    onClick={() => setModifierFilter('e&m')}
                    className={`px-2.5 py-1 rounded font-mono ${modifierFilter === 'e&m' ? 'bg-amber-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    E&M Modifiers
                  </button>
                  <button
                    onClick={() => setModifierFilter('surgical')}
                    className={`px-2.5 py-1 rounded font-mono ${modifierFilter === 'surgical' ? 'bg-amber-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    Surgical Modifiers
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredModifiers.map(mod => {
                  const isBookmarked = progress.bookmarkedModifiers.includes(mod.code);
                  return (
                    <div 
                      key={mod.code}
                      className="p-3 sm:p-4 rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="md:w-1/3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700">
                            Mod {mod.code}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                            {mod.category}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm mt-1">
                          {mod.title}
                        </div>
                      </div>

                      <div className="md:w-1/2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        <p>{mod.primaryUse}</p>
                        <p className="mt-1 font-mono text-[11px] text-amber-700 dark:text-amber-400">
                          <strong>Financial Impact:</strong> {mod.dollarImpact}
                        </p>
                      </div>

                      <div className="flex md:flex-col items-center justify-end">
                        <button
                          onClick={() => toggleBookmarkModifier(mod.code)}
                          className={`p-1.5 rounded transition-colors ${
                            isBookmarked
                              ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/50'
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                          title="Bookmark Modifier"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'ncci' && (
            <div>
              <NcciEditFlow />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('transcription')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 5 Transcription
          </button>

          <button
            onClick={() => setActiveModule('charge-capture')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 7: Charge Capturing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
