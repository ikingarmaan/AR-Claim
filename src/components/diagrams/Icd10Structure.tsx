import React, { useState } from 'react';

export const Icd10Structure: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<number>(6); // Default 7th character

  const characters = [
    {
      idx: 0,
      char: 'S',
      title: 'Char 1: Alpha Category Chapter',
      desc: 'Injury, poisoning and certain other consequences of external causes (Chapter 19). Every ICD-10 code begins with an alphabetic letter (A–Z, excluding U for WHO interim).',
      tag: 'Category (Letter)'
    },
    {
      idx: 1,
      char: '8',
      title: 'Char 2: Numeric Body Region',
      desc: 'Anatomical region of injuries to the knee and lower leg.',
      tag: 'Category (Numeric)'
    },
    {
      idx: 2,
      char: '2',
      title: 'Char 3: Injury Type Specification',
      desc: 'Fracture of lower leg, including ankle. Chars 1–3 together form the 3-character heading category "S82".',
      tag: 'Category Heading'
    },
    {
      idx: 3,
      char: '.',
      title: 'Decimal Point',
      desc: 'Always placed after the 3rd character. Required in standard print and EHR displays (omitted in electronic ANSI X12 837 loops).',
      tag: 'Punctuation'
    },
    {
      idx: 4,
      char: '1',
      title: 'Char 4: Specific Anatomic Site',
      desc: 'Fracture of upper end of tibia (proximal tibia / tibial plateau).',
      tag: 'Etiology & Site'
    },
    {
      idx: 5,
      char: '0',
      title: 'Char 5: Clinical Severity / Detail',
      desc: 'Unspecified fracture of upper end of tibia (displaced vs non-displaced breakdown).',
      tag: 'Subclassification'
    },
    {
      idx: 6,
      char: '1',
      title: 'Char 6: Laterality (Right vs Left)',
      desc: '1 = Right leg, 2 = Left leg, 3 = Bilateral, 9 = Unspecified laterality. Billing unspecified laterality (9) triggers automated front-end denials (CO-16).',
      tag: 'Laterality (1=R, 2=L)'
    },
    {
      idx: 7,
      char: 'A',
      title: 'Char 7: Episode of Care Extension',
      desc: 'A = Initial encounter (active treatment). D = Subsequent encounter (routine healing). S = Sequela (complication/late effect). If code lacks 6 characters, dummy "X" placeholders are inserted.',
      tag: 'Episode of Care'
    }
  ];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-700">
              Anatomy of Medical Coding
            </span>
            <span className="text-xs font-mono text-stone-500">HIPAA-COMPLIANT-DIAGNOSIS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            ICD-10-CM 7-Character Code Architecture
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Click any character box below to dissect how clinical specificity, laterality, and episode of care are encoded.
          </p>
        </div>

        <div className="skeuo-stamp-approved text-xs px-2.5 py-1 font-mono uppercase">
          SPECIFICITY CERTIFIED
        </div>
      </div>

      {/* Interactive Code Anatomy Banner */}
      <div className="my-6 p-6 rounded-xl bg-gradient-to-b from-stone-100 to-amber-50 dark:from-stone-900 dark:to-stone-950 border border-stone-300 dark:border-stone-700 shadow-inner">
        <div className="text-center mb-2 text-xs font-mono text-stone-500 uppercase tracking-widest">
          Example Code: S82.101A (Fracture of Proximal Right Tibia, Closed, Initial Encounter)
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3">
          {characters.map(item => {
            const isSelected = selectedChar === item.idx;
            const isDot = item.char === '.';

            if (isDot) {
              return (
                <div key={item.idx} className="text-3xl font-mono font-bold text-stone-400 dark:text-stone-600 self-end pb-3">
                  .
                </div>
              );
            }

            return (
              <button
                key={item.idx}
                onClick={() => setSelectedChar(item.idx)}
                className={`relative group flex flex-col items-center justify-center w-14 sm:w-16 h-20 sm:h-24 rounded-lg font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-amber-100 dark:bg-amber-900/60 border-amber-600 text-amber-950 dark:text-amber-100 shadow-skeuo-raised ring-2 ring-amber-500 scale-105'
                    : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-400'
                }`}
              >
                {/* Character number pill */}
                <span className="text-[9px] font-mono font-normal text-stone-500 dark:text-stone-400 mb-1">
                  POS {item.idx + 1}
                </span>

                {/* Big character */}
                <span className="text-2xl sm:text-3xl font-bold">
                  {item.char}
                </span>

                {/* Subtag */}
                <span className="text-[8px] uppercase tracking-tighter text-stone-600 dark:text-stone-400 mt-1 line-clamp-1 px-1 text-center">
                  {item.tag.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dissection Inspector Box */}
      <div className="skeuo-inset p-4 sm:p-5 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-700">
          <div>
            <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold">
              POSITION DISSECTION:
            </span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              {characters[selectedChar].title}
            </h4>
          </div>
          <span className="text-xs font-mono bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-700 font-bold">
            Key: "{characters[selectedChar].char}"
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-3 leading-relaxed">
          {characters[selectedChar].desc}
        </p>

        {/* 7th Character Guide Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-dashed border-stone-300 dark:border-stone-700 text-xs">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800">
            <span className="font-bold text-blue-900 dark:text-blue-300">7th Character "A" (Initial):</span>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Used when the patient is receiving <em>active treatment</em> for the condition: surgical evaluation, emergency care, casting by a new physician.
            </p>
          </div>

          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-900 dark:text-emerald-300">7th Character "D" (Subsequent):</span>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Used for encounters after the patient has received active treatment and is now receiving <em>routine healing/aftercare</em>: suture removal, cast changes, rehab.
            </p>
          </div>

          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
            <span className="font-bold text-purple-900 dark:text-purple-300">7th Character "S" (Sequela):</span>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Used for complications or conditions that arise as a <em>direct result of a healed condition</em> (e.g., scar tissue formation after a burn, chronic arthritis after fracture).
            </p>
          </div>
        </div>

        {/* Dummy X Rule Post-It */}
        <div className="mt-4 p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
          <strong>The "Placeholder X" Rule:</strong> When an ICD-10-CM code requires a 7th character for validity (e.g. poisoning or external causes), but the base code only contains 4 or 5 characters, you MUST insert placeholder "X" characters to expand the code to 6 characters before adding the 7th character (e.g. <code>T36.0X1A</code>).
        </div>
      </div>
    </div>
  );
};
